import React from 'react';

export default class Info extends React.Component{
    render(){
        return (
            <div>
                测试动态路由。
                value的值是：{this.props.match.params.value}
            </div>
        );
    }
}