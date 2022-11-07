import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ThemeType {
    DARK = 'dark',
    LIGHT = 'light'
}

export enum LocaleType {
    EN = 'en',
    ID = 'id'
}

export interface ThemeState{
    theme: ThemeType;
    locale: LocaleType;
}

const initialState : ThemeState = {
  theme: ThemeType.LIGHT,
  locale: LocaleType.ID,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === ThemeType.LIGHT) {
        state.theme = ThemeType.DARK;
        document.documentElement.setAttribute('data-theme', ThemeType.DARK);
        localStorage.setItem('theme', ThemeType.DARK);
      } else {
        state.theme = ThemeType.LIGHT;
        document.documentElement.setAttribute('data-theme', ThemeType.LIGHT);
        localStorage.setItem('theme', ThemeType.LIGHT);
      }
    },

    toggleLocale: (state) => {
      if (state.locale === LocaleType.ID) {
        state.locale = LocaleType.EN;
        localStorage.setItem('locale', LocaleType.EN);
      } else {
        state.locale = LocaleType.ID;
        localStorage.setItem('locale', LocaleType.ID);
      }
    },

    setInitialTheme: (state, action: PayloadAction<{theme : ThemeType; locale: LocaleType}>) => {
      state.theme = action.payload.theme;
      document.documentElement.setAttribute('data-theme', action.payload.theme);
      state.locale = action.payload.locale;
    },
  },
});

export const {
  toggleLocale, toggleTheme, setInitialTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
