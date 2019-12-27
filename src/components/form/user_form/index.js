import React from 'react';
import { Form, Input, Radio, Select, DatePicker } from 'antd';
import './user_form.less';
import Moment from 'moment';

const FormItem = Form.Item;

class UserForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const formatLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        }

        const info = this.props.info || {};
        const type = this.props.type;

        debugger

        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formatLayout}>
                    {
                        (info && type === "search") ? info.userName :
                            getFieldDecorator('user_name', { initialValue: info.userName })(
                                <Input type="text" placeholder="请输入姓名" />
                            )
                    }
                </FormItem>
                <FormItem label='性别' {...formatLayout}>
                    {
                        (info && type === "search") ? (info.sex === 1 ? '男' : '女') :
                            getFieldDecorator('sex', { initialValue: info.sex })(
                                <Radio.Group>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </Radio.Group>
                            )
                    }
                </FormItem>
                <FormItem label='状态' {...formatLayout}>
                    {
                        (info && type === "search") ? info.state :
                            getFieldDecorator('state', { initialValue: info.state })(
                                <Select>
                                    <Select.Option value={1}>上学中</Select.Option>
                                    <Select.Option value={2}>工作中</Select.Option>
                                    <Select.Option value={3}>待业中</Select.Option>
                                    <Select.Option value={4}>创业中</Select.Option>
                                </Select>
                            )
                    }
                </FormItem>
                <FormItem label='生日' {...formatLayout}>
                    {
                        (info && type === "search") ? info.birthday :
                            getFieldDecorator('birthday', { initialValue: Moment(info.birthday) })(
                                <DatePicker />
                            )
                    }
                </FormItem>
                <FormItem label='联系地址' {...formatLayout}>
                    {
                        (info && type === "search") ? info.address :
                            getFieldDecorator('address', { initialValue: info.address })(
                                <Input.TextArea rows={3} placeholder="请输入联系地址" />
                            )
                    }
                </FormItem>
            </Form>
        );
    }
}

UserForm = Form.create({})(UserForm);

export { UserForm };