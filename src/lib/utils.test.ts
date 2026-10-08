import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cn, copyToClipboard, scrollToTop } from './utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('px-2 py-1', 'bg-black')).toBe('px-2 py-1 bg-black');
  });

  it('handles conditional classes and falsy values', () => {
    const isHidden = false;
    expect(cn('base', isHidden && 'hidden', null, undefined, 'active')).toBe('base active');
  });

  it('resolves conflicting tailwind classes with twMerge', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('uses navigator.clipboard when isSecureContext is true', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
    });
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      configurable: true,
    });

    const result = await copyToClipboard('test copy');
    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('test copy');
  });

  it('falls back to document.execCommand when clipboard API fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockRejectedValue(new Error('Permission denied')),
      },
      configurable: true,
    });
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      configurable: true,
    });

    const result = await copyToClipboard('test copy');
    expect(result).toBe(false);
  });
});

describe('scrollToTop', () => {
  it('invokes window.scrollTo with 0, 0', () => {
    const scrollMock = vi.fn();
    window.scrollTo = scrollMock;

    scrollToTop('instant');
    expect(scrollMock).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
  });
});
