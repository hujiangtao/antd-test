export default {
    formatDate(){
        let currentDate = new Date();
        return currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + (currentDate.getDay() + 1) + ' ' 
        + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
    }
}