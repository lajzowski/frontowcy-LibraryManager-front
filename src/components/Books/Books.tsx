import { Content } from '../../layout/Content/Content.tsx';
import { Input, Table, TableColumnsType } from 'antd';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { BookInterface } from '../../types/book.interface.ts';
import { Link } from 'react-router';
import { myStringSorter } from '../../extras/sorters.ts';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import './Books.scss';
export const Books = () => {
  const { data, isLoading } = useGetQuery<BookInterface[]>('books');
  const [filteredData, setFilteredData] = useState<
    BookInterface[] | undefined
  >();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    setFilteredData(
      data?.filter((book) => book.title.toLowerCase().includes(lowerCaseValue))
    );
  };

  const columns: TableColumnsType<BookInterface> = [
    {
      title: 'Tytuł Książki',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Link to={`/books/${record.slug}`}>{record.title}</Link>
      ),
      sorter: (a, b) => myStringSorter(a.title, b.title),
    },

    {
      title: 'Autor',
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => myStringSorter(a.title, b.title),
    },

    {
      title: 'Dostępna ilość',
      dataIndex: 'count',
      key: 'count',
      width: 150,
    },
  ];

  return (
    <Content
      title={'Książki'}
      subtitle={'Lista wszystkich pozycji w bibliotece'}
    >
      <div className={'search-container'}>
        <Input
          className={'book-search'}
          placeholder={'Szukaj po tytule'}
          addonAfter={<SearchOutlined />}
          size={'large'}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <Table
        loading={isLoading}
        dataSource={filteredData}
        rowKey={'id'}
        columns={columns}
        size={'small'}
      />
    </Content>
  );
};
