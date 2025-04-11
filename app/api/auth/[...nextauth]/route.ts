import axios from 'axios';
import NextAuth from 'next-auth/next';
import { cookies } from 'next/headers';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { COOKIE_MAX_AGE, COOKIE_NAME } from '@/core/constants';

const authOptions: AuthOptions = {
  secret: process.env.NEXT_APP_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_APP_GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_APP_GOOGLE_CLIENT_SECRET ?? '',
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

          // const { data } = await authApi.authControllerSigninOAuth(
          const { data } = await axios.post(
            process.env.NEXT_APP_CORE_SERVICE_HOST!.concat('/v1/auth/signin-oauth'),
            {
              email: email!,
            }
          );

          if (data?.token) {
            (await cookies()).set({
              name: COOKIE_NAME,
              value: JSON.stringify({
                bearerToken: data?.token,
              }),
              httpOnly: true,
              maxAge: COOKIE_MAX_AGE,
              path: '/',
              sameSite: 'strict',
              secure: process.env.NODE_ENV === 'production',
            });
          }

          return true;
        } catch (error) {
          console.error('[GOOGLE-SIGN-API-ERROR]', error);
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url || baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
