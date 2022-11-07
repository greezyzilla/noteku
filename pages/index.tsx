import { useAppSelector } from '../app/hooks';
import { NoteList } from '../components/organisms';
import Dashboard from '../components/templates/dashboard';

export default function HomePage() {
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
