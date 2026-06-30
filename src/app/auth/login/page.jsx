import React, { Suspense } from 'react';
import LoginPage from './LoginPage';

const LoginMainPage = () => {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
};

export default LoginMainPage;