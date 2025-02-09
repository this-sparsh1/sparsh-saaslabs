import { useMemo, useState } from 'react';
import { SORT_DIRECTION } from '../constants';

const ASCENDING = SORT_DIRECTION.ASCENDING;
const DESCENDING = SORT_DIRECTION.DESCENDING;

const useSort = (data, defaultSortedKey, defaultDirection = SORT_DIRECTION.ASCENDING) => {
    const [sortConfig, setSortConfig] = useState({ key: defaultSortedKey, direction: defaultDirection });

    const sortedData = useMemo(() => {
      if (sortConfig.key) {
        return [...data].sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === ASCENDING ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === ASCENDING ? 1 : -1;
          }
          return 0;
        });
      }
      return data;
    }, [data, sortConfig]);
  
    const requestSort = (key) => {
      let direction = ASCENDING;
      if (sortConfig.key === key && sortConfig.direction === ASCENDING) {
        direction = DESCENDING;
      }
      setSortConfig({ key, direction });
    };
    return { sortedData, requestSort, sortConfig };
}

export default useSort;