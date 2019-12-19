import React from 'react';
import { Card, Form, Button, Table, Select, DatePicker } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.requestList();
    }

    requestList = (params) => {
        axios.ajax({
            url: '/order/list',
            data: { params }
        }).then((res) => {
            this.setState({
                list: res.result.item_list.map((item) => {
                    item.key = item.id;
                    return item;
                }),
                pagination: Utils.pagination(res, (current) => {
                    this.requestList({ page: current });
                })
            });
        });
    }

    render() {
        const columns = [{
            title: '订单编号',
            dataIndex: 'order_sn'
        }, {
            title: '车辆编号',
            dataIndex: 'bike_sn'
        }, {
            title: '用户名',
            dataIndex: 'user_name'
        }, {
            title: '手机号',
            dataIndex: 'mobile'
        }, {
            title: '里程',
            dataIndex: 'distance'
        }, {
            title: '行驶时长',
            dataIndex: 'total_time'
        }, {
            title: '状态',
            dataIndex: 'status'
        }, {
            title: '开始时间',
            dataIndex: 'start_time'
        }, {
            title: '结束时间',
            dataIndex: 'end_time'
        }, {
            title: '订单金额',
            dataIndex: 'total_fee'
        }, {
            title: '实付金额',
            dataIndex: 'user_pay'
        }]

        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <Button>订单详情</Button>
                    <Button>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table bordered columns={columns} dataSource={this.state.list} pagination={this.state.pagination} />
                </div>
            </div>
        );
    }
}

class FilterForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline">
                <FormItem label="城市" >
                    {
                        getFieldDecorator('city_id')(
                            <Select placeholder="全部" style={{width: 80}}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="1">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间" >
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="" >
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>

                <FormItem label="订单状态" >
                    {
                        getFieldDecorator('status')(
                            <Select placeholder="全部" style={{width: 100}}>
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }

                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

export { Order };