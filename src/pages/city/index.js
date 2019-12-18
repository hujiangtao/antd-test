import React from 'react';
import { Card, Button, Form, Table, Select, Modal, message } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import './city.less';

const FormItem = Form.Item;
const Option = Select.Option;

class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.requestList();
    }

    // 请求接口数据
    requestList = (param) => {
        axios.ajax({
            url: 'open_city',
            data: {
                params: param,
            }
        }).then((res) => {
            this.setState({
                list: res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                }),
                pagination: Utils.pagination(res, (current) => {
                    this.requestList({ page: current });
                })
            });
        });
    }

    handleOpenCity = () => {
        this.setState({ isShowOpenCity: true});
    }

    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();

        axios.ajax({
            url: 'city/open',
            data: {
                params: cityInfo
            }
        }).then((res) => {
            if(res.code === 0){
                message.success(res.result);
                this.setState({ isShowOpenCity: false });
                this.requestList();
            }
        });
    }

    render() {
        const columns = [{
            title: '城市ID',
            dataIndex: 'id'
        }, {
            title: '城市名称',
            dataIndex: 'name'
        }, {
            title: '用车模式',
            dataIndex: 'mode',
            render(mode){
                return mode === 1 ? '指定停车点':'禁停区'
            }
        }, {
            title: '运营模式',
            dataIndex: 'op_mode',
            render(op_mode){
                return op_mode === 1 ? '自营':'加盟'
            }
        }, {
            title: '授权加盟商',
            dataIndex: 'franchisee_name'
        }, {
            title: '城市管理员',
            dataIndex: 'city_admins',
            render(arr) {
                return arr.map((item) => {
                    return item.user_name
                }).join(',');
            }
        }, {
            title: '城市开通时间',
            dataIndex: 'open_time'
        }, {
            title: '操作时间',
            dataIndex: 'update_time',
            render: Utils.formatDate
        }, {
            title: '操作人',
            dataIndex: 'sys_user_name'
        }];

        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination} />
                <Modal title="开通城市" visible={this.state.isShowOpenCity} onOk={this.handleSubmit}
                    onCancel={() => {
                        this.setState({ isShowOpenCity: false});
                    }}
                >
                    <OpenCityForm wrappedComponentRef={(inst) => { this.cityForm = inst; }}/>
                </Modal>
            </div>
        );
    }
}

class FilterForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline" className="filter-form">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select placeholder="全部" className="select_city">
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator('mode')(
                            <Select placeholder="全部" className="select_mode">
                                <Option value="">全部</Option>
                                <Option value="1">指定停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式">
                    {
                        getFieldDecorator('op_mode')(
                            <Select placeholder="全部" className="select_op_mode">
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator('auth_status')(
                            <Select placeholder="全部" className="select_auth_status">
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary">查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component {

    render() {
        const formItemLayout ={
            labelCol:{ span:4 },
            wrapperCol: { span:10 }
        }

        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', { initialValue: '1' })(
                            <Select>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', { initialValue: '1' })(
                            <Select>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('mode', { initialValue: '1' })(
                            <Select>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }

                </FormItem>
            </Form>
        );
    }
}
OpenCityForm = Form.create()(OpenCityForm);

export { City };