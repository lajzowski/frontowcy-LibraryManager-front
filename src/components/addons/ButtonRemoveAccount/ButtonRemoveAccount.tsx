import { useUserLoginStore } from '../../../hooks/useUserLoginStore.ts';
import { Button } from 'antd';
import useModal from 'antd/es/modal/useModal';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useGetQuery } from '../../../hooks/useGetQuery.ts';
import { RentInterface } from '../../../types/rent.interface.ts';
import { useCreateMutation } from '../../../hooks/useCreateMutation.ts';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

export const ButtonRemoveAccount = () => {
  const navigate = useNavigate();

  const { mutate } = useCreateMutation<null, { id: string }, { id: string }>(
    `user`,
    'DELETE'
  );
  const queryClient = useQueryClient();

  const { user, clear } = useUserLoginStore();
  const [modalApi, holder] = useModal();

  const { data, error, isLoading } = useGetQuery<RentInterface[]>('rents');

  if (isLoading) return <div>Loading...</div>;

  if (error?.message === '401') {
    return <>401</>;
  }

  if (!user) {
    return <>401</>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const onConfirm = () => {
    //1. sprawdzanie, czy nie ma wypożyczonych książek. Jeżeli ma wyświetla się modal z błędem
    const isCurrentRent = data?.some((rent) => rent.returnDate === null);

    if (isCurrentRent) {
      return modalApi.error({
        title: 'Rezygnacja Niemożliwa',
        content: (
          <div>
            <p>
              Aby zrezygnować z członkostwa musisz najpierw zwrócić wszystkie
              książki.
            </p>
          </div>
        ),
      });
    }

    // wysyłanie informacji do api, aby usunąć account. Gdy success wylogowuje.

    mutate(
      {
        id: user.id,
      },
      {
        onSuccess: () => {
          clear();
          queryClient.clear();
          navigate('/account-removed');
        },

        onError: (error) => {
          console.log('BŁAD !!!', error);
        },
      }
    );
  };

  const showModal = () => {
    modalApi.confirm({
      title: 'Usuwanie konta',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div className={'modal-content'}>
          <p>Czy na pewno chcesz zrezygnować z członkostwa?</p>
          <p>Konto zostanie trwale usunięte.</p>
        </div>
      ),
      okType: 'danger',
      onOk: onConfirm,
      okText: 'Tak, chce usunąć konto',
      cancelText: 'Nie chce',
    });
  };

  return (
    <>
      <Button danger onClick={showModal}>
        Rezygnacja z członkostwa
      </Button>
      {holder}
    </>
  );
};
