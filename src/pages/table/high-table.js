import React from 'react';
import { Card, Table, Badge, Button, Modal, message  } from 'antd';
import axios from '../../axios';
import './table.less';
import Utils from '../../utils/utils';

export default class HighTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null
        };

        this.request();
    }

    //获取mock动态数据
    request = (param) => {
        axios.ajax({
            url: '/table/high',
            data: {
                isShowLoading: true,
                params: param
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.list.map((item, index) => item.key = index);
                this.setState({ 
                    dataSource: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res, (current) => {
                        this.request({page: current});
                    })
                })
            }
        });
        
    }

    handleDelete = (item) => {
        let id = item.id;

        Modal.confirm({
            title: '确认',
            content: `你确定要删除${id}这条数据吗？`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        });
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

        const columns2 = [{
            title: 'id',
            dataIndex: 'id',
            fixed: 'left',
            width: 80
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
        },{
            title: '日期1',
            dataIndex: 'date1'
        },{
            title: '日期2',
            dataIndex: 'date2'
        },{
            title: '日期3',
            dataIndex: 'date3'
        },{
            title: '日期4',
            dataIndex: 'date4'
        },{
            title: '日期5',
            dataIndex: 'date5'
        },{
            title: '日期6',
            dataIndex: 'date6'
        },{
            title: '日期7',
            dataIndex: 'date7'
        },{
            title: '日期8',
            dataIndex: 'date8'
        },{
            title: '日期9',
            dataIndex: 'date9'
        },{
            title: '日期10',
            dataIndex: 'date10'
        },{
            title: '日期11',
            dataIndex: 'date11'
        },{
            title: '日期12',
            dataIndex: 'date12'
        },{
            title: '地址',
            dataIndex: 'address'
        }, {
            title: '早起时间',
            dataIndex: 'time',
            fixed: 'right',
            width: 80
        }
        ];

        const columns3 = [{
            title: 'id',
            dataIndex: 'id'
        }, {
            title: '用户名',
            dataIndex: 'userName'
        },{
            title: '年龄',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age
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
        },{
            title: '进度',
            dataIndex: 'process',
            render(process) {
                let config = {
                    '1': <Badge status="default" text="项目准备"/>,
                    '2': <Badge status="processing" text="项目进行中"/>,
                    '3': <Badge status="success" text="项目完成"/>,
                    '4': <Badge status="warning" text="接近项目限期"/>,
                    '5': <Badge status="error" text="项目超期"/>
                };
                return config[process];
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
        },{
            title: '操作',
            render:(item) => {
                return <Button onClick={(item) => {this.handleDelete(item)}}>删除</Button>
            }
                
            
        }
        ];
        return (
            <div>
                <Card title="固定表头" className="card card-wrap">
                    <Table columns={columns} dataSource={this.state.dataSource} bordered pagination={false} 
                        scroll={{y: 240}}
                    />
                </Card>
                <Card title="固定表格两侧" className="card card-wrap">
                    <Table columns={columns2} dataSource={this.state.dataSource} bordered scroll={{x:2300}}/>
                </Card>
                <Card title="表格排序" className="card card-wrap">
                    <Table columns={columns3} dataSource={this.state.dataSource} />
                </Card>
            </div>
        );
    }
}