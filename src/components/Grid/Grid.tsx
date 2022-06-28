import { useState, useMemo, useEffect } from 'react';
import { cellTypeEnum, sortOrderEnum } from '../../enums';
import { GridRowProps } from '../../types';
import Pagination from '../Pagination/Pagination';
import './Grid.css';

const PageSize = 20;

type GridProps = {
  data: GridRowProps[][];
  onMouseDown: (prop: GridRowProps[]) => void;
  onMouseUp: () => void;
}

export default function Grid({
  data,
  onMouseDown,
  onMouseUp
}: GridProps) {
  const [sort, setSort] = useState({col: '', order: sortOrderEnum.DEFAULT});
  const [sortedData, setSortedData] = useState<GridRowProps[][]>(data);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [sortedData, currentPage]);

  const getCellValue = (cell: GridRowProps[], col: string) => cell.find((prop: GridRowProps) => prop.label === col)?.source || '';

  useEffect(() => {
    const sorted = [...sortedData];
    if (sort.order === sortOrderEnum.DEFAULT) return;
    sort.col && sorted.sort((a: GridRowProps[], b: GridRowProps[]) => (
      getCellValue(a, sort.col) === getCellValue(b, sort.col)
        ? 0
        : getCellValue(a, sort.col) > getCellValue(b, sort.col)
          ? sort.order === sortOrderEnum.ASC
            ? 1
            : -1
          : -1
    ))
    setSortedData([...sorted])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort.col, sort.order])

  const sortAsc = () => <span>&#x2B07;</span>;
  const sortDesc = () => <span>&#x2B06;</span>;

  const mapSortingIcon = {
    default: <span />,
    asc: sortAsc(),
    desc: sortDesc(),
  }

  const onSort = (col: string) => {
    if (sort.col !== col) {
      setSort({col: col, order: sortOrderEnum.ASC})
    } else if (sort.order === sortOrderEnum.ASC) {
      setSort({col: col, order: sortOrderEnum.DESC})
    } else {
      setSort({col: col, order: sortOrderEnum.ASC})
    }
  }

  const header = data[0].map((prop: GridRowProps) => prop.label);

  const renderCell: { [key: string]: any } = {
    [cellTypeEnum.TEXT]: (cell: GridRowProps, key: number, cellStyles: string) => (
      <td key={key} data-label={cell.label} className={cellStyles}>
        {cell.source}
      </td>
    ),
    [cellTypeEnum.IMAGE]: (cell: GridRowProps, key: number, rows: GridRowProps[]) => (
      <td key={key} data-label={cell.label} className='flag'>
        <img src={cell.source + ''} alt={`${rows.find(row => row.label === 'Name')?.source} flag`} />
      </td>
    ),
    [cellTypeEnum.NUMBER]: (cell: GridRowProps, key: number, cellStyles: string) => (
      <td key={key} data-label={cell.label} className={cellStyles}>
        {String(cell.source).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
      </td>
    ),
    [cellTypeEnum.ARRAY]: (cell: GridRowProps, key: number, cellStyles: string) => (
      <td key={key} data-label={cell.label} className={cellStyles}>
        {Array.isArray(cell.source) && cell.source.join(', ')}
      </td>
    )
  };

  const renderRows = (rows: GridRowProps[], index: number) => {
    return (
      <tr
        key={index}
        onMouseDown={() => onMouseDown(rows)}
        onMouseUp={onMouseUp}>
        {rows.map((cell: GridRowProps, key: number) => {
          const cellStyles = cell.style ? cell.style : '';
          return renderCell[cell.type](cell, key, rows, cellStyles)
        })}
      </tr>
    )
  }

  const renderheader = (title: string, index: number) => {
    return (
      <th key={index} scope='col'>
        <div className='table_title' onClick={() => onSort(title)}>
          <span>{title}</span>
          {sort.col === title && mapSortingIcon[sort.order]}
        </div>
      </th>
    )
  }

  return (
    <div className='grid_wrapper'>
      <table>
        <thead>
          <tr>
            {header.map((title: string, index: number) => renderheader(title, index))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((rows, index) => renderRows(rows, index))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  )
};