import { renderHook } from '@testing-library/react-hooks';
import useFilterData from '../../hooks/useFilterData';
import { isValidArray } from '../../utils';
import { mockData } from './mock';

jest.mock('../../utils', () => ({
  isValidArray: jest.fn(),
}));

describe('useFilterData', () => {
  const mockToShow = { id: true, name: true };

  it('should return a filtered and sliced array based on the provided data', () => {
    isValidArray.mockReturnValue(true);
    const { result } = renderHook(() => useFilterData(mockData, mockToShow, 0, 2));
    expect(result.current).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  });

  it('should return an empty array when data is not valid', () => {
    isValidArray.mockReturnValue(false);
    const { result } = renderHook(() => useFilterData(mockData, mockToShow, 0, 2));

    expect(result.current).toEqual([]);
  });

  it('should respect the "from" and "recordsPerPage" parameters', () => {
    isValidArray.mockReturnValue(true);
    const { result } = renderHook(() => useFilterData(mockData, mockToShow, 1, 1));
    expect(result.current).toEqual([{ id: 2, name: 'Jane' }]);
  });

  it('should handle an empty data array correctly', () => {
    isValidArray.mockReturnValue(true);
    const { result } = renderHook(() => useFilterData([], mockToShow, 0, 2));

    expect(result.current).toEqual([]);
  });

  it('should return correct keys based on "toShow" object', () => {
    isValidArray.mockReturnValue(true);

    const toShowWithAdditionalFields = { id: true, name: true, age: true };
    const { result } = renderHook(() => useFilterData(mockData, toShowWithAdditionalFields, 0, 2));
    expect(result.current).toEqual([
      { id: 1, name: 'John', age: 25 },
      { id: 2, name: 'Jane', age: 28 },
    ]);
  });

  it('should stop adding items when "recordsPerPage" is 0', () => {
    isValidArray.mockReturnValue(true);
    const { result } = renderHook(() => useFilterData(mockData, mockToShow, 0, 0));
    expect(result.current).toEqual([]);
  });
});
