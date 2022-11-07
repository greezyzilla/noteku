import { PlusIcon } from '@heroicons/react/24/solid';
import { ReactElement } from 'react';
import { AddNoteForm } from '../molecules';
import {
  Footer, Header, Sidebar,
} from '../organisms';
import SearchNote from '../organisms/header/searchNote';

export default function Dashboard({ children } : {children : ReactElement}) {
  return (
    <div className="relative h-screen max-h-screen bg-gradient-to-b from-blue-100 to-orange-100 dark:from-slate-800 dark:to-gray-800">
      <div className="md:hidden">
        <AddNoteForm>
          {({ onClick } : any) => (
            <button
              type="button"
              className="group absolute bottom-5 right-5 z-10 rounded-full !bg-blue-500 !p-4 !text-white shadow-lg shadow-slate-400 dark:!bg-blue-500 dark:!text-slate-800 dark:!shadow-slate-800 dark:hover:bg-blue-300"
              onClick={onClick}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          )}
        </AddNoteForm>
      </div>
      <div className="container mx-auto box-border flex h-full flex-col">
        <Header />
        <main className="flex h-full overflow-hidden">
          <div className="flex flex-1 flex-col md:grid md:grid-cols-12">
            <div className="mb-2 flex bg-white/40 dark:bg-slate-900/40 md:hidden">
              <SearchNote isGrow />
            </div>
            <Sidebar />
            <div className="flex h-full overflow-y-auto md:col-span-9 lg:col-span-10">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
