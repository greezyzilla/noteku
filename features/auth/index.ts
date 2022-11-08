import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getAccessToken, putAccessToken, removeAccessToken } from '../../utils/lib/cache';

export const signIn = createAsyncThunk(
  'auth/signInStatus',
  async (user : { email: string; password: string}) => {
    try {
      const { data: { error, accessToken } } = await axios({
        method: 'POST',
        url: '/api/auth',
        data: {
          email: user.email,
          password: user.password,
        },
      });

      if (error) throw new Error('auth attemp error');
      return { error: false, data: { accessToken } };
    } catch (e) {
      return { error: true };
    }
  },
);

export const signUp = createAsyncThunk(
  'auth/signUpStatus',
  async (user : { name: string; email: string; password: string}) => {
    try {
      await axios({
        method: 'POST',
        url: '/api/users',
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });

      return { error: false };
    } catch (e) {
      return { error: true };
    }
  },
);

interface UserInterface{
  name : string;
  email : string;
}

export interface AuthState{
    user?: UserInterface;
    loading: boolean;
}

const initialState : AuthState = {
  user: undefined,
  loading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getSession: (state) => {
      state.loading = true;
      const token = getAccessToken();
      if (!token) return;

      const user = jwt.decode(token) as UserInterface;
      state.user = {
        name: user.name,
        email: user.email,
      };
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<{loading : boolean}>) => {
      state.loading = action.payload.loading;
    },
    signOut: (state) => {
      removeAccessToken();
      state.user = undefined;
      console.log('logout');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => { state.loading = true; });
    builder.addCase(signUp.rejected, (state) => { state.loading = false; });
    builder.addCase(signUp.fulfilled, (state) => { state.loading = false; });
    builder.addCase(signIn.pending, (state) => { state.loading = true; });
    builder.addCase(signIn.rejected, (state) => { state.loading = false; });
    builder.addCase(signIn.fulfilled, (state, action) => {
      putAccessToken(action.payload.data?.accessToken);

      const user = jwt.decode(action.payload.data?.accessToken) as UserInterface;
      state.user = {
        name: user.name,
        email: user.email,
      };
      state.loading = false;
    });
  },
});

export const { getSession, setLoading, signOut } = authSlice.actions;
export default authSlice.reducer;
