import React from 'react';
import { Card, Button, Icon, Radio } from 'antd';
import './ui.less';

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            size: 'default',
        }
    }

    handleCloseLoading = () => {
        this.setState({ loading: false });
    }

    handleChange = (event) => {
        this.setState({ size: event.target.value });
    }

    render() {
        return (
            <div>
                <Card title="基础按钮" className="card card-wrap">
                    <Button type="primary">Imooc</Button>
                    <Button >Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>
                <Card title="图形按钮" className="card card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="loading按钮" className="card card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" loading={this.state.loading} shape="circle"></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button loading={this.state.loading} shape="circle"></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" className="card card-wrap-group">
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left" />
                            前进
                        </Button>
                        <Button type="primary">
                            后退
                            <Icon type="right" />
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Imooc</Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type="dashed" size={this.state.size}>Imooc</Button>
                    <Button type="danger" size={this.state.size}>Imooc</Button>
                </Card>
            </div>
        );
    }
}