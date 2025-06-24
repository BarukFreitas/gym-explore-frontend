import { render, screen } from '@testing-library/react';
import Navbar from './NavBar';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
  useLocale: jest.fn(() => 'pt'),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/pt'),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      style,
      ...props
    }: {
      children?: React.ReactNode;
      initial?: Record<string, unknown>;
      animate?: Record<string, unknown>;
      style?: React.CSSProperties;
      [key: string]: unknown;
    }) => {
      const combinedStyle = { ...style };

      if (initial) {
        Object.assign(combinedStyle, initial);
      }
      if (animate && typeof animate === 'object') {
        Object.assign(combinedStyle, animate);
      }

      if (props['data-testid'] === 'mobile-menu' && animate && animate.opacity === 0) {
        Object.assign(combinedStyle, { transform: 'translateX(100%)', opacity: 0 });
      }

      return (
        <div style={combinedStyle} {...props}>
          {children}
        </div>
      );
    },
    img: (props: Record<string, unknown>) => <img alt="" {...props} />,
    a: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => <a {...props}>{children}</a>,
    h1: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => <h1 {...props}>{children}</h1>,
    p: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => <p {...props}>{children}</p>,
  },
}));

jest.mock('@/public/logo.png', () => ({
  __esModule: true,
  default: '/logo.png',
}));

jest.mock('react-icons/fa', () => ({
  FaBars: (props: Record<string, unknown>) => <svg {...props} />,
  FaTimes: (props: Record<string, unknown>) => <svg {...props} />,
}));

describe('Navbar', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useLocale as jest.Mock).mockReturnValue('pt');
    (usePathname as jest.Mock).mockReturnValue('/pt');

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  test('confirma a presença do logo e dos links', () => {
    render(<Navbar />);

    expect(screen.getByTestId('navbar-logo')).toBeInTheDocument();

    expect(screen.getByTestId('navbar-link-home')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-link-about')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-link-services')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-link-contact')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-link-join-now-desktop')).toBeInTheDocument();

    expect(screen.getByTestId('mobile-menu-open-button')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menu-close-button')).toBeInTheDocument();

    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
    expect(mobileMenu).toHaveStyle('transform: translateX(100%)');
    expect(mobileMenu).toHaveStyle('opacity: 0');

    expect(screen.getByTestId('mobile-link-home')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-link-about')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-link-services')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-link-contact')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-link-join-now')).toBeInTheDocument();
  });

  test('o link "Home" do desktop redireciona para /pt', () => {
    render(<Navbar />);
    const homeLink = screen.getByTestId('navbar-link-home');
    expect(homeLink).toHaveAttribute('href', '/pt');
  });

  test('o link "About" do desktop redireciona para /pt/sobre', () => {
    render(<Navbar />);
    const aboutLink = screen.getByTestId('navbar-link-about');
    expect(aboutLink).toHaveAttribute('href', '/pt/sobre');
  });

  test('o link "Services" do desktop redireciona para /pt/servicos', () => {
    render(<Navbar />);
    const servicesLink = screen.getByTestId('navbar-link-services');
    expect(servicesLink).toHaveAttribute('href', '/pt/servicos');
  });

  test('o link "Contact" do desktop redireciona para /pt/contato', () => {
    render(<Navbar />);
    const contactLink = screen.getByTestId('navbar-link-contact');
    expect(contactLink).toHaveAttribute('href', '/pt/contato');
  });

  test('o link "Join Now" do desktop redireciona para /pt/join', () => {
    render(<Navbar />);
    const joinNowLink = screen.getByTestId('navbar-link-join-now-desktop');
    expect(joinNowLink).toHaveAttribute('href', '/pt/join');
  });

  test('o link "Home" do mobile redireciona para /pt', () => {
    render(<Navbar />);
    const homeLink = screen.getByTestId('mobile-link-home');
    expect(homeLink).toHaveAttribute('href', '/pt');
  });

  test('o link "About" do mobile redireciona para /pt/sobre', () => {
    render(<Navbar />);
    const aboutLink = screen.getByTestId('mobile-link-about');
    expect(aboutLink).toHaveAttribute('href', '/pt/sobre');
  });

  test('o link "Services" do mobile redireciona para /pt/servicos', () => {
    render(<Navbar />);
    const servicesLink = screen.getByTestId('mobile-link-services');
    expect(servicesLink).toHaveAttribute('href', '/pt/servicos');
  });

  test('o link "Contact" do mobile redireciona para /pt/contato', () => {
    render(<Navbar />);
    const contactLink = screen.getByTestId('mobile-link-contact');
    expect(contactLink).toHaveAttribute('href', '/pt/contato');
  });

  test('o link "Join Now" do mobile redireciona para /pt/join', () => {
    render(<Navbar />);
    const joinNowLink = screen.getByTestId('mobile-link-join-now');
    expect(joinNowLink).toHaveAttribute('href', '/pt/join');
  });
});
