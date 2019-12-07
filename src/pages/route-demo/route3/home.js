import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Home2</Link></li>
                    <li><Link to="/about">About2</Link></li>
                    <li><Link to="/topic">Topic2</Link></li>
                    <li><Link to="/imooc1">iMooc1</Link></li>
                    <li><Link to="/imooc2">iMooc2</Link></li>
                </ul>
                <hr />
                {this.props.children}
            </div>
        );
    }
}