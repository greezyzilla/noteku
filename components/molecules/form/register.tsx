import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { signUp } from '../../../features/auth';
import {
  Button, InputEmail, InputPassword, InputText,
} from '../../atoms';

export default function RegisterForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const locale = useAppSelector((state) => state.theme.locale);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onChangeHandle = (event : any) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandle = async () => {
    const {
      name, email, password, passwordConfirmation,
    } = user;

    if (password !== passwordConfirmation) {
      if (locale === 'en') toast.error('Registration failed, password not match');
      else toast.error('Gagal mendaftar, pasword tidak sama');
    } else {
      const response = await dispatch(signUp({
        name, email, password,
      })) as { payload : { error: boolean }};

      if (response.payload.error) {
        if (locale === 'en') toast.error('Registration failed, please try again~');
        else toast.error('Gagal mendaftar, coba lagi~');
      } else {
        if (locale === 'en') toast.success('Registration success');
        else toast.success('Berhasil Mendaftar');

        router.push('/auth/login');
      }
    }
  };

  return (
    <div className="w-[400px] bg-white/80 px-10 py-8 dark:bg-slate-900/80">
      <h2 className="mb-2 text-center text-2xl font-black text-slate-600 dark:text-slate-400">{locale === 'en' ? 'REGISTER' : 'DAFTAR'}</h2>
      <form className="flex flex-col gap-4">
        <InputText
          name="name"
          onChange={onChangeHandle}
          placeholder={locale === 'en' ? 'What can i call u sir?..' : 'Siapa nama anda pak?..'}
          title={locale === 'en' ? 'Name' : 'Nama'}
          value={user.name}
        />
        <InputEmail
          name="email"
          onChange={onChangeHandle}
          placeholder={locale === 'en' ? 'Type your mail here sir..' : 'Ketikkan surel anda disini pak..'}
          title={locale === 'en' ? 'Email' : 'Surel'}
          value={user.email}
        />
        <InputPassword
          name="password"
          onChange={onChangeHandle}
          placeholder={locale === 'en' ? 'Type your password here..' : 'Ketikkan kata sandi anda disini..'}
          title={locale === 'en' ? 'Password' : 'Kata Sandi'}
          value={user.password}
        />
        <InputPassword
          name="passwordConfirmation"
          onChange={onChangeHandle}
          placeholder={locale === 'en' ? 'Re-Type your password here..' : 'Ketikkan kembali kata sandi anda disini'}
          title={locale === 'en' ? 'Password Confirmation' : 'Konfirmasi Kata Sandi'}
          value={user.passwordConfirmation}
          isValid={user.password === user.passwordConfirmation}
        />
      </form>
      <Button isFilled className="mt-4 w-full py-4" onClick={onSubmitHandle}>{locale === 'en' ? 'Submit' : 'Kirim'}</Button>
      <div className="mt-4 flex items-center">
        <div className="h-[2px] flex-1 bg-black/10 dark:bg-white/10" />
        <div className="px-2 text-sm text-slate-500 dark:text-slate-400">{locale === 'en' ? 'Already has an account?' : 'Sudah punya akun?'}</div>
        <div className="h-[2px] flex-1 bg-black/10 dark:bg-white/10" />
      </div>
      <Button isLink href="/auth/login" className="mt-4 py-4">{locale === 'en' ? 'Login' : 'Masuk'}</Button>
    </div>
  );
}
