import { Content } from '../../layout/Content/Content.tsx';
import { Input, Table, TableColumnsType } from 'antd';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { BookInterface } from '../../types/book.interface.ts';
import { Link } from 'react-router';
import { myStringSorter } from '../../extras/sorters.ts';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import './Books.scss';
import { ButtonAddBook } from '../adminComponents/ButtonAddBook/ButtonAddBook.tsx';
import { ButtonEditBookSmall } from '../adminComponents/ButtonEditBookSmall/ButtonEditBookSmall.tsx';
import { ButtonDeleteBookSmall } from '../adminComponents/ButtonDeleteBookSmall/ButtonDeleteBookSmall.tsx';
import { ButtonRent } from '../ButtonRent/ButtonRent.tsx';
import { useUserLoginStore } from '../../hooks/useUserLoginStore.ts';
export const Books = () => {
  const { data, isLoading } = useGetQuery<BookInterface[]>('books');
  const [filteredData, setFilteredData] = useState<
    BookInterface[] | undefined
  >();
  const { user } = useUserLoginStore();

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
        <div className='book-title'>
          <Link to={`/books/${record.slug}`}>{record.title}</Link>
          <div className='book-buttons'>
            <ButtonEditBookSmall slug={record.slug} />
            <ButtonDeleteBookSmall slug={record.slug} />
          </div>
        </div>
      ),
      sorter: (a, b) => myStringSorter(a.title, b.title),
    },
    {
      title: 'Autor',
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => myStringSorter(a.author, b.author),
    },
    {
      title: 'Dostępna ilość',
      dataIndex: 'count',
      key: 'count',
      width: 150,
    },
    ...(user?.rule === 'u0'
      ? [
          {
            title: '',
            key: 'action',
            width: 150,
            render: (_: undefined, record: BookInterface) => (
              <div>
                <ButtonRent book={record} size='small' />
              </div>
            ),
          },
        ]
      : []),
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
        title={() => <ButtonAddBook />}
        loading={isLoading}
        dataSource={filteredData}
        rowKey={'id'}
        columns={columns}
        size={'small'}
      />
    </Content>
  );
};
