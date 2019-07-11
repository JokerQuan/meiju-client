import React, { Component } from 'react';
import { connect } from "react-redux";
import {Pagination, Spin, Icon, Collapse, Tag} from 'antd';

import { getMeijuList, getMeijuCount, setFilter } from "../../redux/actions";
import MeijuList from '../../components/meiju_list/meiju_list'

import './home.less';

class Home extends Component {

    state = {
        type : '',
        area : '',
        tags : [],
        year : ''
    }

    colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan',
        'blue', 'geekblue', 'purple'];

    componentDidMount () {
        const paramsObj = this.getFilterParams();
        this.props.getMeijuList('/api/meiju/0', paramsObj);
        this.props.getMeijuCount('/api/meijuCount', paramsObj);
        this.setState(this.props.filter)
    }

    onPageChange = (page) => {
        this.props.getMeijuList('/api/meiju/' + (page - 1), this.getFilterParams());
        document.documentElement.scrollTop = 0;
    }

    getFilterParams = () => {
        let paramsObj = {};
        const {filter} = this.props;
        if (filter.type !== '') {
            paramsObj.type = filter.type;
        }
        if (filter.area !== '') {
            paramsObj.area = filter.area;
        }
        if (filter.tags.length > 0) {
            paramsObj.tags = filter.tags.join(',');
        }
        if (filter.year !== '') {
            if (filter.year === '90年代') {
                paramsObj.year = '199';
            } else if (filter.year === '80年代') {
                paramsObj.year = '198';
            } else {
                paramsObj.year = filter.year;
            }
        }
        return paramsObj;
    }

    filterChange = () => {
        const paramsObj = this.getFilterParams();
        this.props.getMeijuList('/api/meiju/0', paramsObj);
        this.props.getMeijuCount('/api/meijuCount', paramsObj);
    }

    tagClick = (filter, value) => {
        let obj = {};
        if (filter === 'tags') {
            obj[filter] = this.state.tags;
            if (this.state.tags.indexOf(value) === -1) {
                obj[filter].push(value);
            } else {
                obj[filter].splice(this.state.tags.indexOf(value), 1);
            }
        } else {
            if (this.state[filter] === value) {
                obj[filter] = '';
            } else {
                obj[filter] = value;
            }
        }
        this.setState(obj)
        this.props.setFilter(obj);
        this.filterChange();
    }

    resetTags = e => {
        e.stopPropagation();
        const obj = {
            type : '',
            area : '',
            tags : [],
            year : ''
        }
        this.setState(obj);
        this.props.setFilter(obj);
        this.filterChange();
    }

    tagClose = (e, filter, value) => {
        e.stopPropagation();
        let obj = {}
        if (filter === 'tags') {
            obj[filter] = this.state.tags;
            obj[filter].splice(this.state.tags.indexOf(value), 1);
        } else {
            obj[filter] = '';
        }
        this.setState(obj);
        this.props.setFilter(obj);
        this.filterChange();
    }

    getTags = () => {
        let tags = [];
        if (this.state.type !== '') {
            tags.push(
                <Tag  key='filter-type'
                    color={this.colors[Math.floor((Math.random() * this.colors.length))]}
                    closable='true'
                    onClose={e => this.tagClose(e, 'type', this.state.type)}
                    >
                    {this.state.type}
                </Tag>
            );
        }
        if (this.state.area !== '') {
            tags.push(
                <Tag key='filter-area'
                    color={this.colors[Math.floor((Math.random() * this.colors.length))]}
                    closable='true'
                    onClose={e => this.tagClose(e, 'area', this.state.area)}
                    >
                    {this.state.area}
                </Tag>
            );
        }
        if (this.state.tags.length > 0) {
            this.state.tags.map((tag, index) => {
                tags.push(
                    <Tag key={'filter-tags' + index} 
                        color={this.colors[Math.floor((Math.random() * this.colors.length))]}
                        closable='true'
                        onClose={e => this.tagClose(e, 'tags', tag)}
                        >
                        {tag}
                    </Tag>
                );
                return tag;
            });
        }
        if (this.state.year !== '') {
            tags.push(
                <Tag key='filter-year'
                    color={this.colors[Math.floor((Math.random() * this.colors.length))]}
                    closable='true'
                    onClose={e => this.tagClose(e, 'year', this.state.year)}
                    >
                    {this.state.year}
                </Tag>
            );
        }
        return tags;
    }

    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;

        let years = [];
        for(let i = 2019; i >= 2000; i--){
            years.push(i + '');
        }
        years.push('90年代');
        years.push('80年代');

        return (
            <div className='list-container'>
                <Spin indicator={antIcon} className='spin' spinning={this.props.isLoading} size="large" />
                <Collapse className='collapse'>
                    <Collapse.Panel 
                        extra={<span onClick={this.resetTags}>重置</span>}
                        header={
                            <span>
                            <span>过滤</span>
                                <div className='header-tags'>
                                    {this.getTags()}
                                </div>
                            </span>
                        } 
                        key="filter">
                        <table>
                            <tbody>
                            <tr>
                                <td nowrap="nowrap" valign="top">
                                    <span style={{color:'aliceblue'}}>分类：</span>
                                </td>
                                <td>
                                    {
                                        this.props.category.types.map((type, index) => (
                                            <Tag key={index} 
                                                color={
                                                    this.state.type === type
                                                    ?
                                                    this.colors[Math.floor((Math.random() * this.colors.length))]
                                                    :
                                                    ''
                                                }
                                                onClick={() => this.tagClick('type', type)}>
                                                {type}
                                            </Tag>
                                        ))
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td nowrap="nowrap" valign="top">
                                    <span style={{color:'aliceblue'}}>地区：</span>
                                </td>
                                <td>
                                    {
                                        this.props.category.areas.map((area, index) => (
                                            <Tag key={index} 
                                                color={
                                                    this.state.area === area
                                                    ?
                                                    this.colors[Math.floor((Math.random() * this.colors.length))]
                                                    :
                                                    ''
                                                }
                                                onClick={() => this.tagClick('area', area)}>
                                                {area}
                                            </Tag>
                                        ))
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td nowrap="nowrap" valign="top">
                                    <span style={{color:'aliceblue'}}>标签（可多选）：</span>
                                </td>
                                <td>
                                    {
                                    this.props.category.tags.map((tag, index) => (
                                        <Tag key={index} 
                                            color={
                                                this.state.tags.indexOf(tag) !== -1
                                                ?
                                                this.colors[Math.floor((Math.random() * this.colors.length))]
                                                :
                                                ''
                                            }
                                            onClick={() => this.tagClick('tags', tag)}>
                                            {tag}
                                        </Tag>
                                    ))
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td nowrap="nowrap" valign="top">
                                    <span style={{color:'aliceblue'}}>年份：</span>
                                </td>
                                <td>
                                    {
                                    years.map((year, index) => (
                                        <Tag key={index} 
                                            color={
                                                this.state.year === year
                                                ?
                                                this.colors[Math.floor((Math.random() * this.colors.length))]
                                                :
                                                ''
                                            }
                                            onClick={() => this.tagClick('year', year)}>
                                            {year}
                                        </Tag>
                                    ))
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Collapse.Panel>
                </Collapse>
                <MeijuList meijuList={this.props.meijuList} className='meiju-list'></MeijuList>
                <Pagination className='pagination'
                    total={this.props.meijuCount} 
                    hideOnSinglePage={true}
                    pageSize={24} 
                    onChange={this.onPageChange}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        filter : state.filter,
        category: state.category,
        meijuList: state.meijuList,
        meijuCount : state.meijuCount,
        isLoading: state.isLoading
    }),
    {getMeijuList, getMeijuCount, setFilter}
)(Home);