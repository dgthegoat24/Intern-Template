import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [assessments, setAssessments] = useState([]);

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
  } = useTable({
    columns,
    data: assessments,
  });

  return (
    <div>
      <h2>Assessment List</h2>

      <table {...getTableProps()} className="table table-striped">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
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