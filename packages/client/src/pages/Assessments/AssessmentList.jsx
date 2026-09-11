import React, { useEffect, useMemo, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [assessments, setAssessments] = useState([]);
  const [riskFilter, setRiskFilter] = useState('all');

  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };

    fetchAssessments();
  }, []);

  const handleDelete = async (id) => {
    await AssessmentService.delete(id);

    setAssessments(
      assessments.filter((assessment) => assessment.id !== id)
    );
  };

  const filteredAssessments = useMemo(() => {
    if (riskFilter === 'all') {
      return assessments;
    }

    return assessments.filter(
      (assessment) => assessment.riskLevel === riskFilter
    );
  }, [assessments, riskFilter]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Cat Name',
        accessor: 'catName',
      },
      {
        Header: 'Date of Birth',
        accessor: 'catDateOfBirth',
      },
      {
        Header: 'Instrument Type',
        accessor: 'instrumentType',
      },
      {
        Header: 'Score',
        accessor: 'score',
      },
      {
        Header: 'Risk Level',
        accessor: 'riskLevel',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
      {
        Header: 'Actions',
        disableSortBy: true,
        Cell: ({ row }) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </button>
        ),
      },
    ],
    [assessments]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: filteredAssessments,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <div>
      <h2>Assessment List</h2>

      <div className="mb-3">
        <label htmlFor="riskFilter" className="form-label">
          Filter by Risk Level
        </label>

        <select
          id="riskFilter"
          className="form-select"
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search assessments..."
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <table {...getTableProps()} className="table table-striped">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps()
                  )}
                >
                  {column.render('Header')}

                  {column.canSort && (
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ↓'
                          : ' ↑'
                        : ''}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};