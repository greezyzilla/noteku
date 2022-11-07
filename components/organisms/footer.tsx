import { useAppSelector } from '../../app/hooks';

export default function Footer() {
  const locale = useAppSelector((state) => state.theme.locale);
  return (
    <footer className="pb-1 pt-2 text-center text-sm text-slate-500 dark:text-slate-400">
      {locale === 'en' ? 'Created with 💖 by' : 'Dibuat dengan  💖 oleh'}
      &nbsp;
      <a href="https://github.com/greezyzilla" className="font-semibold hover:text-slate-700 dark:hover:text-slate-300">
        GreezyZilla
      </a>
    </footer>
  );
}
