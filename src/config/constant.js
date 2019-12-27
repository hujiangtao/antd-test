const OrderTableHeader = [{
    title: '订单编号',
    dataIndex: 'order_sn'
}, {
    title: '车辆编号',
    dataIndex: 'bike_sn'
}, {
    title: '用户名',
    dataIndex: 'user_name'
}, {
    title: '手机号',
    dataIndex: 'mobile'
}, {
    title: '里程',
    dataIndex: 'distance'
}, {
    title: '行驶时长',
    dataIndex: 'total_time'
}, {
    title: '状态',
    dataIndex: 'status'
}, {
    title: '开始时间',
    dataIndex: 'start_time'
}, {
    title: '结束时间',
    dataIndex: 'end_time'
}, {
    title: '订单金额',
    dataIndex: 'total_fee'
}, {
    title: '实付金额',
    dataIndex: 'user_pay'
}];

const formList = [
    {
        type: 'SELECT',
        label: '城市',
        field: 'city',
        placeholder: '全部',
        initialValue: 's1',
        width: 80,
        list: [{ id: 's0', name: '全部' }, { id: 's1', name: '北京' }, { id: 's2', name: '天津' }, { id: 's3', name: '上海' }]
    },
    {
        type: '时间查询',
        field: 'time',
    },
    {
        type: 'SELECT',
        label: '订单状态',
        field: 'order_status',
        placeholder: '全部',
        initialValue: 's1',
        width: 80,
        list: [{ id: 's0', name: '全部' }, { id: 's1', name: '进行中' }, { id: 's2', name: '结束行程' }]
    }
]

const staffInfoHeader = [{
    title: 'id',
    dataIndex: 'id'
}, {
    title: '用户名',
    dataIndex: 'userName'
}, {
    title: '性别',
    dataIndex: 'sex',
    render(sex) {
        return sex === 1 ? '男' : '女'
    }
},{
    title: '婚否',
    dataIndex: 'isMarried',
    render(isMarried) {
        return isMarried === 0 ? '未婚' : '已婚'
    }
}, {
    title: '状态',
    dataIndex: 'state',
    render(state) {
        let config = {
            '1': '上学中',
            '2': '工作中',
            '3': '待业中',
            '4': '创业中'
        };
        return config[state];
    }
}, {
    title: '爱好',
    dataIndex: 'interest',
    render(interest) {
        let config = {
            '1': '唱歌',
            '2': '足球',
            '3': '摄影',
            '4': '书法',
            '5': '弹钢琴',
            '6': '爬山',
            '7': '旅游',
            '8': '睡觉'
        };
        return config[interest];
    }
}, {
    title: '生日',
    dataIndex: 'birthday'
}, {
    title: '地址',
    dataIndex: 'address'
}, {
    title: '早起时间',
    dataIndex: 'time'
}
]

export { OrderTableHeader, formList, staffInfoHeader };