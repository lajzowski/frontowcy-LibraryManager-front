import { Content } from '../../../layout/Content/Content.tsx';
import { Table, TableColumnsType } from 'antd';
import { useGetQuery } from '../../../hooks/useGetQuery.ts';
import { myNumberSorter, myStringSorter } from '../../../extras/sorters.ts';
import { myDateFormat } from '../../../extras/myDateFormat.ts';
import { LogInterface } from '../../../types/log.interface.ts';
import { LogAction } from '../../../types/log-action.enum.ts';

export const AdminLogs = () => {
  const { data, error, isLoading } = useGetQuery<LogInterface[]>('admin/logs');

  if (error?.message === '401') {
    return <div>401</div>;
  }

  const columns: TableColumnsType<LogInterface> = [
    {
      title: 'Akcja',
      key: 'action',
      render: (_, record) =>
        LogAction[record.action as unknown as keyof typeof LogAction],

      sorter: (a, b) =>
        myStringSorter(
          String(
            LogAction[a.action as unknown as keyof typeof LogAction] || ''
          ),
          String(LogAction[b.action as unknown as keyof typeof LogAction] || '')
        ),
    },

    {
      title: 'Data operacji',
      key: 'date',
      width: 150,
      render: (_, record) => myDateFormat(record.date),

      sorter: (a, b) =>
        myStringSorter(myDateFormat(a.date), myDateFormat(b.date)),
    },

    {
      title: 'Numer karty',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      sorter: (a, b) => myNumberSorter(a.cardNumber, b.cardNumber),
    },

    {
      title: 'Imię i Nazwisko',
      key: 'name',
      width: 150,

      render: (_, record) =>
        record.user
          ? `${record.user?.firstname} ${record.user?.lastname}`
          : 'Użytkownik usunięty',

      sorter: (a, b) =>
        myStringSorter(
          `${a.user?.firstname || ''} ${a.user?.lastname || ''}`,
          `${b.user?.firstname || ''} ${b.user?.lastname || ''}`
        ),
    },

    {
      title: 'Książka',
      key: 'bookTitle',
      width: 150,
      dataIndex: ['book', 'title'],

      sorter: (a, b) =>
        myStringSorter(a.book?.title || '', b.book?.title || ''),
    },
  ];

  return (
    <Content
      title={'Logi Systemowe'}
      subtitle={'Lista operacji wykonanych w systemie'}
    >
      <Table
        loading={isLoading}
        dataSource={data}
        rowKey={'id'}
        columns={columns}
        size={'small'}
      />
    </Content>
  );
};
