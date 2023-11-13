import AuthLayout from '../layout/AuthLayout';

import FormRegister from '../fragment/FormRegister';

const RegisterPage = () => {
  return (
    <AuthLayout title="Register" type="register">
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterPage;
