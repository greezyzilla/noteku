import classcat from 'classcat';
import { ChangeEvent } from 'react';

interface InputTextProps{
    name : string;
    title : string;
    placeholder : string;
    value : string;
    onChange(_e : ChangeEvent<HTMLInputElement>) : void;
    limit? : number;
    isPrimary? : boolean;
    isSecondary? : boolean;
}

export default function InputText(props : Partial<InputTextProps>) {
  const {
    name = 'input-text', title = '', placeholder = 'This is placeholder text',
    onChange = () => {}, limit = 0, value = '', isPrimary = false, isSecondary = false,
  } = props;

  const inputClassname = classcat({
    'rounded-md border-2 p-3 text-sm text-slate-700 focus:outline-none focus:ring-2': true,
    'border-blue-300 focus:border-blue-400 focus:ring-blue-100': isPrimary && !isSecondary,
    'border-orange-300 focus:border-orange-400 focus:ring-orange-100': !isPrimary && isSecondary,
    'border-slate-300 focus:border-slate-400 focus:ring-slate-100': !isPrimary && !isSecondary,
  });

  const limitClassname = classcat({
    'font-semibold': true,
    'text-slate-500': !isPrimary && !isSecondary,
    'text-blue-500': isPrimary && !isSecondary,
    'text-orange-500': !isPrimary && isSecondary,
  });

  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-[6px]"
    >
      <div className="flex items-end justify-between">
        <p className="font-semibold text-slate-600">{title}</p>
        {
            (limit > 0) && (
            <p className="text-xs text-slate-500">
              <span className={limitClassname}>
                {limit - value.length}
              </span>
              {' '}
              Character Left
            </p>
            )
        }
      </div>
      <input
        className={inputClassname}
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={(e : ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={value}
      />
    </label>
  );
}
