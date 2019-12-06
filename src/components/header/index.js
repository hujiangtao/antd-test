/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Row, Col } from 'antd';
import Util from '../../utils/utils';
import axios from '../../axios';
import './index.less';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '管理员',
        };

        setInterval(() => {
            let time = Util.formatDate();
            this.setState({ sysTime: time })
        }, 1000);
        this.getWeatherApiData();
    }

    getWeatherApiData() {
        let city = "珠海市";
        axios.jsonp({
            url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=2937ac9f98d40e3523fabd1948961a4a&city=' + encodeURIComponent(city)
        }).then((res) => {
            if (res.status === "1") {
                debugger;
                let weatherData = res.lives[0];
                this.setState({
                    weather: weatherData.weather,
                    temperature: weatherData.temperature
                });
            }
        });
    }

    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">首页</Col>
                    <Col span={20} className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                        <span className="weather-temperature">
                            {this.state.temperature}&#8451;
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}