import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getInitialData } from '../../utils';

export interface NoteInterface{
    id: number | string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
    starred?: boolean;
}

export interface NoteState{
    notes: NoteInterface[];
    filter: string;
}

const initialState : NoteState = {
  notes: getInitialData() || [],
  filter: '',
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    archiveNote: (state, action: PayloadAction<number>) => {
      const noteId = state.notes.findIndex((Note : NoteInterface) => +Note.id === +action.payload);
      state.notes[noteId].archived = !state.notes[noteId].archived;
    },

    starNote: (state, action:PayloadAction<number>) => {
      const noteId = state.notes.findIndex((Note : NoteInterface) => +Note.id === +action.payload);
      state.notes[noteId].starred = !state.notes[noteId].starred;
    },

    deleteNote: (state, action :PayloadAction<number>) => {
      state.notes = state.notes.filter((note : NoteInterface) => note.id !== action.payload);
    },

    searchNote: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },

    addNote: (state, action: PayloadAction<NoteInterface>) => {
      state.notes.unshift(action.payload);
    },

    editNote: (state, action: PayloadAction<{id : number | string, note : NoteInterface}>) => {
      const noteId = state.notes.findIndex((n : NoteInterface) => n.id === action.payload.id);
      state.notes[+noteId] = action.payload.note;
    },
  },
});

export const {
  addNote, archiveNote, deleteNote, editNote, searchNote, starNote,
} = noteSlice.actions;

export default noteSlice.reducer;
