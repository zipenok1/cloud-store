'use client'

import React from 'react';
import { setCookie } from 'nookies';
import { Button, Form, Input } from 'antd';
import { IloginForm } from '../api/type/auth.type';

import * as Api from '../api'

export const LoginForm: React.FC = () => {

  const onSubmit = async (values: IloginForm) => {
    try{
      // Api.auth.login(values) и дт
      const { token } = await Api.auth.login(values)

      setCookie(null, "_token", token, {
        path: '/'
      })

      location.href = '/dashboard'

    } catch(e){
      console.warn('loginForm', e)
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
              Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};