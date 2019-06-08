import React, {Component} from 'react';
import { connect } from "react-redux";

import MeijuList from '../../components/meiju_list/meiju_list';
import { getMeijuList } from "../../redux/actions";

import { Spin, Icon } from "antd";

class Recommend extends Component {

    componentDidMount () {
        this.props.getMeijuList('/api/recommend');
    }

    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 34 }} spin />;
        return (
            <div className='list-container'>
                <Spin indicator={antIcon} className='spin' spinning={this.props.isLoading} size="large" />
                <MeijuList meijuList={this.props.meijuList}></MeijuList>
            </div>
        )
    }
}

export default connect(
    state => ({
        meijuList: state.meijuList,
        isLoading: state.isLoading
    }),
    {getMeijuList}
)(Recommend);