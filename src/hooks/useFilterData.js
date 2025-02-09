import { useMemo } from 'react';
import { isValidArray } from '../utils';

const useFilterData = (data, toShow, from = 0, recordsPerPage) => useMemo(() => {
    if (data && isValidArray(data)) {
        // slice data to show only required records
        const slicedData = data.slice(from, from + recordsPerPage);
        const newArray = [];
        // create new array with only required fields
        for (let item of slicedData ) {
        let newItem = {};
        Object.keys(toShow).forEach((key) => {
            newItem[key] = item[key];
        });
        if (recordsPerPage > 0) {
            recordsPerPage -- 
            newArray.push(newItem);
        } else {
            break;
        }
        }
        return newArray;
    }
  }, [data, from, recordsPerPage, toShow]);

  export default useFilterData;