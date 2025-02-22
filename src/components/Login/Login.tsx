import { Content } from '../../layout/Content/Content.tsx';
import { Button, Flex, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { LoginI } from '../../types/login.interface.ts';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useUserLoginStore } from '../../hooks/useUserLoginStore.ts';
import { UserI } from '../../types/user.interface.ts';

import './Login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Login = () => {
  const [form] = useForm<LoginI>();

  const [error, setError] = useState<string>('');

  const { setAccessKey, setUser } = useUserLoginStore();

  const navigate = useNavigate();

  const { mutate } = useCreateMutation<
    { accessKey: string; user: UserI },
    LoginI,
    never
  >('auth/login');

  const onSubmit = (values: LoginI) => {
    mutate(
      { ...values, cardNumber: Number(values.cardNumber) },

      {
        onSuccess: (data) => {
          form.resetFields();

          setAccessKey(data.accessKey);
          setUser(data.user);

          navigate('/');
        },
        onError: (error) => {
          if (error instanceof Error) {
            if (error.message.includes('403')) {
              setError('Błędne dane logowania!');
            } else {
              setError('Nieznany błąd logowania. Spróbuj ponownie.');
            }
          }
        },
      }
    );
  };

  return (
    <Content title={'Logowanie'} subtitle={'Zaloguj się do biblioteki'}>
      <Flex vertical gap={32}>
        <Form
          onChange={() => setError('')}
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
            label='Numer karty'
            name='cardNumber'
            rules={[
              { required: true, message: 'Proszę wpisać numer karty.' },
              {
                pattern: /^[0-9]{10}$/,
                message:
                  'Numer karty musi być liczbą i mieć dokładnie 10 znaków.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Hasło'
            name='password'
            rules={[{ required: true, message: 'Proszę wpisać hasło.' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              data-testid='button-submit'
              name={'submit'}
              onClick={form.submit}
            >
              Zaloguj
            </Button>
            {error && (
              <span
                className={
                  'login-error ant-form-item-explain ant-form-item-explain-error'
                }
              >
                Błędne dane logowania!
              </span>
            )}
          </Form.Item>
        </Form>
      </Flex>
    </Content>
  );
};
