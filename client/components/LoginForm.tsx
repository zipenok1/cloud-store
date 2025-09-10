'use client'

import { Button, Form, Input } from 'antd';
import React from 'react';

export const LoginForm: React.FC = () => {

  const onSubmit = (values: string) => {
    console.log(values);
  }

  return (
    <div>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        onFinish={onSubmit}
      >
        <Form.Item
          label='почта'
          name='email'
          rules={[{ required: true, message: 'укажите почту' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='пароль'
          name='password'
          rules={[{ required: true, message: 'укажите пароль' }]}
        >
          <Input.Password /> 
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 9,
            span: 16
          }}
        >
          <Button type='primary' htmlType='submit'>
              Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};