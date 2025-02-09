import React from 'react';
import './style.css';
import useSort from '../../hooks/useSort';
import { SORT_DIRECTION } from '../../constants';

const Table = ({ data, from, toShow, totalEntries }) => {
  const defaultSortedKey = Object.keys(toShow)[0];
  const defaultDirection = SORT_DIRECTION.ASCENDING;
  const { sortedData, requestSort, sortConfig } = useSort(data, defaultSortedKey, defaultDirection);

  return (
    <table className="project-table">
      <thead>
        <tr>
          {Object.keys(toShow).map((key) => (
            <th key={key} onClick={() => requestSort(key)}>
              {toShow[key]}
              {sortConfig.key === key? (sortConfig.direction === SORT_DIRECTION.ASCENDING ? ' ▲' : ' ▼') : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={Object.keys(toShow).length}>
          Showing { from + 1 } - { from + data.length } of { totalEntries } entries

          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;