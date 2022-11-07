import NavigationPill from './navigationPill';

export default function NavigationPills() {
  return (
    <div className="flex flex-1 bg-white/40 md:hidden">
      <ul className="my-3 flex flex-1 justify-center gap-3">
        <NavigationPill href="/">All Notes</NavigationPill>
        <NavigationPill href="/active">Active</NavigationPill>
        <NavigationPill href="/starred">Starred</NavigationPill>
        <NavigationPill href="/archived">Archived</NavigationPill>
      </ul>
    </div>
  );
}
