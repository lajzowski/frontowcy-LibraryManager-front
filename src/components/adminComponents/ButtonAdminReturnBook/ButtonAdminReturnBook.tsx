import { RentInterface } from '../../../types/rent.interface.ts';
import useModal from 'antd/es/modal/useModal';
import { useCreateMutation } from '../../../hooks/useCreateMutation.ts';
import { useQueryClient } from '@tanstack/react-query';
import { ExclamationCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { BookInterface } from '../../../types/book.interface.ts';
import { Button } from 'antd';

interface Props {
  rent: RentInterface;
  messageSuccess(message: string): void;
}

export const ButtonAdminReturnBook = ({ rent, messageSuccess }: Props) => {
  const [modal, contextHolder] = useModal();
  const { mutate } = useCreateMutation<RentInterface, {}, { id: string }>(
    `admin/rents/return`,
    'PATCH'
  );

  const showMessage = () => {
    messageSuccess(`Książka ${rent.book.title} została zwrócona`);
  };

  const queryClient = useQueryClient();

  const modalConfirm = () => {
    modal.confirm({
      title: 'Potwierdź zwrot',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div className={'modal-content'}>
          <p>Czy na pewno chcesz wymusić zwrot książki "{rent.book.title}"?</p>
        </div>
      ),
      onOk: onConfirm,
      okText: 'Potwierdź zwrot',
      cancelText: 'Rezygnuję',
    });
  };

  const onConfirm = () => {
    mutate(
      { id: rent.id },
      {
        onSuccess: async (rent) => {
          queryClient.setQueryData<RentInterface[]>(['rents'], (oldData) =>
            [...(oldData || [])].map((rentOld) =>
              rentOld.id === rent.id ? rent : rentOld
            )
          );

          queryClient.setQueryData<RentInterface[]>(
            ['admin', 'rents'],
            (oldData) =>
              [...(oldData || [])].map((rentOld) =>
                rentOld.id === rent.id ? rent : rentOld
              )
          );

          queryClient.setQueryData<BookInterface>(
            ['books', rent.book.slug],
            () => rent.book
          );

          queryClient.setQueryData<BookInterface[]>(['books'], (oldData) =>
            [...(oldData || [])].map((book) =>
              book.id === rent.book.id ? rent.book : book
            )
          );

          // wiadomość
          showMessage();
        },
      }
    );
  };

  return (
    <>
      <Button size={'small'} onClick={modalConfirm} icon={<RollbackOutlined />}>
        Wymuś Zwrot
      </Button>
      {contextHolder}
    </>
  );
};
