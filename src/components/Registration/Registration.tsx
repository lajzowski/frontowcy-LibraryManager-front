import { Content } from '../../layout/Content/Content.tsx';
import { Button, Flex, Form, Input } from 'antd';
import { RegistrationI } from '../../types/registration.interface.ts';
import { useForm } from 'antd/es/form/Form';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useState } from 'react';
import { UserI } from '../../types/user.interface.ts';
import { RegCompleted } from './RegCompleted.tsx';

export const Registration = () => {
  const [form] = useForm<RegistrationI>();
  const { mutate } = useCreateMutation<UserI, RegistrationI, never>(
    'user/register'
  );

  const [userData, setUserData] = useState<UserI>();

  const onSubmit = (values: RegistrationI) => {
    mutate(values, {
      onSuccess: (user) => {
        form.resetFields();

        setUserData(user);
      },
    });
  };

  return (
    <Content
      title={'Rejestracja'}
      subtitle={'Zarejestruj się, aby mieć dostęp do biblioteki.'}
    >
      {userData ? (
        <RegCompleted user={userData} />
      ) : (
        <Flex vertical gap={32}>
          <Form
            onFinish={onSubmit}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                form.submit();
              }
            }}
            form={form}
            layout={'vertical'}
            variant={'underlined'}
            style={{ maxWidth: 600 }}
            initialValues={{ variant: 'filled' }}
          >
            <Form.Item
              label='Imię'
              name='firstname'
              rules={[{ required: true, message: 'Proszę wpisać imię.' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Nazwisko'
              name='lastname'
              rules={[{ required: true, message: 'Proszę wpisać nazwisko.' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Proszę wpisać e-mail.' },
                {
                  type: 'email',
                  message: 'Proszę wpisać poprawny adres e-mail.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Hasło'
              name='password'
              rules={[
                { required: true, message: 'Proszę wpisać hasło.' },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    'Hasło musi mieć minimum 6 znaków, w tym 1 cyfrę i jedną literę.',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Powtórz hasło'
              name='confirmPassword'
              dependencies={['password']}
              rules={[
                { required: true, message: 'Proszę powtórzyć hasło.' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Hasła muszą być takie same.')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button onClick={form.submit}>Zarejestruj</Button>
            </Form.Item>
          </Form>
        </Flex>
      )}
    </Content>
  );
};
