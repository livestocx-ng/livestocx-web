import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import { COOKIE_NAME } from '@/core/constants';

export async function DELETE(_req: NextRequest) {
  try {
    console.log('[DELETE-COOKIE-PROCESSING]');

    const cookieStore = await cookies();

    const cookie = cookieStore.get(COOKIE_NAME);

    console.log('[DELETE-COOKIE-VALUE] ::', cookie);

    if (cookie?.value) {
      await cookieStore.delete(COOKIE_NAME);

      console.log('[DELETE-COOKIE-SUCCESS]');

      return NextResponse.json(null, {
        status: 200,
      });
    }

    console.log('[DELETE-COOKIE-SUCCESS]');

    return NextResponse.json(null, {
      status: 200,
    });
  } catch (e) {
    const error = e as AxiosError;

    console.log('[DELETE-COOKIE-ERROR] :: ', error);
    // console.log('[ERROR] :: ', error);

    return NextResponse.json(
      { message: 'An error occurred while fetching cookies', error },
      { status: 400 }
    );
  }
}
