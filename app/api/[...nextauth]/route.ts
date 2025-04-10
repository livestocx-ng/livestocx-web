import NextAuth from 'next-auth/next';
import { cookies } from 'next/headers';
import { authApi } from '@/core/api/sdk';
import GoogleProvider from 'next-auth/providers/google';
import { COOKIE_MAX_AGE, COOKIE_NAME } from '@/core/constants';

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'online',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        try {
			const email = profile?.email;

          const { data } = await authApi.authControllerSigninOAuth({
            email: email!,
          });

          (await cookies()).set({
            name: COOKIE_NAME,
            value: JSON.stringify({
              accessToken: data?.token,
            }),
            httpOnly: true,
            maxAge: COOKIE_MAX_AGE,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
          });

          return true;
        } catch (error) {
          // console.error('[GOOGLE-SIGN-API-ERROR]', error);
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url || baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
