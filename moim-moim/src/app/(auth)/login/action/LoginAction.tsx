import { signIn } from 'next-auth/react';

export function loginWithProvider(provider: string) {
  // 소셜 로그인 실행
  console.log('소셜 로그인!', provider);
  return signIn(provider, { callbackUrl: '/dashboard' })
    .then(() => console.log(`Logged in with ${provider}`))
    .catch((error) => console.error(`Login failed with ${provider}`, error));
}
