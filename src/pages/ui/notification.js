import React from 'react';
import { Card, Button, notification } from 'antd';
import './ui.less';

export default class Notification extends React.Component {
    openNotification = (type, direction = '') => {
        notification.config({
            placement: direction
        });

        notification[type]({
            message: '进度',
            description: '今天学习到了第五章，正在做练习。'
        });
    }

    render() {
        return (
            <div>
                <Card title="信息确认框" className="card card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error')}>Error</Button>
                </Card>
                <Card title="自定义位置的信息确认框" className="card card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info', 'topRight')}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning', 'bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>Error</Button>
                </Card>
            </div>
        );
    }
}