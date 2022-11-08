import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../app/hooks';

export default function Loading() {
  const locale = useAppSelector((state) => state.theme.locale);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center  gap-4">
      <ArrowPathIcon className="h-20 w-20 animate-spin text-slate-500 dark:text-slate-400" />
      <p className="font-medium text-slate-600 dark:text-slate-400">{locale === 'en' ? 'Loading...' : 'Memuat...'}</p>
    </div>
  );
}
