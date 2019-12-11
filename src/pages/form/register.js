import React from 'react';
import { Card, Form, Input, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload, Icon, Checkbox, Button } from 'antd';
import './form.less';
import moment from 'moment';

const FormItem = Form.Item;

class FormRegister extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    userImg: imageUrl,
                    loading: false,
                }),
            );
        }
    };

    onSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo));
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24, sm: 2
            },
            wrapperCol: {
                xs: 24, sm: 10
            }
        };
        const offsetLayout = {
            wrapperCol: {
                xs: 24, sm:{span: 10, offset: 2}
            }
        }

        return (
            <div>
                <Card title="注册表单" className="card card-wrap">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '用户名不能为空'
                                    }]
                                })(<Input placeholder="请输入用户名" />)
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('passwd', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '密码不能为空'
                                    }]
                                })(<Input.Password placeholder="请输入密码" />)
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '2',
                                    rules: []
                                })(
                                    <Radio.Group>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: '18',
                                    rules: []
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '2',
                                    rules: []
                                })(
                                    <Select>
                                        <Select.Option value="1">上学中</Select.Option>
                                        <Select.Option value="2">工作中</Select.Option>
                                        <Select.Option value="3">待业中</Select.Option>
                                        <Select.Option value="4">创业中</Select.Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: ['2', '7'],
                                    rules: []
                                })(
                                    <Select mode="multiple">
                                        <Select.Option value="1">唱歌</Select.Option>
                                        <Select.Option value="2">足球</Select.Option>
                                        <Select.Option value="3">摄影</Select.Option>
                                        <Select.Option value="4">书法</Select.Option>
                                        <Select.Option value="5">弹钢琴</Select.Option>
                                        <Select.Option value="6">爬山</Select.Option>
                                        <Select.Option value="7">旅游</Select.Option>
                                        <Select.Option value="8">睡觉</Select.Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="婚否" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: []
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2008-08-08'),
                                    rules: []
                                })(
                                    <DatePicker format="MM-DD-YYYY" />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: "湖北省武汉市关山路123#",
                                    rules: []
                                })(
                                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time', {
                                    initialValue: moment('6:15:00', 'HH:mm:ss'),
                                    rules: []
                                })(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload listType="picture-card" showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg? <img src={this.state.userImg} alt=""/>:<Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('agreement')(
                                    <Checkbox>我已经阅读了<a href="#t">协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('submit')(
                                    <Button type="primary" onClick={this.onSubmit}>注册</Button>
                                )
                            }
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormRegister);