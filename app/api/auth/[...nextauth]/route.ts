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
      const cookieStore = await cookies();
      const intent = cookieStore.get('LIVESTOCX_OAUTH_INTENT')?.value;

      if (account?.provider === 'google' && intent === 'signup') {
        const googleProfile = profile as {
          email?: string | null;
          given_name?: string | null;
          family_name?: string | null;
        };
        const email = googleProfile.email ?? '';

        cookieStore.delete('LIVESTOCX_OAUTH_INTENT');

        try {
          const { data: availability } = await axios.get(
            process.env.NEXT_APP_CORE_SERVICE_HOST!.concat('/v1/auth/helper/availability/email'),
            { params: { email } }
          );

          // isAvailable false means the email is already registered
          if (availability?.isAvailable === false) {
            try {
              const { data } = await axios.post(
                process.env.NEXT_APP_CORE_SERVICE_HOST!.concat('/v1/auth/signin-oauth'),
                { email }
              );

              if (data?.token) {
                cookieStore.set({
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
                cookieStore.set({
                  name: 'LIVESTOCX_OAUTH_SIGNED_IN',
                  value: '1',
                  httpOnly: true,
                  maxAge: 60,
                  path: '/',
                  sameSite: 'lax',
                  secure: process.env.NODE_ENV === 'production',
                });
              }
            } catch (error) {
              console.error('[GOOGLE-SIGN-API-ERROR]', error);
            }

            return true;
          }
        } catch (error) {
          console.error('[GOOGLE-SIGNUP-EMAIL-CHECK-ERROR]', error);
        }

        cookieStore.set({
          name: 'LIVESTOCX_GOOGLE_PROFILE',
          value: JSON.stringify({
            email,
            firstName: googleProfile.given_name ?? '',
            lastName: googleProfile.family_name ?? '',
          }),
          httpOnly: false,
          maxAge: 60 * 10,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
        return true;
      }

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
      const cookieStore = await cookies();

      if (cookieStore.get('LIVESTOCX_OAUTH_SIGNED_IN')?.value === '1') {
        cookieStore.delete('LIVESTOCX_OAUTH_SIGNED_IN');
        return baseUrl;
      }

      return url || baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
