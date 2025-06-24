import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import HeroSection from './HeroSection';

import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('@/public/academia.png', () => ({
  __esModule: true,
  default: '/academia.png',
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  useLocale: jest.fn(() => 'en'),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
    h1: ({ children }: { children?: React.ReactNode }) => <h1>{children}</h1>,
    p: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
  },
}));

jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter',
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  }),
}));

jest.mock('@mui/icons-material/Facebook', () => ({
  __esModule: true,
  default: () => <svg data-testid="FacebookIcon" />,
}));
jest.mock('@mui/icons-material/X', () => ({
  __esModule: true,
  default: () => <svg data-testid="XIcon" />,
}));
jest.mock('@mui/icons-material/Instagram', () => ({
  __esModule: true,
  default: () => <svg data-testid="InstagramIcon" />,
}));

const theme = createTheme();

describe('HeroSection', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  test('renderiza titulo e descrição de acordo com a internacionalização', () => {
    renderWithTheme(<HeroSection />);

    expect(screen.getByText('HeroSection.title')).toBeInTheDocument();
    expect(screen.getByText('HeroSection.description')).toBeInTheDocument();
  });

  test('renderiza o botão "Começar" com texto e link corretos', () => {
    renderWithTheme(<HeroSection />);

    const getStartedButton = screen.getByRole('link', { name: 'HeroSection.getStarted' });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute('href', 'en/gyms');
  });

  test('renderiza os ícones de redes sociais com links corretos', () => {
    renderWithTheme(<HeroSection />);

    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/');
    expect(screen.getByTestId('FacebookIcon')).toBeInTheDocument();

    const xLink = screen.getByRole('link', { name: /x/i });
    expect(xLink).toBeInTheDocument();
    expect(xLink).toHaveAttribute('href', 'https://x.com/home');
    expect(screen.getByTestId('XIcon')).toBeInTheDocument();

    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/');
    expect(screen.getByTestId('InstagramIcon')).toBeInTheDocument();
  });

  test('renderiza a imagem de fundo', () => {
    renderWithTheme(<HeroSection />);
    const backgroundImage = screen.getByAltText('Athlete working out in a gym');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveAttribute('src', '/academia.png');
  });

  test('renderiza o texto do componente Figma', () => {
    renderWithTheme(<HeroSection />);
    expect(screen.getByText('HeroSection.figmaComponent')).toBeInTheDocument();
  });
});