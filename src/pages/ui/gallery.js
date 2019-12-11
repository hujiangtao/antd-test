import React from 'react';
import { Card, Row, Col, Modal } from 'antd';

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        
        const count = 25;
        const imgs = [];
        for (let i = 1; i <= count; i++) {
            imgs.push(i + '.png');
        }
        
        let column = 6;
        const sortedImgs = [];
        for(let i = 0; i < column; i++){
            sortedImgs.push(imgs.filter((value, index) => index % column === i));
        }

        this.state = {
            modalVisible: false,
            sortedImgs
        };
    }

    openGallery = (imgSrc) => {
        this.setState({
            modalVisible: true,
            currentImg: '/gallery/' + imgSrc
        });
    }

    render() {
        const imgList = this.state.sortedImgs.map((list) => list.map((item) => 
                <Card key={item} className="card-gallery" onClick={() => this.openGallery(item)}
                    cover={ <img src={'/gallery/' + item} alt=""/> }
                >
                    <Card.Meta title="React admin" description="I love ant design." />
                </Card>

        ));
        const imgList1 = imgList.map((list, index) => <Col md={24 / imgList.length} key={'col' + index}>{list}</Col>);
        return (
            <div>
                <Row gutter="10">
                    {imgList1}
                </Row>
                <Modal visible={this.state.modalVisible} footer={null} className="modal-gallery"
                    onCancel={() => { this.setState( { modalVisible: false } ) } }
                >
                    <img src={this.state.currentImg} alt="" className="img-gallery"/>
                </Modal>
            </div>
        );

    }

}
