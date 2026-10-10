import { describe, it, expect } from 'vitest';
import {
  getPaginatedComponents,
  generatePaginationRange,
  isComponentNew,
  getSortedComponents,
  getNewestComponent,
} from './components';
import type { KitComponentMeta } from '../types/component';

const createMockComponent = (id: string, name: string, createdAt: string): KitComponentMeta => ({
  id,
  name,
  tagline: 'Test Tagline',
  description: 'Test Description',
  category: 'Motion',
  badges: ['Test'],
  cliCommand: `npx shadcn@latest add ${id}`,
  usageCode: '<Demo />',
  props: [],
  accessibility: [],
  features: [],
  createdAt,
});

describe('getPaginatedComponents', () => {
  const mockComponents: KitComponentMeta[] = Array.from({ length: 25 }, (_, i) =>
    createMockComponent(`comp-${i + 1}`, `Component ${i + 1}`, `2026-08-${String(i + 1).padStart(2, '0')}`)
  );

  it('correctly calculates page 1 with standard page size', () => {
    const result = getPaginatedComponents(mockComponents, 1, 10);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(3);
    expect(result.totalItems).toBe(25);
    expect(result.items.length).toBe(10);
    expect(result.items[0].id).toBe('comp-1');
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(false);
  });

  it('correctly calculates middle page', () => {
    const result = getPaginatedComponents(mockComponents, 2, 10);
    expect(result.currentPage).toBe(2);
    expect(result.items.length).toBe(10);
    expect(result.items[0].id).toBe('comp-11');
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(true);
  });

  it('correctly calculates last page with remainder items', () => {
    const result = getPaginatedComponents(mockComponents, 3, 10);
    expect(result.currentPage).toBe(3);
    expect(result.items.length).toBe(5);
    expect(result.items[0].id).toBe('comp-21');
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(true);
  });

  it('handles page 0 by clamping to page 1', () => {
    const result = getPaginatedComponents(mockComponents, 0, 10);
    expect(result.currentPage).toBe(1);
    expect(result.items.length).toBe(10);
  });

  it('handles negative page numbers by clamping to page 1', () => {
    const result = getPaginatedComponents(mockComponents, -5, 10);
    expect(result.currentPage).toBe(1);
  });

  it('handles page exceeding total pages by clamping to max page', () => {
    const result = getPaginatedComponents(mockComponents, 999, 10);
    expect(result.currentPage).toBe(3);
    expect(result.items.length).toBe(5);
  });

  it('handles empty component list gracefully', () => {
    const result = getPaginatedComponents([], 1, 10);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(1);
    expect(result.totalItems).toBe(0);
    expect(result.items.length).toBe(0);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(false);
  });
});

describe('generatePaginationRange', () => {
  it('returns all numbers when total pages <= 7', () => {
    expect(generatePaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(generatePaginationRange(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('generates right ellipsis when current page is near the start', () => {
    const range = generatePaginationRange(2, 10);
    expect(range).toEqual([1, 2, 3, 4, 5, '...', 10]);
  });

  it('generates left ellipsis when current page is near the end', () => {
    const range = generatePaginationRange(9, 10);
    expect(range).toEqual([1, '...', 6, 7, 8, 9, 10]);
  });

  it('generates both left and right ellipsis when in the middle', () => {
    const range = generatePaginationRange(5, 10);
    expect(range).toEqual([1, '...', 4, 5, 6, '...', 10]);
  });
});

describe('isComponentNew (Persistent 7-day per-component system)', () => {
  const BASE_TIME = new Date('2026-08-29T12:00:00.000Z').getTime();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  it('returns true for component created 0 days ago (today)', () => {
    const comp = createMockComponent('c0', 'Comp 0', '2026-08-29T12:00:00.000Z');
    expect(isComponentNew(comp, BASE_TIME)).toBe(true);
  });

  it('returns true for component created 1 day ago', () => {
    const created = new Date(BASE_TIME - 1 * ONE_DAY_MS).toISOString();
    const comp = createMockComponent('c1', 'Comp 1', created);
    expect(isComponentNew(comp, BASE_TIME)).toBe(true);
  });

  it('returns true for component created 6 days ago', () => {
    const created = new Date(BASE_TIME - 6 * ONE_DAY_MS).toISOString();
    const comp = createMockComponent('c6', 'Comp 6', created);
    expect(isComponentNew(comp, BASE_TIME)).toBe(true);
  });

  it('returns true for component created just under 7 days ago (6 days 23 hours 59 min)', () => {
    const justUnder7Days = BASE_TIME - (7 * ONE_DAY_MS - 1000); // 1 second before 7 days
    const comp = createMockComponent('cUnder7', 'Comp Under 7', new Date(justUnder7Days).toISOString());
    expect(isComponentNew(comp, BASE_TIME)).toBe(true);
  });

  it('returns false for component created exactly 7 days ago', () => {
    const exactly7Days = BASE_TIME - (7 * ONE_DAY_MS);
    const comp = createMockComponent('cExact7', 'Comp Exact 7', new Date(exactly7Days).toISOString());
    expect(isComponentNew(comp, BASE_TIME)).toBe(false);
  });

  it('returns false for component created 8 days ago', () => {
    const created = new Date(BASE_TIME - 8 * ONE_DAY_MS).toISOString();
    const comp = createMockComponent('c8', 'Comp 8', created);
    expect(isComponentNew(comp, BASE_TIME)).toBe(false);
  });

  it('returns false for component with future timestamp', () => {
    const futureTime = new Date(BASE_TIME + 2 * ONE_DAY_MS).toISOString();
    const comp = createMockComponent('cFuture', 'Comp Future', futureTime);
    expect(isComponentNew(comp, BASE_TIME)).toBe(false);
  });

  it('handles missing or empty createdAt gracefully (returns false)', () => {
    expect(isComponentNew(null, BASE_TIME)).toBe(false);
    expect(isComponentNew(undefined, BASE_TIME)).toBe(false);
    expect(isComponentNew({ createdAt: '' } as any, BASE_TIME)).toBe(false);
    expect(isComponentNew({} as any, BASE_TIME)).toBe(false);
  });

  it('handles invalid date strings gracefully without crashing (returns false)', () => {
    const comp = createMockComponent('cInvalid', 'Comp Invalid', 'not-a-valid-date');
    expect(isComponentNew(comp, BASE_TIME)).toBe(false);
  });

  it('evaluates multiple independent components concurrently with independent lifecycles', () => {
    const compA = createMockComponent('a', 'Comp A', '2026-08-29T12:00:00.000Z'); // Today -> NEW
    const compB = createMockComponent('b', 'Comp B', '2026-08-28T12:00:00.000Z'); // 1 day ago -> NEW
    const compC = createMockComponent('c', 'Comp C', '2026-08-23T12:00:00.000Z'); // 6 days ago -> NEW
    const compD = createMockComponent('d', 'Comp D', '2026-08-19T12:00:00.000Z'); // 10 days ago -> NOT NEW

    expect(isComponentNew(compA, BASE_TIME)).toBe(true);
    expect(isComponentNew(compB, BASE_TIME)).toBe(true);
    expect(isComponentNew(compC, BASE_TIME)).toBe(true);
    expect(isComponentNew(compD, BASE_TIME)).toBe(false);
  });

  it('guarantees unrelated repository pushes have zero effect on existing component NEW status', () => {
    const compA = createMockComponent('a', 'Comp A', '2026-08-27T00:00:00.000Z');
    const compB = createMockComponent('b', 'Comp B', '2026-08-28T00:00:00.000Z');

    // Day 1 (Aug 28)
    const day1 = new Date('2026-08-28T12:00:00.000Z').getTime();
    expect(isComponentNew(compA, day1)).toBe(true);
    expect(isComponentNew(compB, day1)).toBe(true);

    // Day 2 (Aug 29) - Unrelated code pushed
    const day2 = new Date('2026-08-29T12:00:00.000Z').getTime();
    expect(isComponentNew(compA, day2)).toBe(true);
    expect(isComponentNew(compB, day2)).toBe(true);

    // Day 3 (Aug 30) - Component C added
    const compC = createMockComponent('c', 'Comp C', '2026-08-30T12:00:00.000Z');
    const day3 = new Date('2026-08-30T12:00:00.000Z').getTime();
    expect(isComponentNew(compA, day3)).toBe(true);
    expect(isComponentNew(compB, day3)).toBe(true);
    expect(isComponentNew(compC, day3)).toBe(true);

    // Day 8 (Sep 4) - Comp A is 8 days old (expired), Comp B is 7 days old (expired), Comp C is 5 days old (NEW)
    const day8 = new Date('2026-09-04T12:00:00.000Z').getTime();
    expect(isComponentNew(compA, day8)).toBe(false);
    expect(isComponentNew(compB, day8)).toBe(false);
    expect(isComponentNew(compC, day8)).toBe(true);
  });

  it('supports YYYY-MM-DD date format as well as full ISO strings', () => {
    const compDateOnly = createMockComponent('date-only', 'Date Only', '2026-08-28');
    const compIso = createMockComponent('iso', 'ISO Format', '2026-08-28T14:30:00.000Z');

    expect(isComponentNew(compDateOnly, BASE_TIME)).toBe(true);
    expect(isComponentNew(compIso, BASE_TIME)).toBe(true);
  });
});

describe('getSortedComponents', () => {
  const c1 = createMockComponent('a', 'Alpha', '2026-08-05');
  const c2 = createMockComponent('b', 'Beta', '2026-08-20');
  const c3 = createMockComponent('c', 'Charlie', '2026-08-10');

  it('sorts newest first by createdAt', () => {
    const sorted = getSortedComponents([c1, c2, c3]);
    expect(sorted[0].id).toBe('b');
    expect(sorted[1].id).toBe('c');
    expect(sorted[2].id).toBe('a');
  });

  it('resolves newest component correctly', () => {
    expect(getNewestComponent([c1, c2, c3])?.id).toBe('b');
    expect(getNewestComponent([])).toBeNull();
  });
});
