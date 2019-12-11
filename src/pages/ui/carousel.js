import React from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';

export default class Carousels extends React.Component {
    render() {
        return (
            <div>
                <Card title="文字背景轮播" className="card card-wrap">
                    <Carousel autoplay>
                        <div>
                            <h3>业精于勤荒于嬉</h3>
                        </div>
                        <div>
                            <h3>学无止境</h3>
                        </div>
                        <div>
                            <h3>学如逆水行舟</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="图片背景轮播" className="card card-wrap slider-wrap">
                    <Carousel autoplay>
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt="" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt="" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}