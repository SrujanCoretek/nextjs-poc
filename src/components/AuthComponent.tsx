import React from 'react';
import globalStore from '../store/global';
import { useRouter } from 'next/router';

const whiteListedRouterPaths = [
  '/user/signup',
  '/user/signin',
  '/user/forgotPassword',
  '/user/collections',
  '/nft/collection',
  '/nft/collection/detail',
  '/nft/explore',
  '/marketplace/listing',
  '/',
  '',
];
export default function AuthComponent({ children }: any) {
  const [profile] = globalStore((state) => [state.profile]);
  const router = useRouter();

  const path = router.asPath;

  if (!whiteListedRouterPaths.includes(router.pathname) && !profile.user) {
    router.replace(`/user/signin?redirect=${encodeURIComponent(path)}`);
    return <>...</>;
  }
  return <>{children}</>;
}
