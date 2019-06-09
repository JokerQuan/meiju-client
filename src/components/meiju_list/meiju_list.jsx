import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Modal } from "antd";

import './meiju_list.less';

import MeijuDetail from "../meiju_detail/meiju_detail";

class MeijuList extends Component {

    static propTypes = {
        meijuList : PropTypes.array.isRequired
    }

    detailsDialog = (meiju) => {
        Modal.info({
            icon : null,
            className : 'modal',
            okText : '关闭',
            content : <MeijuDetail meiju={meiju} />,
            centered : true,
            maskClosable : true,
            width : 'auto'
        });
    }

    render() {
        const {meijuList} = this.props;
        return (
            <div className='cards-container'>
                <Row gutter={60} type="flex" align="bottom">
                    {
                        meijuList.map((meiju) => (
                            <Col className='col'
                                    key={meiju._id} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
                                <div className='shadow-out'>
                                    <div className='card card-shadow' onClick={this.detailsDialog.bind(this, meiju)}
                                        style={{backgroundImage: `url(${meiju.pic_url})`}}
                                        >
                                        <div className='empty'></div>
                                        <div className='content-box'>
                                            <span className='categories'>{meiju.area+' '+meiju.type}</span><br/>
                                            <span className='categories'>{'标签：' +meiju.tags}</span>
                                            <h2 className='title'>{meiju.title}</h2>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                        
                    }
                </Row>
            </div>
        );
    }
}

export default MeijuList;