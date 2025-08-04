import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorFallback } from '../ErrorFallback.component';

describe('ErrorFallback', () => {
  it('should render with default content', () => {
    render(<ErrorFallback />);

    expect(screen.getByText('Ups! Coś poszło nie tak')).toBeInTheDocument();
    expect(
      screen.getByText('Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.')
    ).toBeInTheDocument();
  });

  it('should call resetErrorBoundary when retry button is clicked', () => {
    const resetErrorBoundary = vi.fn();
    render(<ErrorFallback resetErrorBoundary={resetErrorBoundary} />);

    const retryButton = screen.getByText('Spróbuj ponownie');
    fireEvent.click(retryButton);

    expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
  });

  it('should not show retry button when resetErrorBoundary is not provided', () => {
    render(<ErrorFallback />);

    expect(screen.queryByText('Spróbuj ponownie')).not.toBeInTheDocument();
  });

  it('should have proper structure', () => {
    render(<ErrorFallback />);

    const title = screen.getByRole('heading', { level: 2 });
    const message = screen.getByText(
      'Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.'
    );

    expect(title).toHaveTextContent('Ups! Coś poszło nie tak');
    expect(message).toBeInTheDocument();
  });

  it('should render with resetErrorBoundary button', () => {
    const resetErrorBoundary = vi.fn();
    render(<ErrorFallback resetErrorBoundary={resetErrorBoundary} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Spróbuj ponownie');
  });
});
