import React from 'react';
import { Card, Spin, Icon, Alert } from 'antd';
import './ui.less';

export default class Buttons extends React.Component {
    render() {
        const icon = <Icon type="loading" />

        return (
            <div>
                <Card title="Spin用法" className="card card-wrap">
                    <Spin size="small" />
                    <Spin size="default" />
                    <Spin size="large" />
                    <Spin indicator={icon} />
                </Card>
                <Card title="Spin用法" className="card card-wrap">
                    <Alert message="React" description="认真学习，勤奋训练" type="info"/>
                    <Spin>
                        <Alert message="React" description="认真学习，勤奋训练" type="info"/>
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert message="React" description="认真学习，勤奋训练" type="info"/>
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert message="React" description="认真学习，勤奋训练" type="info"/>
                    </Spin>
                </Card>
            </div>
        );
    }
}