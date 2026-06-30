import React, { Suspense } from 'react';
import RegisterPage from './RegisterPage';

const RegisterForm = () => {
  return (
    <Suspense fallback={null}>
      <RegisterPage />
    </Suspense>
  );
};

export default RegisterForm;