import {
  ArchiveBoxIcon, CalendarIcon, StarIcon, Squares2X2Icon,
} from '@heroicons/react/24/solid';
import { useAppSelector } from '../../../app/hooks';
import { Button } from '../../atoms';
import { AddNoteForm } from '../../molecules';
import SidebarItem from './sidebarItem';

const copywrite = {
  addButton: {
    id: 'Tambahkan Catatan',
    en: 'Add New Note',
  },
  sidebarItem: {
    all: {
      en: 'All Notes',
      id: 'Semua Catatan',
    },
    active: {
      en: 'Active',
      id: 'Aktif',
    },
    starred: {
      en: 'Starred',
      id: 'Berbintang',
    },
    archived: {
      en: 'Archived',
      id: 'Diarsipkan',
    },
  },
};

export default function Sidebar() {
  const locale = useAppSelector((state) => state.theme.locale);

  return (
    <div className="col-span-3 my-3 ml-3 hidden h-full flex-col gap-2 backdrop-blur-lg md:flex lg:col-span-2">
      <div className="flex w-full justify-center pb-1">
        <AddNoteForm>
          {({ onClick } : any) => (
            <Button onClick={onClick} className="flex-1 bg-blue-500 !p-4 text-center font-medium !text-white shadow-sm hover:bg-blue-600 hover:shadow-lg dark:!bg-blue-500 dark:!text-slate-900 dark:!shadow-white/5">
              {copywrite.addButton[locale]}
            </Button>
          )}
        </AddNoteForm>
      </div>
      <div className="flex flex-1 flex-col gap-3 bg-white/80 p-3 shadow-sm dark:bg-slate-900/80">
        <div>
          <p className="ml-1 text-xs font-semibold text-slate-400 dark:text-slate-500">MENU</p>
          <SidebarItem Icon={Squares2X2Icon} label={copywrite.sidebarItem.all[locale]} path="/" />
        </div>
        <div>
          <p className="ml-1 text-xs font-semibold text-slate-400 dark:text-slate-500">TAGS</p>
          <div className="flex flex-col">
            <SidebarItem Icon={CalendarIcon} label={copywrite.sidebarItem.active[locale]} path="/active" />
            <SidebarItem Icon={StarIcon} label={copywrite.sidebarItem.starred[locale]} path="/starred" />
            <SidebarItem Icon={ArchiveBoxIcon} label={copywrite.sidebarItem.archived[locale]} path="/archived" />
          </div>
        </div>
      </div>
    </div>
  );
}
