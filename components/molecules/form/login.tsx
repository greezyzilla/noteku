import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { signIn } from '../../../features/auth';
import { Button, InputEmail, InputPassword } from '../../atoms';

export default function LoginForm() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const onChangeHandle = (event : any) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandle = async () => {
    // onLogin(user);
    const { payload } = await dispatch(signIn(user));
    console.log(payload);
  };

  const locale = useAppSelector((state) => state.theme.locale);

  return (
    <div className="w-[400px] bg-white/80 px-10 py-8 dark:bg-slate-900/80">
      <h2 className="mb-2 text-center text-2xl font-black text-slate-600 dark:text-slate-400">{locale === 'en' ? 'LOGIN' : 'MASUK'}</h2>
      <form className="flex flex-col gap-4">
        <InputEmail
          name="email"
          onChange={onChangeHandle}
          placeholder={locale === 'en' ? 'Type your mail sir..' : 'Ketikkan surel kamu pak...'}
          title={locale === 'en' ? 'Email' : 'Surel'}
          value={user.email}
        />
        <InputPassword
          name="password"
          onChange={onChangeHandle}
          placeholder={locale === 'en' ? 'Type your password here..' : 'Ketikkan kata sandi kamu disini'}
          title={locale === 'en' ? 'Password' : 'Kata Sandi'}
          value={user.password}
        />
      </form>
      <Button isFilled className="mt-4 w-full py-4" onClick={onSubmitHandle}>{locale === 'en' ? 'Submit' : 'Kirim'}</Button>
      <div className="mt-4 flex items-center">
        <div className="h-[2px] flex-1 bg-black/10 dark:bg-white/10" />
        <div className="px-2 text-sm text-slate-500 dark:text-slate-400">{locale === 'en' ? 'Doesn\'t have account?' : 'Tidak punya akun?'}</div>
        <div className="h-[2px] flex-1 bg-black/10 dark:bg-white/10" />
      </div>
      <Button isLink href="/auth/register" className="mt-4 py-4">{locale === 'en' ? 'Register' : 'Daftar'}</Button>
    </div>
  );
}
