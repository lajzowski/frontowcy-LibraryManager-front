import { Table, TableColumnsType } from 'antd';
import { RentInterface } from '../../../types/rent.interface.ts';
import { Link } from 'react-router';
import { myNumberSorter, myStringSorter } from '../../../extras/sorters.ts';
import { myDateFormat } from '../../../extras/myDateFormat.ts';
import moment from 'moment';
import { Content } from '../../../layout/Content/Content.tsx';
import { useGetQuery } from '../../../hooks/useGetQuery.ts';
import useMessage from 'antd/es/message/useMessage';

import './AdminRents.scss';
import { ButtonAdminReturnBook } from '../ButtonAdminReturnBook/ButtonAdminReturnBook.tsx';

export const AdminRents = () => {
  const { data, error, isLoading } =
    useGetQuery<RentInterface[]>('admin/rents');
  const [messageApi, holderMessage] = useMessage();

  if (error?.message === '401') {
    return <div>401</div>;
  }

  const messageSuccess = (message: string) => {
    messageApi.success(message);
  };

  const statusPriority = (status: string | undefined): number => {
    if (status === 'Zwrócone') return 1;
    if (status === 'Przekroczony termin') return 2;
    return 3; // 'Wypożyczone'
  };

  const getStatus = (record: RentInterface): string => {
    if (record.returnDate) {
      return 'Zwrócone';
    }
    if (
      record.rentDate &&
      moment().diff(moment(record.rentDate), 'days') > 14
    ) {
      return 'Przekroczony termin';
    }
    return 'Wypożyczone';
  };

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
      title: 'Imię Klienta',
      key: 'firstname',
      render: (_, record) => (
        <span>
          {record.user ? record.user.firstname : 'Użytkownik usunięty'}
        </span>
      ),
      sorter: (a, b) =>
        myStringSorter(a.user?.firstname || '', b.user?.firstname || ''),
    },

    {
      title: 'Nazwisko Klienta',
      key: 'lastname',
      render: (_, record) => (
        <span>
          {record.user ? record.user.lastname : 'Użytkownik usunięty'}
        </span>
      ),
      sorter: (a, b) =>
        myStringSorter(a.user?.lastname || '', b.user?.lastname || ''),
    },

    {
      title: 'Numer karty',
      key: 'cardNumber',
      dataIndex: 'cardNumber',
      sorter: (a, b) => myNumberSorter(a.cardNumber, b.cardNumber),
      width: 125,
    },

    {
      title: 'Status',
      key: 'status',

      width: 200,
      render: (_, record) => {
        if (record.returnDate) {
          return <div>Zwrócone</div>;
        }
        if (
          record.rentDate &&
          moment().diff(moment(record.rentDate), 'days') > 14
        ) {
          return <div>Przekroczony Termin</div>;
        } else {
          return <div>Wypożyczone</div>;
        }
      },

      sorter: (a, b) => {
        return statusPriority(getStatus(a)) - statusPriority(getStatus(b));
      },
    },
    {
      title: 'Data zwrotu',
      key: 'returnDate',
      width: 150,

      sorter: (a, b) =>
        myDateFormat(a.returnDate || '') < myDateFormat(b.returnDate || '')
          ? -1
          : 1,
      render: (_, record) =>
        record.returnDate ? (
          myDateFormat(record.returnDate)
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonAdminReturnBook
              rent={record}
              messageSuccess={messageSuccess}
            />
          </div>
        ),
    },
  ];

  const isOverdue = (record: RentInterface): boolean => {
    return (
      record.rentDate &&
      !record.returnDate &&
      moment().diff(moment(record.rentDate), 'days') > 14
    );
  };

  const getRowClassName = (record: RentInterface): string => {
    if (record.returnDate) {
      return 'returned-row';
    }
    if (isOverdue(record)) {
      return 'overdue-row';
    }
    return 'borrowed-row';
  };

  return (
    <Content
      title={'Wypożyczenia'}
      subtitle={'Lista wynajętych książek przez klientów'}
    >
      <Table
        loading={isLoading}
        dataSource={data}
        rowKey={'id'}
        columns={columns}
        size={'small'}
        rowClassName={(record) => getRowClassName(record)}
      />
      {holderMessage}
    </Content>
  );
};
