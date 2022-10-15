import SearchNote from './searchNote';

export default function Header() {
  return (
    <header className="flex h-fit w-full bg-white/80 shadow-sm">
      <div className="grid w-full flex-1 grid-cols-12 px-4 sm:px-8">
        <div className="col-span-2 flex items-center py-3">
          <p className="text-3xl font-black text-slate-600">
            <span className="text-blue-500">NOTE</span>
            <span className="text-orange-400">KU</span>
          </p>
        </div>
        <div className="col-span-10 py-3">
          <div className="flex justify-end">
            <SearchNote />
          </div>
        </div>
      </div>
    </header>
  );
}
