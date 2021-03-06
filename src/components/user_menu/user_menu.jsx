import React, { Component } from 'react';
import { Menu, Modal, Avatar } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import store from '../../redux/store'

import LoginRegisterModal from '../login_register_modal/login_register_modal';
import { signOut } from "../../redux/actions";
import './user_menu.less'

class UserMenu extends Component {

    static propTypes = {
        defaultSelectedMenu : PropTypes.array.isRequired
    }

    handleMenuClick = ({key}) => {
        if (key === 'login') {
            const modal = Modal.info();
            modal.update({
                icon : null,
                okText : '暂不登录',
                okType : 'default',
                onOk : () => modal.destroy(),
                autoFocusButton : null,
                content : <LoginRegisterModal modal={modal} store={store}/>,
                centered : true,
                footer : null,
                width : '400px'
            });
        }

        if (key === 'sign-out') {
            const modal = Modal.confirm({
                autoFocusButton : 'ok',
                cancelText : '取消',
                content : '这么狠心，确认要退出吗？',
                title : '退出登录',
                okText : '确认',
                onCancel : () => modal.destroy(),
                onOk : this.props.signOut
            });
        }
    }

    render() {
        const isLogin = !!this.props.userCookie._id;
        return (
            <Menu className='user-menu'
                theme='dark'
                mode='horizontal'
                defaultSelectedKeys={this.props.defaultSelectedMenu}
                onClick={this.handleMenuClick}>
                <Menu.SubMenu
                    title={
                        isLogin
                        ? <Avatar className='avatar' src={require(`../../assets/avatar/${isLogin ? this.props.userCookie.avatar : 1}.png`)} />
                        : <Avatar className='avatar' icon='user' />
                    }
                    >
                    <Menu.Item key='login' style={{display: isLogin ? 'none' : 'block'}}>
                        {'登录/注册'}
                    </Menu.Item>
                    <Menu.Item key='star' style={{display: isLogin ? 'block' : 'none'}}>
                        <Link to='/favorates'>{'我的收藏'}</Link>
                    </Menu.Item>
                    <Menu.Item key='statistics'>
                        <Link to='/statistics'>{'数据统计'}</Link>
                    </Menu.Item>
                    <Menu.Item key='about'>
                        <Link to='/about'>{'关于本站'}</Link>
                    </Menu.Item>
                    <Menu.Item key='sign-out' style={{display: isLogin ? 'block' : 'none'}}>
                        {'退出登录'}
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );
    }
}

export default connect(
    state => ({
        userCookie : state.userCookie
    }),
    {signOut}
)(UserMenu);