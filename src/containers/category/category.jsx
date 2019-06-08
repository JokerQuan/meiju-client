import React, {Component} from 'react';
import { connect } from "react-redux";
import {Pagination, Spin, Icon} from 'antd';

import { getMeijuList, getMeijuCount } from "../../redux/actions";

import MeijuList from "../../components/meiju_list/meiju_list";

class Category extends Component {

    componentDidMount () {
        this.customState = {};
        this.customState.prop = this.props.match.params.prop;
        this.customState.type = this.props.match.params.type;
        this.props.getMeijuList(`/api/category/${this.customState.prop}/${this.customState.type}/0`);
        this.props.getMeijuCount(`/api/category/${this.customState.prop}/${this.customState.type}/count`);
    }

    componentDidUpdate () {
        const {prop, type} = this.props.match.params;
        if (this.customState.prop !== prop || this.customState.type !== type) {
            this.props.getMeijuList(`/api/category/${prop}/${type}/0`);
            this.props.getMeijuCount(`/api/category/${prop}/${type}/count`);
            this.customState.prop = prop;
            this.customState.type = type;
        }
    }

    onPageChange = (page) => {
        const {prop, type} = this.props.match.params;
        this.props.getMeijuList(`/api/category/${prop}/${type}/${page-1}`);
        document.documentElement.scrollTop = 0;
    }

    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;
        return (
            <div className='list-container'>
                <Spin indicator={antIcon} className='spin' spinning={this.props.isLoading} size="large" />
                <MeijuList meijuList={this.props.meijuList} className='meiju-list'></MeijuList>
                {
                    this.props.meijuCount > 24 ?
                    <Pagination className='pagination'
                    total={this.props.meijuCount} 
                    pageSize={24} 
                    onChange={this.onPageChange}/> :
                    null
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        meijuList: state.meijuList,
        meijuCount : state.meijuCount,
        isLoading: state.isLoading
    }),
    {getMeijuList, getMeijuCount}
)(Category)