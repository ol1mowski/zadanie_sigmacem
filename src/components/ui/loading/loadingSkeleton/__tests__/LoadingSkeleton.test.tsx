import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSkeleton } from '../LoadingSkeleton.component';

describe('LoadingSkeleton', () => {
  it('should render with default card type', () => {
    render(<LoadingSkeleton />);

    const skeleton = screen.getByTestId('loading-skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton.className).toContain('skeleton');
    expect(skeleton.className).toContain('card');
  });

  it('should render with different types', () => {
    const { rerender } = render(<LoadingSkeleton type="text" />);
    let skeleton = screen.getByTestId('loading-skeleton');
    expect(skeleton.className).toContain('text');

    rerender(<LoadingSkeleton type="image" />);
    skeleton = screen.getByTestId('loading-skeleton');
    expect(skeleton.className).toContain('image');
  });

  it('should render skeleton elements for card type', () => {
    render(<LoadingSkeleton type="card" />);

    const skeleton = screen.getByTestId('loading-skeleton');
    const imageElement = skeleton.querySelector('[class*="skeletonImage"]');
    const contentElement = skeleton.querySelector('[class*="skeletonContent"]');
    const titleElement = skeleton.querySelector('[class*="skeletonTitle"]');
    const priceElement = skeleton.querySelector('[class*="skeletonPrice"]');

    expect(imageElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  it('should render skeleton text element for text type', () => {
    render(<LoadingSkeleton type="text" />);

    const skeleton = screen.getByTestId('loading-skeleton');
    const textElement = skeleton.querySelector('[class*="skeletonText"]');

    expect(textElement).toBeInTheDocument();
  });

  it('should render skeleton image element for image type', () => {
    render(<LoadingSkeleton type="image" />);

    const skeleton = screen.getByTestId('loading-skeleton');
    const imageElement = skeleton.querySelector('[class*="skeletonImage"]');

    expect(imageElement).toBeInTheDocument();
  });

  it('should have proper structure for card type', () => {
    render(<LoadingSkeleton type="card" />);

    const skeleton = screen.getByTestId('loading-skeleton');
    expect(skeleton.className).toContain('skeleton');
    expect(skeleton.className).toContain('card');
    expect(
      skeleton.querySelector('[class*="skeletonImage"]')
    ).toBeInTheDocument();
    expect(
      skeleton.querySelector('[class*="skeletonContent"]')
    ).toBeInTheDocument();
  });
});
