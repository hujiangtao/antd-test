import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from '../../axios';
import './table.less';
import Utils from '../../utils/utils';

export default class BasicTable extends React.Component {
    constructor(props) {
        super(props);

        const data = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ];

        data.map((item, index) => item.key = index);

        this.state = {
            sourceData: data
        };

        this.request();
    }

    //获取mock动态数据
    request = (param) => {
        axios.ajax({
            url: '/table/list',
            data: {
                isShowLoading: true,
                params: param
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.list.map((item, index) => item.key = index);
                this.setState({ 
                    sourceData2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res, (current) => {
                        this.request({page: current});
                    })
                })
            }
        });
        
    }

    onRowClick = (record, index) => {
        Modal.info({
            title: '信息',
            content: `用户名：${record.userName},用户爱好${record.interest}`
        });

        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];

        if(rows === null){
            Modal.warning({
                title: '删除警告',
                content: '你没有选中任何项'
            });

            return false;
        }

        rows.map((item) => ids.push(item.id));

        Modal.confirm({
            title:'删除提示',
            content: `你确定要删除这些数据吗？ ${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id'
        }, {
            title: '用户名',
            dataIndex: 'userName'
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex === 1 ? '男' : '女'
            }
        }, {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '上学中',
                    '2': '工作中',
                    '3': '待业中',
                    '4': '创业中'
                };
                return config[state];
            }
        }, {
            title: '爱好',
            dataIndex: 'interest',
            render(interest) {
                let config = {
                    '1': '唱歌',
                    '2': '足球',
                    '3': '摄影',
                    '4': '书法',
                    '5': '弹钢琴',
                    '6': '爬山',
                    '7': '旅游',
                    '8': '睡觉'
                };
                return config[interest];
            }
        }, {
            title: '生日',
            dataIndex: 'birthday'
        }, {
            title: '地址',
            dataIndex: 'address'
        }, {
            title: '早起时间',
            dataIndex: 'time'
        }
        ];

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys
        };
        const rowCheckboxSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        };

        return (
            <div>
                <Card title="基础表格" className="card card-wrap">
                    <Table columns={columns} dataSource={this.state.sourceData} bordered pagination={false} />
                </Card>
                <Card title="动态渲染表格" className="card card-wrap">
                    <Table columns={columns} dataSource={this.state.sourceData2} bordered />
                </Card>
                <Card title="单选表格" className="card card-wrap">
                    <Table columns={columns} dataSource={this.state.sourceData2} bordered rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => this.onRowClick(record, index)
                            }
                        }}
                    />
                </Card>
                <Card title="复选表格" className="card card-wrap">
                    <Table columns={columns} dataSource={this.state.sourceData2} bordered rowSelection={rowCheckboxSelection} />
                    <Button onClick={this.handleDelete}>删除</Button>
                </Card>
                <Card title="分页表格" className="card card-wrap">
                    <Table columns={columns} dataSource={this.state.sourceData2} rowSelection={rowCheckboxSelection} pagination={this.state.pagination}/>
                </Card>
            </div>
        );
    }
}