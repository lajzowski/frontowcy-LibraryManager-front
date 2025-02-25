import { useQueryClient } from '@tanstack/react-query';
import { useUserLoginStore } from '../../../hooks/useUserLoginStore.ts';
import { checkRule } from '../../../extras/checkRule.ts';
import { Button, Flex, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalMy } from '../../addons/ModalMy/ModalMy.tsx';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { BookInterface } from '../../../types/book.interface.ts';
import { useCreateMutation } from '../../../hooks/useCreateMutation.ts';
import useMessage from 'antd/es/message/useMessage';
import { generateFriendlyURL } from '../../../extras/generateFriendlyUrl.ts';
import { ErrorInterface } from '../../../types/error.interface.ts';

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

        <ModalMy
          isModalOpen={modalOpened}
          title={'Dodaj Książkę'}
          content={
            <Flex vertical gap={32}>
              <Form
                onFinish={submit}
                onKeyUp={(event) => {
                  if (event.key === 'Enter') {
                    addBookForm.submit();
                  }
                }}
                form={addBookForm}
                layout={'vertical'}
                variant={'underlined'}
                style={{ maxWidth: 600 }}
                initialValues={{ variant: 'filled' }}
              >
                <Form.Item
                  label='Tytuł'
                  name='title'
                  rules={[
                    {
                      required: true,
                      message: 'Tytuł książki jest wymagany',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Autor'
                  name='author'
                  rules={[
                    {
                      required: true,
                      message: 'Autor jest wymagany',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Rok'
                  name='year'
                  rules={[
                    {
                      required: true,
                      message: 'Rok wydania',
                    },
                    {
                      validator: (_, value: string) => {
                        const currentYear = new Date().getFullYear();
                        const yearRegex = /^[0-9]{4}$/;

                        if (!value) {
                          return Promise.reject(
                            new Error('Rok wydania jest wymagany')
                          );
                        }

                        if (!yearRegex.test(value)) {
                          return Promise.reject(
                            new Error('Rok musi być w formacie RRRR')
                          );
                        }

                        const year = parseInt(value, 10);
                        if (year < 1900 || year > currentYear) {
                          return Promise.reject(
                            new Error(
                              `Rok musi być w przedziale od 1900 do ${currentYear}`
                            )
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Opis'
                  name='description'
                  rules={[
                    {
                      required: true,
                      message: 'Opis jest wymagany',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  label='Liczba egzemplarzy'
                  name='count'
                  rules={[
                    {
                      required: true,
                      message: 'Podaj liczbę egzemplarzy',
                    },
                    {
                      type: 'number',
                      min: 1,
                      max: 9999,
                      transform: (value) => (value ? Number(value) : value),
                      message: 'Liczba egzemplarzy musi być między 1 a 9999',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Slug'
                  name='slug'
                  rules={[
                    {
                      required: true,
                      message: 'Slug jest wymagany',
                    },
                  ]}
                >
                  <Input
                    onFocus={(e) => {
                      const titleValue = addBookForm.getFieldValue('title');
                      if (titleValue && e.target.value === '') {
                        addBookForm.setFieldsValue({
                          slug: generateFriendlyURL(titleValue),
                        });
                      }
                    }}
                    onChange={(e) => {
                      const fUrl = generateFriendlyURL(e.target.value);
                      addBookForm.setFieldsValue({
                        slug: fUrl,
                      });
                    }}
                  />
                </Form.Item>
              </Form>
            </Flex>
          }
          handleCancel={resetForm}
          handleOk={addBookForm.submit}
        />
        {messageHolder}
      </>
    );
  }
};
