import React from 'react';
import { Card, message, Tabs, Icon } from 'antd';
import './ui.less';

const TabPane = Tabs.TabPane;
export default class Tab extends React.Component {
    constructor(props) {
        super(props);

        this.newTabIndex = 1;
        const panes = [
            { title: 'Tab 1', content: '可编辑页签1', key: '1' },
            { title: 'Tab 2', content: '可编辑页签2', key: '2' },
            { title: 'Tab 3', content: '可编辑页签3', key: '3' }
        ]

        this.state = {
            activeKey: panes[0].key,
            panes
        }
    }

    handleCallback = (key) => {
        message.info("你选择了页签：" + key);
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New tab pane',key: activeKey });
        this.setState({ panes, activeKey});
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach( (pane, i) => {
            if(pane.key === targetKey) {
                lastIndex = i -1;
            }
        });

        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if(panes.length && activeKey === targetKey){
            if(lastIndex >= 0){
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0];
            }
        }

        this.setState({panes, activeKey});
    }

    render() {
        return (
            <div>
                <Card title="Tab页签" className="card card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="测试页签-1" key="1">Antd的页签练习之一</TabPane>
                        <TabPane tab="测试页签-2" key="2">Antd的页签练习之二</TabPane>
                        <TabPane tab="测试页签-3" key="3">Antd的页签练习之三</TabPane>
                    </Tabs>
                </Card>
                <Card title="带图标的页签" className="card card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="file-add" />添加</span>} key="add">Antd的页签练习之添加</TabPane>
                        <TabPane tab={<span><Icon type="edit" />编辑</span>} key="edit">Antd的页签练习之编辑</TabPane>
                        <TabPane tab={<span><Icon type="delete" />删除</span>} key="delete">Antd的页签练习之删除</TabPane>
                    </Tabs>
                </Card>
                <Card title="可编辑的页签" className="card card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.onChange} type="editable-card" activeKey={this.state.activeKey} 
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((pane) => {
                            return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}