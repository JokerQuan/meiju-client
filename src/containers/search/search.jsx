import React, { Component } from 'react';
import { connect } from "react-redux";
import {Pagination, Spin, Icon} from 'antd';

import { getMeijuList, getMeijuCount } from "../../redux/actions";
import MeijuList from '../../components/meiju_list/meiju_list'

class Search extends Component {

    componentDidMount () {
        const {keyword} = this.props.match.params;
        this.customState = {
            keyword
        };
        this.props.getMeijuList(`/api/search/${keyword}/0`);
        this.props.getMeijuCount(`/api/search/${keyword}/count/`);
    }

    componentDidUpdate () {
        const {keyword} = this.props.match.params;
        if (this.customState.keyword !== keyword) {
            this.props.getMeijuList(`/api/search/${keyword}/0`);
            this.props.getMeijuCount(`/api/search/${keyword}/count/`);
            this.customState.keyword = keyword;
        }
    }

    onPageChange = (page) => {
        const {keyword} = this.props.match.params;
        this.props.getMeijuList(`/api/search/${keyword}/${page - 1}`);
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
        );
    }
}

export default connect(
    state => ({
        meijuList: state.meijuList,
        meijuCount : state.meijuCount,
        isLoading: state.isLoading
    }),
    {getMeijuList, getMeijuCount}
)(Search);