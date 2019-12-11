import React from 'react';
import { Card, Form, Input, Button, Checkbox, message, Icon } from 'antd';
import './form.less';

const FormItem = Form.Item;

class FormLogin extends React.Component {

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if(!err){
                message.success(`${userInfo.userName}，你的密码是 ${userInfo.passwd}`)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Card title="行内登录表单" className="card card-wrap">
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
                </Card>
                <Card title="水平登录表单" className="card card-wrap">
                    <Form className="login-form">
                        <FormItem>
                            {
                                getFieldDecorator('userName', { 
                                    initialValue: '', 
                                    rules: [{
                                        required: true,
                                        message:'用户名不能为空'
                                    },{
                                        min: 6, max: 12,
                                        message: '长度不在范围内'
                                    },{
                                        pattern: new RegExp('^\\w+$', 'g'),
                                        message: '用户名必须为字母或者数字'
                                    }] 
                                }
                                )(<Input placeholder="请输入用户名" prefix={<Icon type="user"/>} />)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('passwd', {
                                    initialValue: '', 
                                    rules: [] 
                                }
                                )(<Input.Password placeholder="请输入密码" prefix={<Icon type="lock"/>} />)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remeber', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: [] 
                                }
                                )(<Checkbox>记住密码</Checkbox>)
                            }
                            <a href="top" className="forgetPasswd">忘记密码</a>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormLogin);