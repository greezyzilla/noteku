import classcat from 'classcat';
import { ReactElement } from 'react';
import { Button } from '../../atoms';

interface ToggleButtonInterface {
    value: string;
    onToggle() : void;
    children(_props : any) : ReactElement,
    trueState: string;
    falseState: string;
    className?: string;
}

export default function ToggleButton(props : Partial<ToggleButtonInterface>) {
  const {
    value, onToggle, children = () => '', trueState, falseState, className,
  } = props;

  const onActiveClass = classcat({
    'absolute flex h-full w-full items-center justify-center transition-all ease-in-out': true,
    'scale-100 opacity-100': value === trueState,
    'scale-0 opacity-0': value === falseState,
  });

  const onInactiveClass = classcat({
    'absolute flex h-full w-full items-center justify-center transition-all ease-in-out': true,
    'scale-0 opacity-0': value === trueState,
    'scale-100 opacity-100': value === falseState,
  });

  const buttonClass = classcat([
    'relative flex',
    className,
  ]);

  return (
    <Button onClick={onToggle} className={buttonClass}>
      {children({ onActiveClass, onInactiveClass })}
    </Button>
  );
}
