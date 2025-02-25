import { useQueryClient } from '@tanstack/react-query';
import { useUserLoginStore } from '../../../hooks/useUserLoginStore.ts';
import { checkRule } from '../../../extras/checkRule.ts';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { BookInterface } from '../../../types/book.interface.ts';
import { useCreateMutation } from '../../../hooks/useCreateMutation.ts';
import useMessage from 'antd/es/message/useMessage';
import { ErrorInterface } from '../../../types/error.interface.ts';
import { ModalAddEditBook } from '../ModalAddEditBook/ModalAddEditBook.tsx';

export const ButtonAddBook = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [addBookForm] = useForm<BookInterface>();
  const { mutate } = useCreateMutation<BookInterface, BookInterface, never>(
    'books'
  );
  const [messageApi, messageHolder] = useMessage();

  const queryClient = useQueryClient();

  const { user } = useUserLoginStore();

  const resetForm = () => {
    setModalOpened(false);
    addBookForm.resetFields();
  };

  const submit = async (values: BookInterface) => {
    mutate(
      {
        ...values,
        year: Number(values.year),
        count: Number(values.count),
      },
      {
        onSuccess: (newBook) => {
          // dodawanie 1 pozycji do danych
          queryClient.setQueryData<BookInterface[]>([`books`], (oldData) => [
            ...(oldData || []),
            newBook,
          ]);

          messageApi.success(`Książka ${newBook.title} została dodana`);

          resetForm();
        },
        onError: (err: unknown) => {
          console.log({ err });
          if ((err as ErrorInterface)?.message) {
            messageApi.error(
              `Błąd dodawania: ${(err as ErrorInterface).message}`
            );
          } else {
            messageApi.error('Nieznany błąd dodawania');
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
        <Button icon={<PlusOutlined />} onClick={() => setModalOpened(true)}>
          Dodaj książkę
        </Button>
        <ModalAddEditBook
          addBookForm={addBookForm}
          modalOpened={modalOpened}
          submit={submit}
          resetForm={resetForm}
        />
        {messageHolder}
      </>
    );
  }
};
