import { Content } from '../../layout/Content/Content.tsx';
import { useParams } from 'react-router';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { BookInterface } from '../../types/book.interface.ts';
import { Badge, Button, Descriptions, DescriptionsProps, message } from 'antd';

import { useUserLoginStore } from '../../hooks/useUserLoginStore.ts';
import useModal from 'antd/es/modal/useModal';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import './BookOne.scss';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { RentBookInterface } from '../../types/rent-book.interface.ts';
import { useQueryClient } from '@tanstack/react-query';

export const BookOne = () => {
  const params = useParams<{ slug: string }>();
  const [modal, contextHolder] = useModal();
  const [messageApi, contextHolder2] = message.useMessage();

  const { user } = useUserLoginStore();

  const { data } = useGetQuery<BookInterface>(`books/${params.slug}`);

  const { mutate } = useCreateMutation<BookInterface, RentBookInterface, never>(
    `books/${params.slug}/rent`
  );

  const queryClient = useQueryClient();

  if (!data) {
    return <div>Loading...</div>;
  }

  const onConfirm = () => {
    mutate(
      {
        bookId: data.id,
      },
      {
        onSuccess: (bookBe) => {
          // aktualizujemy dane, że już jest jedna mniej.

          queryClient.setQueryData<BookInterface[]>(['books'], (oldData) =>
            [...(oldData || [])].map((book) =>
              book.id === bookBe.id ? bookBe : book
            )
          );

          queryClient.setQueryData<BookInterface>(
            ['books', params.slug],
            () => bookBe
          );

          messageApi.success(`Książka ${data.title} została wypożyczona`);
        },
      }
    );
  };

  const confirm = () => {
    modal.confirm({
      title: 'Potwierdź wypożyczenie',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div className={'modal-content'}>
          <p>
            Czy potwierdzasz wypożyczenie książki na 14 dni do dnia{' '}
            {moment().add(14, 'days').format('YYYY-MM-DD')}?
          </p>
          <p>
            Późniejszy zwrot może wiązać się z naliczeniem dodatkowej opłaty
            zgodnie z obowiązującym regulaminem biblioteki.
          </p>
        </div>
      ),
      onOk: onConfirm,
      okText: 'Potwierdzam',
      cancelText: 'Rezygnuję',
    });
  };

  const items: DescriptionsProps['items'] = [
    {
      key: '4',
      label: 'Dostępność',
      children: (
        <div>
          <p>
            <Badge
              status={
                data.count > 1
                  ? 'success'
                  : data.count === 1
                    ? 'warning'
                    : 'error'
              }
              text={<p style={{ display: 'inline' }}>Dostępne {data.count}</p>}
            />
          </p>
        </div>
      ),
    },
    {
      key: '1',
      label: 'Tytuł',
      children: <p>{data.title}</p>,
    },
    {
      key: '2',
      label: 'Autor',
      children: <p>{data.author}</p>,
    },
    {
      key: '3',
      label: 'Rok wydania',
      children: <p>{data.year}</p>,
    },
  ];

  return (
    <Content title={data.title} subtitle={data.author}>
      <div className={'book-container'}>
        <div className={'book-description'}>{data.description}</div>
        <div className={'description'}>
          <div className={'button-rent-container'}>
            <Button
              className={'button-rent'}
              disabled={!user || data.count === 0}
              onClick={confirm}
            >
              {data.count === 0 ? 'Brak na stanie' : 'Wypożycz książkę!'}
            </Button>
            <div
              style={{ display: data.count > 0 && !user ? undefined : 'none' }}
              className={'text-button-rent-description'}
            >
              <small>Zaloguj się, aby wypożyczyć tę książkę.</small>
            </div>
          </div>
          <Descriptions
            styles={{
              content: {
                width: '350px',
                height: '100px',
                alignContent: 'center',
                letterSpacing: '2px',
              },
              header: {
                width: '500px',
                alignContent: 'center',
              },
              root: {
                marginTop: '15px',
              },
            }}
            column={1}
            title=''
            items={items}
            bordered={true}
            size={'small'}
          />
        </div>
      </div>
      {contextHolder}
      {contextHolder2}
    </Content>
  );
};
