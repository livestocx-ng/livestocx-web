import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import { COOKIE_NAME } from '@/core/constants';

export async function GET(_req: NextRequest) {
  try {
    console.log('[FETCH-COOKIE-PROCESSING]');

    const cookie =  (await cookies()).get(COOKIE_NAME);

    // console.log('[FETCH-COOKIE-VALUE] ::', cookie);

    if (cookie?.value) {
      const currentAuthToken = JSON.parse(cookie?.value);

      console.log('[FETCH-COOKIE-SUCCESS]');

      return NextResponse.json(currentAuthToken, {
        status: 200,
      });
    }

    console.log('[FETCH-COOKIE-SUCCESS]');

    return NextResponse.json(null, {
      status: 200,
    });
  } catch (e) {
    const error = e as AxiosError;

    console.log('[FETCH-COOKIE-ERROR] :: ', error);
    // console.log('[ERROR] :: ', error);

    return NextResponse.json(
      { message: 'An error occurred while fetching cookies', error },
      { status: 400 }
    );
  }
}
