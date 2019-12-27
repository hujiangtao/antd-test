import React from 'react';
import { Modal } from 'antd';
import './operating_user.less';
import { UserForm } from '../../form/user_form';

class OperatingUserModal extends React.Component {

    onOk = () => {
        let data = this.userForm.props.form.getFieldsValue();
        this.props.submit(data);
        this.userForm.props.form.resetFields();
    }

    onCancel = () => {
        this.props.cancelModal();
        this.userForm.props.form.resetFields();
    }

    render() {
        return (
            <Modal title={this.props.title} visible={this.props.visible} onOk={this.onOk} onCancel={this.onCancel}>
                <UserForm type={this.props.type} info={this.props.userInfo} wrappedComponentRef={(inst) => this.userForm = inst} />
            </Modal>
        );
    }
}

export { OperatingUserModal }