export const iosMirrorBase = 'https://pcmirror.cc';
export const iosMirrorCookie =
  'lang=eng; recentplay=SE80039394-70264797-SE80025172-81044417-80991034-81648103; t_hash_t=051e6e0399ce8f7f975bb12428aa4e15%3A%3Ad9faf3f3f4d2ae3ace39fb203d21ba59%3A%3A1726133383%3A%3Anv; t_hash=a9f3ac2aebd4fddcdc32c350daf9a325%3A%3A1726392237%3A%3Anv';
export const iosMirrorUserAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0';

export const getCurrentTimestamp = (): number => {
  return Math.round(new Date().getTime() / 1000);
};
