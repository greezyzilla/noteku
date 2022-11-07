import { ChangeEvent } from 'react';
import { useAppSelector } from '../../../app/hooks';

interface InputTextProps{
    name : string;
    title : string;
    placeholder : string;
    value : string;
    onChange(_e : ChangeEvent<HTMLInputElement>) : void;
    limit? : number;
}

export default function InputText(props : Partial<InputTextProps>) {
  const {
    name = 'input-text', title = '', placeholder = 'This is placeholder text',
    onChange = () => {}, limit = 0, value = '',
  } = props;

  const locale = useAppSelector(((state) => state.theme.locale));

  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-1 md:gap-2"
    >
      <div className="flex items-end justify-between">
        <p className="font-semibold text-slate-600 dark:text-slate-400">{title}</p>
        {
            (limit > 0) && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-blue-500 dark:text-blue-400">
                {limit - value.length}
              </span>
              {' '}
              {locale === 'en' ? 'Character Left' : 'Karakter tersisa'}
            </p>
            )
        }
      </div>
      <input
        className="rounded-md border-2 border-blue-300 p-3 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-blue-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-700 dark:focus:ring-blue-800 md:p-4"
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </label>
  );
}
