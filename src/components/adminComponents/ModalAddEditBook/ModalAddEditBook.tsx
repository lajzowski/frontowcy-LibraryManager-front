import { ModalMy } from '../../addons/ModalMy/ModalMy.tsx';
import { BookInterface } from '../../../types/book.interface.ts';
import { Flex, Form, FormInstance, Input } from 'antd';
import { generateFriendlyURL } from '../../../extras/generateFriendlyUrl.ts';

interface Props {
  modalOpened: boolean;
  resetForm: () => void;
  submit: (values: BookInterface) => void;
  addBookForm: FormInstance<BookInterface>;
}

export const ModalAddEditBook = ({
  modalOpened,
  resetForm,
  submit,
  addBookForm,
}: Props) => {
  return (
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
              <Input
                onChange={(e) => {
                  const fUrl = generateFriendlyURL(e.target.value);
                  addBookForm.setFieldsValue({
                    slug: fUrl,
                  });
                }}
              />
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
  );
};
