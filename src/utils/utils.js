import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default {
    formatDate() {
        let currentDate = new Date();
        return currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + (currentDate.getDay() + 1) + ' '
            + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
    },

    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current);
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total_count,
            showTotal: () => `共${data.result.total_count}条`,
            showQuickJumper: true
        }
    },

    getOptionList(data) {
        if(!data){
            return [];
        }

        let options = [];
        data.forEach(item => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        });

        return options;
    }
}