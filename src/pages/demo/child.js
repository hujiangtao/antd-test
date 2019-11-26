import React from 'react';

export default class Child extends React.Component{
    constructor(props){
        super(props);
        this.state = { count: 0 };
    }

    componentDidMount(){
        console.log("Did mount");
    }

    componentDidUpdate(){
        console.log("did update");
    }

    componentWillUnmount(){
        console.log("will unmount");
    }

    shouldComponentUpdate(){
        console.log("should component update");
        return true;
    }

    render(){
        return (
            <div>
                <p>测试生命周期：{this.props.name}</p>
            </div>
        );
    }
}