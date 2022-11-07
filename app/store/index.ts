import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice, NoteSlice, ThemeSlice } from '../../features';

export const store = configureStore({
  reducer: {
    note: NoteSlice,
    theme: ThemeSlice,
    auth: AuthSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
