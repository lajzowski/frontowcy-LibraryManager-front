import { Content } from '../../layout/Content/Content.tsx';
import { useParams } from 'react-router';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { BookInterface } from '../../types/book.interface.ts';
import { Badge, Descriptions, DescriptionsProps } from 'antd';

import { useUserLoginStore } from '../../hooks/useUserLoginStore.ts';
import './BookOne.scss';
import { ButtonRent } from '../ButtonRent/ButtonRent.tsx';

export const BookOne = () => {
  const params = useParams<{ slug: string }>();

  const { user } = useUserLoginStore();

  const { data } = useGetQuery<BookInterface>(`books/${params.slug}`);

  if (!data) {
    return <div>Loading...</div>;
  }

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
            <ButtonRent book={data} size={'large'} />
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
    </Content>
  );
};
