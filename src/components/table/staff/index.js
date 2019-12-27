import React from 'react';
import { Table } from 'antd';
import './staff.less';

class StaffInfoTable extends React.Component {

    rowClick = (record, index) => {
        return {
            onClick: () => {
                this.props.onRowClick(record, index);
            }
        }
    }

    render() {
        return (
            <div>
                <Table columns={this.props.header} dataSource={this.props.data} rowSelection={this.props.rowSelection}
                    pagination={this.props.pagination} onRow={this.rowClick}
                />
            </div>
        );
    }
}

export { StaffInfoTable };