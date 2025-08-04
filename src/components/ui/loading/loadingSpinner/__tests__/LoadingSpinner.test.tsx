import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from '../LoadingSpinner.component';

describe('LoadingSpinner', () => {
  it('should render with default props', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner.className).toContain('spinner');
    expect(spinner.className).toContain('medium');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="small" />);
    let spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toContain('small');

    rerender(<LoadingSpinner size="large" />);
    spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toContain('large');
  });

  it('should have spinner inner element', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('loading-spinner');
    const spinnerInner = spinner.querySelector('[class*="spinnerInner"]');
    expect(spinnerInner).toBeInTheDocument();
  });

  it('should have proper structure', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toContain('spinner');
    expect(
      spinner.querySelector('[class*="spinnerInner"]')
    ).toBeInTheDocument();
  });
});
