import { renderHook, act } from '@testing-library/react-hooks';
import useSort from '../../hooks/useSort';
import { SORT_DIRECTION } from '../../constants';
import { mockData } from './mock';

describe('useSort', () => {
  it('should initialize with default sorting', () => {
    const { result } = renderHook(() => useSort(mockData, 'id'));
    
    expect(result.current.sortedData).toEqual([
        { id: 1, name: 'John', age: 25 },
        { id: 2, name: 'Jane', age: 28 },
        { id: 3, name: 'Jack', age: 30 },
    ]);
  });

  it('should sort in descending order when already in ascending', () => {
    const { result } = renderHook(() => useSort(mockData, 'id'));

    act(() => {
      result.current.requestSort('id');
    });

    expect(result.current.sortedData).toEqual([
        { id: 3, name: 'Jack', age: 30 },
        { id: 2, name: 'Jane', age: 28 },
        { id: 1, name: 'John', age: 25 },
    ]);
  });

  it('should toggle sort direction when same key is clicked', () => {
    const { result } = renderHook(() => useSort(mockData, 'age'));

    act(() => {
      result.current.requestSort('age');
    });

    expect(result.current.sortConfig.direction).toBe(SORT_DIRECTION.DESCENDING);

    act(() => {
      result.current.requestSort('age');
    });

    expect(result.current.sortConfig.direction).toBe(SORT_DIRECTION.ASCENDING);
    expect(result.current.sortedData).toEqual([
        { id: 1, name: 'John', age: 25 },
        { id: 2, name: 'Jane', age: 28 },
        { id: 3, name: 'Jack', age: 30 },
    ]);
  });

  it('should handle empty data array', () => {
    const { result } = renderHook(() => useSort([], 'id'));
    expect(result.current.sortedData).toEqual([]);
  });

  it('should maintain original order if no sort key provided', () => {
    const { result } = renderHook(() => useSort(mockData));
    expect(result.current.sortedData).toEqual(mockData);
  });
});