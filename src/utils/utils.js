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
    }
}