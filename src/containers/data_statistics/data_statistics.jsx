import React, { Component } from 'react';
import { Col, Row } from "antd";
import { connect } from "react-redux";

import Charts from '../../components/charts/charts';
import {getStatistics} from '../../redux/actions';

class DataStatistics extends Component {

    componentDidMount () {
        this.props.getStatistics('type');
        this.props.getStatistics('area');
        this.props.getStatistics('tags');
    }

    render() {
        let chartsData = [];

        //分类
        const typeData = this.props.statistics.typeData.map(type => (
            {genre: type.type, sold: type.count}
        ));
        const typeCols = {
            sold : { alias: '单位：部' },
            genre : { alias: '按分类统计' }
        };
        chartsData.push({key:'type', data:typeData, scale:typeCols});

        //地区
        const areaData = this.props.statistics.areaData.map(area => (
            {genre: area.area, sold: area.count}
        ));
        const areaCols = {
            sold : { alias: '单位：部' },
            genre : { alias: '按地区统计' }
        };
        chartsData.push({key:'area', data:areaData, scale:areaCols});

        //标签
        const tagsData = this.props.statistics.tagsData.map(tag => (
            {genre: tag.tag, sold: tag.count}
        ));
        const tagsCols = {
            sold : { alias: '单位：部' },
            genre : { alias: '按标签统计' }
        };
        chartsData.push({key:'tags', data:tagsData, scale:tagsCols});

        return (
            <Row gutter={60} type="flex" align="bottom">
                {
                    chartsData.map(charts => (
                        <Col key={charts.key} xs={24} sm={24} md={24} 
                                lg={charts.key==='tags'?24:12} 
                                xl={charts.key==='tags'?24:12} 
                                xxl={charts.key==='tags'?24:12}>
                            <Charts {...charts}></Charts>
                        </Col>
                    ))
                }
            </Row>
        );
    }
}

export default connect(
    state => ({
        statistics : state.statistics
    }),
    {getStatistics}
)(DataStatistics);