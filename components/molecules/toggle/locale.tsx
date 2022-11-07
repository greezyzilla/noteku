import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleLocale } from '../../../features/theme';
import ToggleButton from './toggleButton';

export default function ToggleLocale() {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.theme.locale);
  return (
    <div>
      <ToggleButton
        value={locale}
        onToggle={() => dispatch(toggleLocale())}
        trueState="en"
        falseState="id"
        className="h-12 w-12 items-center justify-center rounded-lg bg-blue-100 font-medium text-slate-700 dark:bg-blue-900 dark:text-slate-300"
      >
        {({ onActiveClass, onInactiveClass }) => (
          <>
            <div className={onActiveClass}>en</div>
            <div className={onInactiveClass}>id</div>
          </>
        )}
      </ToggleButton>
    </div>
  );
}
