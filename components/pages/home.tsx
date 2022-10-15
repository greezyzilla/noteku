import { useAppSelector } from '../../app/hooks';
import { NoteList } from '../organisms';
import Dashboard from '../templates/dashboard';

export default function Home() {
  const { notes, filter } = useAppSelector((state) => state.note);
  const filteredNotes = notes
    .filter((note) => (
      note.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      || note.body.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    ));

  return (
    <Dashboard>
      <NoteList notes={filteredNotes} />
    </Dashboard>
  );
}
