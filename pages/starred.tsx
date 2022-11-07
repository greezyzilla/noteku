import { useAppSelector } from '../app/hooks';
import { NoteList } from '../components/organisms';
import Dashboard from '../components/templates/dashboard';

export default function StarredPage() {
  const { notes } = useAppSelector((state) => state.note);
  const filteredNotes = notes.filter((note) => note.starred);

  return (
    <Dashboard>
      <NoteList notes={filteredNotes} />
    </Dashboard>
  );
}
