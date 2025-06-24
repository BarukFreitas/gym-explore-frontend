'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { Provider } from 'react-redux';
import { store } from '@/app/store/store'; 

import theme from '../theme';
import createEmotionCache from '../createEmotionCache'; 

const clientSideEmotionCache = createEmotionCache();

interface MuiReduxProviderProps {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
}

export default function MuiReduxProvider(props: MuiReduxProviderProps) {
  const { children, emotionCache = clientSideEmotionCache } = props;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}