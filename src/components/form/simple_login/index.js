import React from 'react';
import { Form, Input, Button } from 'antd';
import './index.less';

const FormItem = Form.Item;

class SimpleLogin extends React.Component {
    render() {
        return (
            <Form layout="inline">
                <FormItem>
                    <Input placeholder="请输入用户名" />
                </FormItem>
                <FormItem>
                    <Input.Password placeholder="请输入密码" />
                </FormItem>
                <FormItem>
                    <Button type="primary">登录</Button>
                </FormItem>
            </Form>
        );
    }
}

export { SimpleLogin };