import React from 'react';
import { Button } from 'antd';
import './index.less';

class OperationButton extends React.Component {

    render() {
        return (
            <div className="k1com_operation_btn_wrapper">
                <Button type="primary" icon="user-add" onClick={this.props.createStaffInfo}>创建员工</Button>
                <Button type="primary" icon="edit" onClick={this.props.editStaffInfo}>编辑员工</Button>
                <Button type="primary" icon="search" onClick={this.props.searchStaffInfo}>员工详情</Button>
                <Button type="danger" icon="delete" onClick={this.props.deleteStaffInfo}>删除员工</Button>
            </div>
        );
    }
}

export { OperationButton };