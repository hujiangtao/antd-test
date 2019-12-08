import React from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less';

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal1: false,
            showModal2: false,
            showModal3: false,
            showModal4: false
        };
    }

    handleOpen = (type) => {
        this.setState({
            [type]: true
        })

    }

    handleOk = (type) => {
        this.setState({
            [type]: false
        });
    };

    handleCancel = (type) => {
        this.setState({
            [type]: false
        });
    };

    handleConfirm = (type) => {
        Modal[type]({
            title: '确认',
            content: '今天的练习做完了吗？',
            onOk(){

            },
            onCancel(){

            }
        })
    }

    render() {
        return (
            <div>
                <Card title="基础模态框" className="card card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Modal title="React" visible={this.state.showModal1}
                    onCancel={() => this.handleCancel('showModal1')} onOk={() => this.handleCancel('showModal1')}>
                    <p>学习离不开勤奋的练习，学习React也一样。</p>
                </Modal>

                <Modal title="自定义页脚" visible={this.state.showModal2} okText="下一步" cancelText="算了"
                    onCancel={() => this.handleCancel('showModal2')} onOk={() => this.handleCancel('showModal2')}>
                    <p>学习离不开勤奋的练习，学习React也一样。</p>
                </Modal>

                <Modal title="顶部20px弹框" visible={this.state.showModal3} style={{top:20}}
                    onCancel={() => this.handleCancel('showModal3')} onOk={() => this.handleCancel('showModal3')}>
                    <p>学习离不开勤奋的练习，学习React也一样。</p>
                </Modal>

                <Modal title="水平垂直居中" visible={this.state.showModal4} wrapClassName="vertical-center-modal"
                    onCancel={() => this.handleCancel('showModal4')} onOk={() => this.handleCancel('showModal4')}>
                    <p>学习离不开勤奋的练习，学习React也一样。</p>
                </Modal>


                <Card title="信息确认框" className="card card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>
            </div>
        );
    }
}