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

  it('should render with small size', () => {
    render(<LoadingSpinner size="small" />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toContain('small');
  });

  it('should render with large size', () => {
    render(<LoadingSpinner size="large" />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toContain('large');
  });

  it('should apply custom className', () => {
    render(<LoadingSpinner className="custom-class" />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('custom-class');
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
