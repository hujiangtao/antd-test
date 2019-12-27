import React from 'react';
import { Card, Modal } from 'antd';
import './user.less';
import axios from '../../axios';
import Utils from '../../utils/utils';
import { SimpleLogin } from '../../components/form/simple_login';
import { OperationButton } from '../../components/operation_button';
import { StaffInfoTable } from '../../components/table/staff';
import { staffInfoHeader } from '../../config/constant';
import { OperatingUserModal } from '../../components/modal/operating_user';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        };

        this.request();
    }

    operatingUserInfo = (type) => {
        let info = this.state.selectedItem;
        switch (type) {
            case 'create':
                this.setState({
                    modalTitle: '创建员工',
                    isVisible: true,
                    type: 'create'
                });
                break;
            case 'edit':
                if (this.state.selectedRowKeys) {
                    this.setState({
                        modalTitle: '编辑员工',
                        isVisible: true,
                        type: 'edit'
                    });
                } else {
                    Modal.warning({
                        title: '提示',
                        content: '请选择你要编辑的员工信息行',
                    });
                }
                break;
            case 'search':
                if (this.state.selectedRowKeys) {
                    this.setState({
                        modalTitle: '员工详情',
                        isVisible: true,
                        type: 'search'
                    });
                } else {
                    Modal.warning({
                        title: '提示',
                        content: '请选择你要显示详情的员工信息行',
                    });
                }
                break;
            case 'delete':
                if (this.state.selectedRowKeys) {
                    Modal.confirm({
                        title: '删除确认',
                        content: '你确定要删除选中的员工信息吗?',
                        onOk: () => {
                            axios.ajax({
                                url: '/user/delete',
                                data: { params: { id: info.id } }
                            }).then((res) => {
                                if (res.code === 0) {
                                    this.setState({
                                        isVisible: false,
                                    });
                                    this.request();
                                }
                            })
                        }
                    })
                } else {
                    Modal.warning({
                        title: '提示',
                        content: '请选择你要删除的员工信息行',
                    });
                }
                break;
            default:
                break;
        }
    }

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
                    dataList: res.result.list,
                    pagination: Utils.pagination(res, (current) => {
                        this.request({ page: current });
                    })
                })
            }
        });
    }

    setRowItem = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    cancelModal = () => {
        this.setState({
            isVisible: false,
            userInfo: ''
        })
    }

    handleSubmit = (list) => {
        console.log({ ...list });
        axios.ajax({
            url: '/user/add',
            data: { params: { ...list } },
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    isVisible: false,
                    selectedRowKeys: null,
                    selectedItem: null
                });
                this.request();
            }
        });
    }

    render() {
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedItem: selectedRows[0]
                })
            }
        };

        return (
            <div>
                <Card className="card-wrapper">
                    <SimpleLogin />
                </Card>
                <Card className="card-wrapper">
                    <OperationButton createStaffInfo={() => this.operatingUserInfo('create')} editStaffInfo={() => this.operatingUserInfo('edit')}
                        searchStaffInfo={() => this.operatingUserInfo('search')} deleteStaffInfo={() => this.operatingUserInfo('delete')} />
                </Card>
                <Card className="card-wrapper">
                    <StaffInfoTable header={staffInfoHeader} data={this.state.dataList} pagination={this.state.pagination} onRowClick={this.setRowItem}
                        rowSelection={rowSelection}
                    />
                </Card>
                <OperatingUserModal title={this.state.modalTitle} visible={this.state.isVisible} cancelModal={this.cancelModal} type={this.state.type}
                    submit={this.handleSubmit} userInfo={this.state.selectedItem}
                />
            </div>
        );
    }
}

export { User };