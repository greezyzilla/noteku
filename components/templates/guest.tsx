import { ReactNode } from 'react';
import { ToggleDarkMode, ToggleLocale } from '../molecules';

export default function Guest({ children } : {children : ReactNode}) {
  return (
    <div className="relative flex h-screen max-h-screen items-center justify-center bg-gradient-to-b from-blue-100 to-orange-100 dark:from-slate-800 dark:to-gray-800">
      <div className="absolute top-4 right-4 flex gap-2">
        <ToggleLocale />
        <ToggleDarkMode />
      </div>
      {children}
    </div>
  );
}
