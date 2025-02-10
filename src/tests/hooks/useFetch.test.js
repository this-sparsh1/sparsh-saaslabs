import { renderHook } from '@testing-library/react-hooks';
import useFetchData from '../../hooks/useFetchData';
import { API_URL } from '../../constants';

const mockData = { items: ['item1', 'item2'] };

describe('useFetchData', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch and return data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => 
      useFetchData(API_URL)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  it('should handle fetch errors', async () => {
    const error = new Error('Fetch failed');
    global.fetch = jest.fn(() => Promise.reject(error));
    console.error = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() => 
      useFetchData(API_URL)
    );

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it('should refetch when URL changes', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      (url) => useFetchData(url),
      { initialProps: `${API_URL}?test=1` }
    );

    await waitForNextUpdate();
    
    rerender(`${API_URL}?test=2`);
    
    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith(`${API_URL}?test=2`);
  });
});