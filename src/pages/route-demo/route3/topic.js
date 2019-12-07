import React from 'react';
import { Link } from 'react-router-dom';

export default class Topic extends React.Component{
    render(){
        return (
            <div>
                This is topic page.
                <br/>
                <Link to="/topic/about/test-id">子路由1</Link>
                <br/>
                <Link to="/topic/about/456">子路由2</Link>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}