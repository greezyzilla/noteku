import classcat from 'classcat';
import { ChangeEvent } from 'react';

interface InputTextareaProps {
    name : string;
    title : string;
    placeholder : string;
    value: string;
    onChange(_e : ChangeEvent<HTMLTextAreaElement>) : void;
    cols? : number;
    rows? : number;
    isPrimary? : boolean;
    isSecondary? : boolean;
}

export default function InputTextarea(props : Partial<InputTextareaProps>) {
  const {
    name = 'input-textarea', title = 'Title', value = '', cols = 30, rows = 10,
    onChange = () => {}, placeholder = 'This is placeholder...', isPrimary = false, isSecondary = false,
  } = props;

  const inputClassname = classcat({
    'rounded-md border-2 p-3 text-sm text-slate-700 focus:outline-none focus:ring-2': true,
    'border-blue-300 focus:border-blue-400 focus:ring-blue-100': isPrimary && !isSecondary,
    'border-orange-300 focus:border-orange-400 focus:ring-orange-100': !isPrimary && isSecondary,
    'border-slate-300 focus:border-slate-400 focus:ring-slate-100': !isPrimary && !isSecondary,
  });

  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-1"
    >
      <p className="font-semibold text-slate-600">{title}</p>
      <textarea
        className={inputClassname}
        name={name}
        cols={cols}
        placeholder={placeholder}
        rows={rows}
        onChange={(e : ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
        value={value}
      />
    </label>
  );
}
