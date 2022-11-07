import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchWithToken } from '../../utils';

export interface NoteInterface{
    id: number;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
    starred?: boolean;
}

export interface NoteState{
    notes: NoteInterface[];
    filter: string;
    loading: boolean;
}

const initialState : NoteState = {
  notes: [],
  filter: '',
  loading: true,
};

export const getNote = createAsyncThunk(
  'note/get',
  async () => {
    try {
      const payload = await fetchWithToken('/api/notes', {});
      if (payload.error) throw new Error();
      return payload;
    } catch (e) {
      return { error: true };
    }
  },
);

export const addNote = createAsyncThunk(
  'note/add',
  async ({ title, body } : { title: string; body: string}) => {
    try {
      const payload = await fetchWithToken('/api/notes', {
        method: 'POST',
        data: { title, body },
      });

      if (payload.error) throw new Error();
      return payload;
    } catch (e) {
      return { error: true };
    }
  },
);

export const editNote = createAsyncThunk(
  'note/edit',
  async ({
    id, title, body, starred, archived,
  } : NoteInterface) => {
    try {
      const payload = await fetchWithToken(`/api/notes/${id}`, {
        method: 'PUT',
        data: {
          title, body, starred, archived,
        },
      });

      if (payload.error) throw new Error();
      return payload;
    } catch (e) {
      return { error: true };
    }
  },
);

export const deleteNote = createAsyncThunk(
  'note/delete',
  async (id : number) => {
    try {
      await fetchWithToken(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      return { error: false, data: { id } };
    } catch (e) {
      return { error: true };
    }
  },
);

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    searchNote: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNote.pending, (state) => { state.loading = true; });
    builder.addCase(getNote.rejected, (state) => { state.loading = false; });
    builder.addCase(getNote.fulfilled, (state, action) => {
      if (!action.payload.error) state.notes = action.payload.data.notes;
      state.loading = false;
    });
    builder.addCase(addNote.pending, (state) => { state.loading = true; });
    builder.addCase(addNote.rejected, (state) => { state.loading = false; });
    builder.addCase(addNote.fulfilled, (state, action) => {
      if (!action.payload.error) state.notes.push(action.payload.data.note);
      state.loading = false;
    });
    builder.addCase(editNote.pending, (state) => { state.loading = true; });
    builder.addCase(editNote.rejected, (state) => { state.loading = false; });
    builder.addCase(editNote.fulfilled, (state, action) => {
      if (!action.payload.error) {
        const index = state.notes.findIndex((note) => note.id === action.payload.data.note.id);
        state.notes[index] = action.payload.data.note;
      }
      state.loading = false;
    });
    builder.addCase(deleteNote.pending, (state) => { state.loading = true; });
    builder.addCase(deleteNote.rejected, (state) => { state.loading = false; });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.notes = state.notes.filter((note) => note.id !== action.payload.data?.id);
      }
      state.loading = false;
    });
  },
});

export const { searchNote } = noteSlice.actions;
export default noteSlice.reducer;
