import AuthLayout from '../layout/AuthLayout';
import FormLogin from '../fragment/formlogin';

const LoginPage = () => {
  return (
    <AuthLayout title="Login" type="login">
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginPage;
