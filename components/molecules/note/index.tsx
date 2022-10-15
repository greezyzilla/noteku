import {
  ArchiveBoxIcon, PencilSquareIcon, StarIcon, TrashIcon,
} from '@heroicons/react/24/solid';
import { NoteInterface } from '../../../interfaces';
import { showFormattedDate } from '../../../utils';
import { EditNoteForm } from '../form';
import NoteAction from './noteAction';

interface NoteProps extends NoteInterface{
    onDelete(_id: number): void;
    onArchive(_id: number): void;
    onStar(_id: number): void;
    onEdit(_id: number, _note : NoteInterface): void;
}

export default function Note(props : NoteProps) {
  const {
    id, title, body, createdAt, onDelete, onArchive, onStar, onEdit, archived, starred,
  } = props;
  const note = {
    id, title, body, createdAt, archived, starred,
  };

  return (
    <div key={id} className="box-border flex min-h-[350px] flex-col gap-2 border bg-white/70 shadow-sm ring-slate-100 backdrop-blur-md hover:shadow-lg">
      <div className="h-fit w-full px-4 pt-4">
        <p className="text-xs text-orange-600">{showFormattedDate(createdAt)}</p>
        <h5 className="w-full break-words text-lg font-semibold text-slate-600">{title}</h5>
      </div>
      <div className="flex h-full flex-col justify-between px-2 pb-2">
        <p className="mb-3 h-fit break-words px-2 text-sm font-normal leading-[170%] text-slate-600/90">{body}</p>
        <div className="flex">
          <NoteAction
            Icon={TrashIcon}
            label="Delete"
            onClick={() => onDelete(+id)}
          />
          <EditNoteForm
            onEdit={(n : NoteInterface) => onEdit(+id, n)}
            note={note}
          >
            {({ onClick }) => (
              <NoteAction
                Icon={PencilSquareIcon}
                label="Edit"
                onClick={() => onClick()}
              />
            )}
          </EditNoteForm>
          <NoteAction
            Icon={ArchiveBoxIcon}
            label="Archive"
            onClick={() => onArchive(+id)}
            isActive={archived}
          />
          <NoteAction
            Icon={StarIcon}
            label="Star"
            onClick={() => onStar(+id)}
            isActive={starred}
          />
        </div>
      </div>
    </div>
  );
}
