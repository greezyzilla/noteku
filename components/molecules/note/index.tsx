import {
  ArchiveBoxIcon, PencilSquareIcon, StarIcon, TrashIcon,
} from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteNote, editNote } from '../../../features/note';
import { NoteInterface } from '../../../interfaces';
import { showFormattedDate } from '../../../utils';
import { EditNoteForm } from '../form';
import NoteAction from './noteAction';

const copywrite = {
  buttons: {
    delete: {
      en: 'Delete',
      id: 'Hapus',
    },
    edit: {
      en: 'Edit',
      id: 'Sunting',
    },
    archive: {
      en: 'Archive',
      id: 'Arsipkan',
    },
    star: {
      en: 'Star',
      id: 'Bintang',
    },
  },
};

export default function Note({ note } : {note: NoteInterface}) {
  const locale = useAppSelector((state) => state.theme.locale);

  const dispatch = useAppDispatch();
  const onStar = () => {
    dispatch(editNote({
      ...note,
      starred: !note.starred,
    }));
  };

  const onArchive = () => {
    dispatch(editNote({
      ...note,
      archived: !note.archived,
    }));
  };

  const onDelete = () => {
    dispatch(deleteNote(note.id));
  };

  return (
    <div className="box-border flex min-h-[350px] flex-col gap-2 border bg-white/70 shadow-sm ring-slate-100 backdrop-blur-md hover:shadow-lg dark:border-slate-900 dark:bg-slate-900/70 dark:shadow-white/5 dark:hover:bg-slate-900">
      <div className="h-fit w-full px-4 pt-4">
        <p className="text-xs text-orange-600 dark:text-orange-400">{showFormattedDate(note.createdAt)}</p>
        <h5 className="w-full break-words text-lg font-semibold text-slate-600 dark:text-slate-400">{note.title}</h5>
      </div>
      <div className="flex h-full flex-col justify-between px-2 pb-2">
        <p className="mb-3 h-fit break-words px-2 text-sm font-normal leading-[170%] text-slate-600/90 dark:text-slate-400/90">{parse(note.body)}</p>
        <div className="flex">
          <NoteAction
            Icon={TrashIcon}
            label={copywrite.buttons.delete[locale]}
            onClick={onDelete}
          />
          <EditNoteForm note={note}>
            {(editNoteChildren : { onClick : () => void}) => (
              <NoteAction
                Icon={PencilSquareIcon}
                label={copywrite.buttons.edit[locale]}
                onClick={editNoteChildren.onClick}
              />
            )}
          </EditNoteForm>
          <NoteAction
            Icon={ArchiveBoxIcon}
            label={copywrite.buttons.archive[locale]}
            onClick={onArchive}
            isActive={note.archived}
          />
          <NoteAction
            Icon={StarIcon}
            label={copywrite.buttons.star[locale]}
            onClick={onStar}
            isActive={note.starred}
          />
        </div>
      </div>
    </div>
  );
}
