import useMessage from 'antd/es/message/useMessage';
import { useQueryClient } from '@tanstack/react-query';
import { BookInterface } from '../../../types/book.interface.ts';
import { checkRule } from '../../../extras/checkRule.ts';
import { useUserLoginStore } from '../../../hooks/useUserLoginStore.ts';
import { Button } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useCreateMutation } from '../../../hooks/useCreateMutation.ts';
import { useGetQuery } from '../../../hooks/useGetQuery.ts';
import useModal from 'antd/es/modal/useModal';
import { ErrorInterface } from '../../../types/error.interface.ts';

interface Props {
  slug: string;
}

export const ButtonDeleteBookSmall = ({ slug }: Props) => {
  const { user } = useUserLoginStore();

  const [messageApi, messageHolder] = useMessage();
  const queryClient = useQueryClient();
  const { data } = useGetQuery<BookInterface>(`books/${slug}`);
  const [modal, contextHolder] = useModal();

  const { mutate } = useCreateMutation<
    BookInterface,
    BookInterface,
    BookInterface
  >('books', 'DELETE');

  if (!data) {
    return null;
  }

  if (!user) return null;

  const onConfirm = () => {
    mutate(data, {
      onSuccess: () => {
        queryClient.setQueryData<BookInterface[]>([`books`], (oldData) =>
          oldData?.filter((book) => book.id !== data?.id)
        );

        // komunikat o usunięciu
        messageApi.success('Książka została usunięta');
      },

      onError: (err: unknown) => {
        if ((err as ErrorInterface)?.message) {
          messageApi.error(`Błąd usuwania: ${(err as ErrorInterface).message}`);
        } else {
          messageApi.error('Nieznany błąd usuwania książki');
          console.log(err);
        }
      },
    });
  };

  const confirm = () => {
    modal.confirm({
      title: 'Potwierdź usunięcie',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div className={'modal-content'}>
          <p>Czy na pewno chcesz usunąć "{data.title}"</p>
        </div>
      ),
      onOk: onConfirm,
      okText: 'Potwierdzam',
      cancelText: 'Rezygnuję',
    });
  };

  if (checkRule('a9', user?.rule)) {
    return (
      <>
        <Button type={'text'} shape={'circle'} onClick={confirm}>
          <DeleteOutlined />
        </Button>
        {contextHolder}
        {messageHolder}
      </>
    );
  }
};
