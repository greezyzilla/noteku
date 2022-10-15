import {
  ArchiveBoxIcon, CalendarIcon, StarIcon, Squares2X2Icon,
} from '@heroicons/react/24/solid';
import { Button } from '../../atoms';
import { AddNoteForm } from '../../molecules';
import SidebarItem from './sidebarItem';

export default function Sidebar() {
  return (
    <div className="col-span-3 my-3 ml-3 hidden h-full flex-col gap-2 backdrop-blur-lg md:flex lg:col-span-2">
      <div className="flex w-full justify-center pb-1">
        <AddNoteForm>
          {({ onClick } : any) => (
            <Button onClick={onClick} className="flex-1 bg-blue-500 p-4 text-white shadow-sm hover:shadow-lg">
              Add New Note
            </Button>
          )}
        </AddNoteForm>
      </div>
      <div className="flex flex-1 flex-col gap-3 bg-white/80 p-3 shadow-sm">
        <div>
          <p className="ml-1 text-xs font-semibold text-slate-400">MENU</p>
          <SidebarItem Icon={Squares2X2Icon} label="All Notes" path="/notes" />
        </div>
        <div>
          <p className="ml-1 text-xs font-semibold text-slate-400">TAGS</p>
          <div className="flex flex-col">
            <SidebarItem Icon={CalendarIcon} label="Active" path="/notes/active" />
            <SidebarItem Icon={StarIcon} label="Starred" path="/notes/starred" />
            <SidebarItem Icon={ArchiveBoxIcon} label="Archived" path="/notes/archived" />
          </div>
        </div>
      </div>
    </div>
  );
}
