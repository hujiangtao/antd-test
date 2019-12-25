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

export { OrderTableHeader, formList };