import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '@/redux/slices/sortSlice';
import { useGetTechnologiesQuery } from '@/redux/api/technologies.api';
import { RootState } from '@/redux/store';
import { Column, RowId, Spinner, Table } from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router-dom';

interface TableViewProps {
  items: Column[];
}

const TableView = ({ items }: TableViewProps): React.ReactNode => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortParam = useSelector((state: RootState) => state.sort);
  const filterParam = useSelector((state: RootState) => state.filter);

  const { isLoading, data } = useGetTechnologiesQuery({
    sort: sortParam,
    filters: filterParam,
  });

  const handleSort = (sortOption: {
    name: string;
    sort: 'asc' | 'desc' | 'initial';
  }) => {
    items.map((elem) => {
      elem.sort = elem.sort === 'asc' && elem.name === sortOption.name ? 'desc' : 'asc';
    });
    dispatch(setSort({ param: sortOption.name, order: sortOption.sort || 'asc' }));
  };

  const handleRowClick = (id: RowId) => {
    navigate(`/admin/details/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner dimension="l" />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
      <Table
        onRowClick={(e) => handleRowClick(e)}
        className="w-full"
        greyHeader={true}
        onSortChange={(e) => handleSort(e)}
        columnList={items}
        rowList={data || []}
      />
    </div>
  );
};

export default TableView;
