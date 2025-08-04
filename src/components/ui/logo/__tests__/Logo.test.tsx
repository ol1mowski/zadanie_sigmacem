import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from '../Logo.component';

describe('Logo', () => {
  it('should render logo with text and image', () => {
    render(<Logo />);

    expect(screen.getByText('ShopOnline')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('should render logo image with correct src', () => {
    render(<Logo />);

    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toHaveAttribute('src');
  });

  it('should have proper structure', () => {
    render(<Logo />);

    const logoContainer = screen.getByText('ShopOnline').closest('div');
    const logoImage = screen.getByAltText('Logo');
    const logoText = screen.getByText('ShopOnline');

    expect(logoContainer).toContainElement(logoImage);
    expect(logoContainer).toContainElement(logoText);
  });
});
