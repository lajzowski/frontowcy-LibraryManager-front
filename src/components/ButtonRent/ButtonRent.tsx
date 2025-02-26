import { BookInterface } from '../../types/book.interface.ts';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { RentBookInterface } from '../../types/rent-book.interface.ts';
import { useQueryClient } from '@tanstack/react-query';
import useModal from 'antd/es/modal/useModal';
import { Button, message } from 'antd';
import { useUserLoginStore } from '../../hooks/useUserLoginStore.ts';

interface Params {
  book: BookInterface;
  size: 'small' | 'large';
}

export const ButtonRent = ({ book, size }: Params) => {
  const { mutate } = useCreateMutation<BookInterface, RentBookInterface, never>(
    `books/${book.slug}/rent`
  );

  const { user } = useUserLoginStore();

  const [modal, contextHolder] = useModal();
  const [messageApi, contextHolder2] = message.useMessage();

  const queryClient = useQueryClient();

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

  const onConfirm = () => {
    mutate(
      {
        bookId: book.id,
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
            ['books', book.slug],
            () => bookBe
          );

          messageApi.success(`Książka ${book.title} została wypożyczona`);
        },
      }
    );
  };

  if (user?.rule === 'a9') {
    return null;
  }

  return (
    <>
      <Button
        className={'button-rent'}
        disabled={!user || book.count === 0}
        onClick={confirm}
        size={size}
      >
        {book.count === 0 ? 'Brak na stanie' : 'Wypożycz książkę!'}
      </Button>

      {contextHolder}
      {contextHolder2}
    </>
  );
};
