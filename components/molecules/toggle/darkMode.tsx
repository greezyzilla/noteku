import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleTheme } from '../../../features/theme';
import ToggleButton from './toggleButton';

export default function ToggleDarkMode() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div>
      <ToggleButton
        value={theme}
        onToggle={() => dispatch(toggleTheme())}
        trueState="light"
        falseState="dark"
        className="h-12 w-12 items-center justify-center rounded-lg bg-blue-100 font-medium text-slate-700 dark:bg-blue-900 dark:text-slate-200"
      >
        {({ onActiveClass, onInactiveClass }) => (
          <>
            <div className={onActiveClass}>
              <SunIcon className="h-6 w-6 text-slate-500 dark:text-slate-300" />
            </div>
            <div className={onInactiveClass}>
              <MoonIcon className="h-6 w-6 text-slate-500 dark:text-slate-300" />
            </div>
          </>
        )}
      </ToggleButton>
    </div>
  );
}
