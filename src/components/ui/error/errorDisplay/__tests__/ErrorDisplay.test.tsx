import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorDisplay } from '../ErrorDisplay.component';

describe('ErrorDisplay', () => {
  it('should render with default props', () => {
    render(<ErrorDisplay />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(
      screen.getByText('An error occurred while loading the data.')
    ).toBeInTheDocument();
    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
  });

  it('should render with custom title and message', () => {
    render(
      <ErrorDisplay title="Custom Error" message="Custom error message" />
    );

    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('should call onRetry when retry button is clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorDisplay onRetry={onRetry} />);

    const retryButton = screen.getByTestId('retry-button');
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should show error details when error is provided', () => {
    const error = new Error('Test error');
    render(<ErrorDisplay error={error} />);

    expect(screen.getByText('Error details')).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it('should not show error details when no error is provided', () => {
    render(<ErrorDisplay />);

    expect(screen.queryByText('Error details')).not.toBeInTheDocument();
  });

  it('should render error icon', () => {
    render(<ErrorDisplay />);

    const icon = screen.getByText('Error').closest('div')?.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should have proper structure', () => {
    render(<ErrorDisplay />);

    const title = screen.getByRole('heading', { level: 3 });
    const button = screen.getByRole('button');

    expect(title).toHaveTextContent('Error');
    expect(button).toHaveTextContent('Try again');
  });
});
