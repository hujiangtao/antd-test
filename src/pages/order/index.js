import React from 'react';
import { Card, Form, Button, Table, Select, DatePicker, Modal, message } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import './order.less';

const FormItem = Form.Item;
const Option = Select.Option;

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderConfirmVisible: false,
            orderInfo: {}
        };

        this.requestList();
    }

    requestList = (params) => {
        axios.ajax({
            url: '/order/list',
            data: { params }
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

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    handleFinishOrder = () => {
        let item = this.state.selectedItem;

        axios.ajax({
            url: '/order/finish_order',
            data: { params: { orderId: item.id } }
        }).then(res => {
            if (res.code === 0) {
                message.success('订单结束成功');
                this.setState({ orderConfirmVisible: false });

                this.requestList();
            }
        });
    }

    handleConfirm = () => {
        let item = this.state.selectedItem;

        if (!item) {
            Modal.info({
                title: '提示信息',
                content: '结束订单前需要选择一条订单'
            });
            return;
        }

        axios.ajax({
            url: '/order/ebike_info',
            data: { params: { orderId: item.id } }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisible: true
                });
            }
        });
    }

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '提示信息',
                content: '结束订单前需要选择一条订单'
            });
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`);
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

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        };
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedItem: selectedRows[0]
                })
            }
        }

        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card className="op_order">
                    <Button className="btn_order_detail" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button className="btn_finish_order" onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table bordered columns={columns} dataSource={this.state.list} pagination={this.state.pagination}
                        rowSelection={rowSelection} onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal title="结束订单" visible={this.state.orderConfirmVisible} onOk={this.handleFinishOrder}
                    onCancel={() => {
                        this.setState({ orderConfirmVisible: false });
                    }}
                >
                    <Form>
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

class FilterForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline" className="order_filter_form">
                <FormItem label="城市" >
                    {
                        getFieldDecorator('city_id')(
                            <Select placeholder="全部" className="city">
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
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem label="" >
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>

                <FormItem label="订单状态" >
                    {
                        getFieldDecorator('status')(
                            <Select placeholder="全部" className="status">
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