import {
  ArchiveBoxIcon, PencilSquareIcon, StarIcon, TrashIcon,
} from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteNote, editNote } from '../../../features/note';
import { NoteInterface } from '../../../interfaces';
import { showFormattedDate } from '../../../utils';
import { EditNoteForm } from '../form';
import NoteAction from './noteAction';

interface EditResponse {
  payload : {
    error: boolean;
  }
}

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
  const onStar = async () => {
    const response = await dispatch(editNote({
      ...note,
      starred: !note.starred,
    }));

    if (!note.starred) {
      if (response.payload.error) {
        if (locale === 'en') toast.error('Failed add note to favoriteN');
        else toast.error('Gagal menambahkan catatan ke favorit');
      } else if (locale === 'en') toast.success('Note added to favorite successfully');
      else toast.success('Berhasil menambahkan catatan ke favorit');
    } else if (response.payload.error) {
      if (locale === 'en') toast.error('Failed remove note from favorite');
      else toast.error('Gagal mengeluarkan catatan dari favorit');
    } else if (locale === 'en') toast.success('Note removed from favorite successfully');
    else toast.success('Berhasil mengeluarkan catatan dari favorit');
  };

  const onArchive = async () => {
    const response = await dispatch(editNote({
      ...note,
      archived: !note.archived,
    })) as EditResponse;

    if (!note.archived) {
      if (response.payload.error) {
        if (locale === 'en') toast.error('Failed archieving note');
        else toast.error('Gagal mengarsipkan catatan');
      } else if (locale === 'en') toast.success('Note archived successfully');
      else toast.success('Berhasil mengarsipkan catatan');
    } else if (response.payload.error) {
      if (locale === 'en') toast.error('Failed unarchieving note');
      else toast.error('Gagal batal arsip catatan');
    } else if (locale === 'en') toast.success('Note unarchieved successfully');
    else toast.success('Berhasil batal arsip catatan');
  };

  const onDelete = async () => {
    const response = await dispatch(deleteNote(note.id)) as EditResponse;

    if (response.payload.error) {
      if (locale === 'en') toast.error('Error deleting note');
      else toast.error('Gagal menghapus catatan');
    } else if (locale === 'en') toast.success('Note deleted successfully');
    else toast.success('Catatan berhasil dihapus');
  };

  return (
    <div className="box-border flex min-h-[350px] flex-col gap-2 border bg-white/70 shadow-sm ring-slate-100 backdrop-blur-md hover:shadow-lg dark:border-slate-900 dark:bg-slate-900/70 dark:shadow-white/5 dark:hover:bg-slate-900">
      <div className="h-fit w-full px-4 pt-4">
        <p className="text-xs text-orange-600 dark:text-orange-400">{showFormattedDate(note.createdAt, locale)}</p>
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
