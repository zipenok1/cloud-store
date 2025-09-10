'use client'

import React from 'react';
import { setCookie } from 'nookies';
import { Button, Form, Input } from 'antd';
import { TregistrForm } from '../api/type/auth.type';

import * as Api from '../api'

export const RegistrForm: React.FC = () => {

  const onSubmit = async (values: TregistrForm) => {
    try{
      const { token } = await Api.auth.registr(values)

      setCookie(null, "_token", token, {
        path: '/'
      })

      location.href = '/'

    } catch(e){
      console.warn('registrForm', e)
    }
  }

  return (
    <div>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        onFinish={onSubmit}
      >
        <Form.Item
          label='имя'
          name='name'
          rules={[{ required: true, message: 'укажите имя' }]}
        >
          <Input />
        </Form.Item>

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
            offset: 8,
            span: 16
          }}
        >
          <Button type='primary' htmlType='submit'>
            Регистрация 
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};