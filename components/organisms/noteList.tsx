import { useAppSelector } from '../../app/hooks';
import { NoteInterface } from '../../interfaces';
import { Note } from '../molecules';
import Loading from './loading';

export default function NoteList({ notes } : {notes : NoteInterface[]}) {
  const notesElement = notes.map((note) => (<Note note={note} key={note.id} />));

  const loading = useAppSelector((state) => state.note.loading);
  if (loading) return <Loading />;

  return (
    <div className="box-border flex h-full w-full">
      {
        notesElement.length ? (
          <div className="box-border grid h-fit w-full grid-cols-1 gap-4 overflow-auto px-5 py-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            { notesElement }
          </div>
        ) : (
          <div className="mx-5 mt-3 box-border flex w-full flex-col items-center justify-center bg-white/80 md:ml-3 xl:mr-3">
            <div className="flex flex-col items-center justify-center">
              <img src="/404.gif" alt="404" className="-mt-24 -mb-16 h-72 w-72 sm:h-80 sm:w-80" />
              <p className="text-center text-sm font-semibold leading-4 text-slate-500 sm:text-lg sm:leading-7">
                Whooopss... no note found
                <br />
                But you can always create the new one!
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
}
