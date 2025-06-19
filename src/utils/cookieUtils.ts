import cookie from 'cookie';

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
  expires?: Date;
  maxAge?: number;
}

const defaultOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

export const setCookie = (name: string, value: string, options?: CookieOptions) => {
  const cookieOptions = { ...defaultOptions, ...options };
  document.cookie = cookie.serialize(name, value, cookieOptions);
};

export const getCookie = (name: string): string | undefined => {
  const cookies = cookie.parse(document.cookie);
  return cookies[name];
};
