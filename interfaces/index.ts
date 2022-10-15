export interface NoteInterface{
    id: number | string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
    starred?: boolean;
}

export interface PageInterface{
    notes : NoteInterface[];
    filter: string;
    onArchive(_id: number) : void;
    onStar(_id: number) : void;
    onDelete(_id: number) : void;
    onSearch(_query: string) : void;
    onAdd(_note: NoteInterface) : void;
    onEdit(_id : number | string, _note: NoteInterface) : void;
}
