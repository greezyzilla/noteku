interface InputTextareaProps {
    name : string;
    title : string;
    placeholder : string;
    value: string;
    onChange(_e : {target :{ name : string, value: string}}) : void;
}

export default function InputTextarea(props : Partial<InputTextareaProps>) {
  const {
    name = '', title, value = '', onChange = () => {},
  } = props;

  const onBlurHandle = (e : any) => {
    onChange({
      target: {
        name,
        value: e.target.innerHTML,
      },
    });
  };

  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-1 md:gap-2"
    >
      <p className="font-semibold text-slate-600 dark:text-slate-400">{title}</p>
      <p
        className="h-72 rounded-md border-2 border-blue-300 p-3 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-blue-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-700 dark:focus:ring-blue-800 md:p-4"
        onBlur={(e) => onBlurHandle(e)}
        contentEditable
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </label>
  );
}
