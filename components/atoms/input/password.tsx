import classcat from 'classcat';
import { ChangeEvent } from 'react';

interface InputPasswordProps{
  name : string;
  title : string;
  placeholder : string;
  value : string;
  onChange(_e : ChangeEvent<HTMLInputElement>) : void;
  isValid? : boolean;
}

export default function InputPassword(props : Partial<InputPasswordProps>) {
  const {
    name, title, placeholder, onChange = () => {}, value, isValid = true,
  } = props;

  const inputClassname = classcat({
    'rounded-md border-2 border-blue-300 p-3 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-blue-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-700 dark:focus:ring-blue-800 md:p-4': true,
    'border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-700 dark:focus:border-red-600 dark:focus:ring-red-900': !isValid,
  });

  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-1 md:gap-2"
    >
      <p className="font-semibold text-slate-600 dark:text-slate-400">{title}</p>
      <input
        className={inputClassname}
        type="password"
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </label>
  );
}
