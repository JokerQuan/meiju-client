import React, { Component } from 'react';
import { Menu, Modal } from "antd";
import { Link } from "react-router-dom";

import store from '../../redux/store'
import LoginRegisterModal from '../login_register_modal/login_register_modal';

import './user_menu.less'

class UserMenu extends Component {

    handleMenuClick = ({key}) => {
        if (key === 'login') {
            const modal = Modal.info({
                icon : null,
                okText : '暂不登录',
                okType : 'default',
                onOk : () => modal.destroy(),
                autoFocusButton : null,
                content : <LoginRegisterModal store={store}/>,
                centered : true,
                footer : null,
                width : '400px'
            });
        }
    }

    render() {
        return (
            <Menu className='user-menu'
                theme='dark'
                mode='vertical'
                onClick={this.handleMenuClick}>
                <Menu.Item key='login'>{'登录/注册'}</Menu.Item>
                <Menu.Item key='about'>
                    <Link to='/about'>{'关于本站'}</Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default UserMenu;