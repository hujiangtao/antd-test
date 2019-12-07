import React from 'react';
import { Link } from 'react-router-dom';

export default class Topic extends React.Component{
    render(){
        return (
            <div>
                This is topic page.
                <Link to="/topic/about">子路由</Link>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}