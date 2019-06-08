import React, { Component } from 'react';
import { connect } from "react-redux";
import {Pagination, Spin, Icon} from 'antd';

import { getMeijuList, getMeijuCount } from "../../redux/actions";
import MeijuList from '../../components/meiju_list/meiju_list'

class Home extends Component {

    componentDidMount () {
        this.props.getMeijuList('/api/meiju/0');
        this.props.getMeijuCount('/api/meijuCount');
    }

    onPageChange = (page) => {
        this.props.getMeijuList('/api/meiju/' + (page - 1));
        document.documentElement.scrollTop = 0;
    }

    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;
        return (
            <div className='list-container'>
                <Spin indicator={antIcon} className='spin' spinning={this.props.isLoading} size="large" />
                <MeijuList meijuList={this.props.meijuList} className='meiju-list'></MeijuList>
                <Pagination className='pagination'
                    total={this.props.meijuCount} 
                    pageSize={24} 
                    onChange={this.onPageChange}/>
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
)(Home);