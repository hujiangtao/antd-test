import React from 'react';
import { Card, Table } from 'antd';
import axios from 'axios';
import './table.less';

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

        this.state = {
            sourceData: data
        };

        this.request();
    }

    //获取mock动态数据
    request = () =>{
        let baseUrl = 'http://192.168.16.118:7300/mock/5df52264267c68079cfd7a0c/imoocapi';
        axios.get(baseUrl + '/table/list').then((res) => {
            if(res.status === 200 && res.data.code === 0){
                this.setState({sourceData2: res.data.result.list})
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
        }, {
            title: '状态',
            dataIndex: 'state',
        }, {
            title: '爱好',
            dataIndex: 'interest',
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

        return (
            <div>
                <Card title="基础表格" className="card card-wrap">
                    <Table columns={columns} dataSource={this.state.sourceData} bordered pagination={false}/>
                </Card>
                <Card title="动态渲染表格" className="card card-wrap">
                    <Table columns={columns} dataSource={this.state.sourceData2} bordered />
                </Card>
            </div>
        );
    }
}