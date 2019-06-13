import React, { Component } from 'react';
import { connect } from "react-redux";
import { Icon, Spin, Pagination } from "antd";
import { Redirect } from "react-router-dom";

import { getMeijuCount, getMeijuList } from "../../redux/actions";
import MeijuList from "../../components/meiju_list/meiju_list";

class MyFavorates extends Component {

    componentDidMount () {
        this.props.getMeijuCount('/api/favoratesCount');
        this.props.getMeijuList('/api/favorates/0');
    }

    onPageChange = (page) => {
        this.props.getMeijuList('/api/favorates/' + (page - 1));
        document.documentElement.scrollTop = 0;
    }

    render() {
        const isLogin = !!this.props.userCookie._id;
        if (!isLogin) {
            return (
                <Redirect to='/'></Redirect>
            )
        }
        const antIcon = <Icon type="loading" style={{ fontSize: 34 }} spin />;
        return (
            <div className='list-container'>
                <Spin indicator={antIcon} className='spin' spinning={this.props.isLoading} size="large" />
                <MeijuList meijuList={this.props.meijuList}></MeijuList>
                <Pagination className='pagination'
                    total={this.props.meijuCount} 
                    pageSize={24} 
                    onChange={this.onPageChange}
                    hideOnSinglePage={true}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        meijuCount: state.meijuCount,
        meijuList: state.meijuList,
        isLoading: state.isLoading,
        userCookie: state.userCookie
    }),
    {getMeijuCount, getMeijuList}
)(MyFavorates);