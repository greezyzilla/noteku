import RegisterForm from '../../components/molecules/form/register';
import { GuestTemplate } from '../../components/templates';

export default function LoginPage() {
  return (
    <GuestTemplate>
      <RegisterForm />
    </GuestTemplate>
  );
}
