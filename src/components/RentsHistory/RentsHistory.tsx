import { Content } from '../../layout/Content/Content.tsx';
import { Checkbox, Table, TableColumnsType } from 'antd';
import { Link } from 'react-router';
import { myStringSorter } from '../../extras/sorters.ts';
import { RentInterface } from '../../types/rent.interface.ts';
import { myDateFormat } from '../../extras/myDateFormat.ts';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { ButtonReturnBook } from '../addons/ButtonReturnBook/ButtonRetrunBook.tsx';
import useMessage from 'antd/es/message/useMessage';
import { useMemo, useState } from 'react';

export const RentsHistory = () => {
  const { data, error, isLoading } = useGetQuery<RentInterface[]>('rents');
  const [messageApi, holderMessage] = useMessage();

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const filteredData = useMemo(() => {
    if (data) {
      return data.filter((rent) => rent.returnDate === null);
    }
    return [];
  }, [data]);

  if (error?.message === '401') {
    return <div>401</div>;
  }

  const columns: TableColumnsType<RentInterface> = [
    {
      title: 'Tytuł Książki',
      key: 'bookTitle',
      render: (_, record) => (
        <Link to={`/books/${record.book.slug}`}>{record.book.title}</Link>
      ),
      sorter: (a, b) => myStringSorter(a.book.title, b.book.title),
    },

    {
      title: 'Autor',
      dataIndex: ['book', 'author'],
      key: 'bookAuthor',
      sorter: (a, b) => myStringSorter(a.book.title, b.book.title),
    },

    {
      title: 'Data wypożyczenia',
      key: 'rentDate',
      width: 150,
      render: (_, record) => myDateFormat(record.rentDate),
    },
    {
      title: 'Data zwrotu',
      key: 'returnDate',
      width: 150,

      render: (_, record) =>
        record.returnDate ? (
          myDateFormat(record.returnDate)
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonReturnBook
              rent={record}
              messageSuccess={messageApi.success}
            />
          </div>
        ),
    },
  ];

  return (
    <Content title={'Moje wypożyczenia'} subtitle={'Lista wynajętych książek'}>
      <Table
        title={() => (
          <Checkbox onClick={() => setShowFilter((x) => !x)}>
            Ukryj zwrócone
          </Checkbox>
        )}
        loading={isLoading}
        dataSource={showFilter ? filteredData : data}
        rowKey={'id'}
        columns={columns}
        size={'small'}
      />
      {holderMessage}
    </Content>
  );
};
