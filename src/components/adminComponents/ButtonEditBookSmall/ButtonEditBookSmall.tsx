import { Button } from 'antd';
import { useUserLoginStore } from '../../../hooks/useUserLoginStore.ts';
import { checkRule } from '../../../extras/checkRule.ts';
import { EditOutlined } from '@ant-design/icons';
import useMessage from 'antd/es/message/useMessage';
import { useQueryClient } from '@tanstack/react-query';
import { ModalAddEditBook } from '../ModalAddEditBook/ModalAddEditBook.tsx';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { BookInterface } from '../../../types/book.interface.ts';
import { useCreateMutation } from '../../../hooks/useCreateMutation.ts';
import { useGetQuery } from '../../../hooks/useGetQuery.ts';
import { ErrorInterface } from '../../../types/error.interface.ts';

interface Props {
  slug: string;
}

export const ButtonEditBookSmall = ({ slug }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);

  const { user } = useUserLoginStore();
  const [messageApi, messageHolder] = useMessage();
  const queryClient = useQueryClient();

  const { mutate } = useCreateMutation<
    BookInterface,
    BookInterface,
    BookInterface
  >('books', 'PATCH');
  const [editBookForm] = useForm<BookInterface>();

  const { data } = useGetQuery<BookInterface>(`books/${slug}`);

  useEffect(() => {
    if (data) {
      editBookForm.setFieldsValue(data);
    }
  }, [data]);

  const resetForm = () => {
    setModalOpened(false);
    editBookForm.resetFields();
  };

  const submit = async (values: BookInterface) => {
    if (!data) {
      messageApi.error('Wystąpił błąd podczas pobierania danych');
      return;
    }

    mutate(
      {
        ...values,
        id: data && data.id,
        year: Number(values.year),
        count: Number(values.count),
      },
      {
        onSuccess: (editedBook) => {
          // dodawanie 1 pozycji do danych
          queryClient.setQueryData<BookInterface[]>([`books`], (oldData) => [
            ...(oldData || []).map((book) =>
              book.id === editedBook.id ? editedBook : book
            ),
          ]);

          messageApi.success(`Książka ${editedBook.title} została edytowana`);

          resetForm();
        },
        onError: (err: unknown) => {
          if ((err as ErrorInterface)?.message) {
            messageApi.error(`Błąd edycji: ${(err as ErrorInterface).message}`);
          } else {
            messageApi.error('Nieznany błąd edycji książki');
            console.log(err);
          }
        },
      }
    );
  };

  if (!user) return null;

  if (checkRule('a9', user?.rule)) {
    return (
      <>
        <Button
          type={'text'}
          shape={'circle'}
          onClick={() => setModalOpened(true)}
        >
          {<EditOutlined />}
        </Button>

        <ModalAddEditBook
          addBookForm={editBookForm}
          modalOpened={modalOpened}
          submit={submit}
          resetForm={resetForm}
        />
        {messageHolder}
      </>
    );
  }
};
