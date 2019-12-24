import React from 'react';
import { Card, Row, Col } from 'antd';
import './detail.less'
import axios from '../../axios';

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        let orderId = this.props.match.params.orderId;
        if(orderId){
            this.getDetailInfo(orderId);
        }
    }

    getDetailInfo = (orderId) => {
        axios.ajax({
            url: 'order/detail',
            data: { params: { orderId: orderId } }
        }).then((res) => {
            if(res.code === 0){
                this.setState({ orderInfo: res.result });
                this.renderMap(res.result);
            }
        });
    }  

    renderMap = (result)=>{
        this.map = new window.BMap.Map('orderDetailMap');
        this.map.centerAndZoom('北京',11);
        // 添加地图控件
        this.addMapControl();
        // 调用路线图绘制方法
        this.drawBikeRoute(result.position_list);
        // 调用服务区绘制方法
        this.drwaServiceArea(result.area);
    }

    // 添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }

    // 绘制服务区
    drwaServiceArea = (positionList)=>{
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon);
    }

    // 绘制用户的行驶路线
    drawBikeRoute = (positionList)=>{
        // let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length>0){
            let first = positionList[0];
            let last = positionList[positionList.length-1];
            startPoint = new window.BMap.Point(first.lon,first.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(18, 42)
            })

            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon});
            this.map.addOverlay(startMarker);

            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);

            // 连接路线图
            let trackPoint = [];
            for(let i=0;i<positionList.length;i++){
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat));
            }

            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11);
        }
        
    }

    render() {
        const info = this.state.orderInfo || {}

        return (
            <div>
                <Card className="card-wrap" bordered={false}>
                    <div id="orderDetailMap" className="order-map"></div>
                </Card>
                <Card title="基础信息" className="card-wrap" bordered={false}>
                    <Row gutter={32}>
                        <Col span={6} className="detail-title">用车模式</Col>
                        <Col span={18} className="detail-content">{info.mode === 1 ? '服务区' : '停车点'}</Col>
                    </Row>
                    <Row gutter={32}>
                        <Col span={6} className="detail-title">订单编号</Col>
                        <Col span={18} className="detail-content">{info.order_sn}</Col>
                    </Row>
                    <Row gutter={32}>
                        <Col span={6} className="detail-title">车辆编号</Col>
                        <Col span={18} className="detail-content">{info.bike_sn}</Col>
                    </Row>
                    <Row gutter={32}>
                        <Col span={6} className="detail-title">用户姓名</Col>
                        <Col span={18} className="detail-content">{info.user_name}</Col>
                    </Row>
                    <Row gutter={32}>
                        <Col span={6} className="detail-title">手机号码</Col>
                        <Col span={18} className="detail-content">{info.mobile}</Col>
                    </Row>
                </Card>
                <Card title="行驶轨迹" className="card-wrap" bordered={false}>
                    <Row gutter={32}>
                        <Col span={6} className="detail-title">行程起点</Col>
                        <Col span={18} className="detail-content">{info.start_location}</Col>
                    </Row>
                    <Row gutter={32}>
                        <Col span={6} className="detail-title">行程终点</Col>
                        <Col span={18} className="detail-content">{info.end_location}</Col>
                    </Row>
                    <Row gutter={32}>
                        <Col span={6} className="detail-title">行驶里程</Col>
                        <Col span={18} className="detail-content">{info.distance/1000}公里</Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export { OrderDetail }