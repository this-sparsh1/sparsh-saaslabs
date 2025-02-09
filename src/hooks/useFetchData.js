import { useCallback, useEffect, useState } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const tableData = await response.json();
      setData(tableData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log('Data fetched');
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading };
}

export default useFetchData;