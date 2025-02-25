import { Button } from 'antd';
import { ExclamationCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { RentInterface } from '../../../types/rent.interface.ts';
import useModal from 'antd/es/modal/useModal';
import { useCreateMutation } from '../../../hooks/useCreateMutation.ts';
import { BookInterface } from '../../../types/book.interface.ts';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  rent: RentInterface;
  messageSuccess(message: string): void;
}

export const ButtonReturnBook = ({ rent, messageSuccess }: Props) => {
  const [modal, contextHolder] = useModal();
  const { mutate } = useCreateMutation<RentInterface, {}, { id: string }>(
    `rents/return`,
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
          <p>
            Czy na pewno chcesz zwrócić książkę pod tytułem "{rent.book.title}"?
          </p>
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
        Zwróć
      </Button>
      {contextHolder}
    </>
  );
};
