import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import classcat from 'classcat';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { searchNote } from '../../../features/note';

interface SearchNoteProps {
  isGrow?: boolean,
  hasIcon?: boolean,
}

export default function SearchNote({ hasIcon = false, isGrow = false } : Partial<SearchNoteProps>) {
  const { filter } = useAppSelector((state) => state.note);
  const { locale } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const inputClassname = classcat({
    '-mr-10 flex items-center justify-center border-slate-300 bg-transparent pl-4 text-xs text-slate-600 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:text-slate-300 dark:focus:ring-blue-900 sm:-mr-12 sm:text-sm md:bg-white dark:md:bg-slate-900': true,
    'w-full': isGrow,
    'w-48 sm:w-64': !isGrow,
    'h-full pr-12': hasIcon,
    'h-14 pr-4': !hasIcon,
  });

  const wrapperClassname = classcat({
    flex: true,
    'w-full': isGrow,
  });

  return (
    <div className={wrapperClassname}>
      <input
        type="search"
        className={inputClassname}
        placeholder={locale === 'en' ? 'Search note here...' : 'Cari catatan disini...'}
        value={filter}
        onChange={(e) => dispatch(searchNote(e.target.value))}
      />
      { hasIcon && (
        <div className="flex h-10 w-10 items-center justify-center bg-blue-500 sm:h-12 sm:w-12">
          <MagnifyingGlassIcon className="h-4 w-4 text-white dark:text-slate-900" />
        </div>
      )}
    </div>
  );
}
