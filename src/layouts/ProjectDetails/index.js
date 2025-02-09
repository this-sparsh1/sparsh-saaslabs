import React, { useRef, useState } from 'react';
import './style.css';
import useFetchData from '../../hooks/useFetchData';
import { API_URL } from '../../constants';
import Table from '../../components/Table';
import useFilterData from '../../hooks/useFilterData';
import { isValidArray } from '../../utils';

const recordsPerPage = 5;

const ProjectDetails = () => {
  const toShow = {
    "s.no": "S.No",
    "amt.pledged": "Amount Pledged",
    "percentage.funded": "Percentage Funded",
  }
  const [pageNo, setPageNo] = useState(1);
  let from = recordsPerPage * (pageNo-1);
  const { data, isLoading } = useFetchData(API_URL);

  const totalPages = data && Math.ceil(data.length / recordsPerPage);
  const filteredData = useFilterData(data, toShow, from, recordsPerPage);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(filteredData)

  if (!filteredData || !isValidArray(filteredData)) {
    return <h1>No data found</h1>;
  }

  const nextPage = () => {
    setPageNo(pageNo + 1);
  }

  const prevPage = () => {
    setPageNo(pageNo - 1);
  }
  return (
    <div className='table-container'>
      <h1>Project Details</h1>
      {filteredData && <Table data={filteredData} from={from} toShow={toShow} totalEntries={data.length} />}
      <div className='button-container'>
        <button className='nav-btn' onClick={prevPage} disabled={pageNo === 1}>Prev</button>
        Page { pageNo } of { totalPages }
        <button className='nav-btn' onClick={nextPage} disabled={pageNo === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ProjectDetails;