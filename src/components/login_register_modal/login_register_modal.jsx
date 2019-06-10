import React, { Component } from 'react';
import { Tabs, Input, Button, Icon, message, Tooltip} from 'antd';
import { connect } from "react-redux";

import './login_register_modal.less'

import { queryUserExist, register } from "../../redux/actions";
import validation from "../../utils/validation";

const { TabPane } = Tabs;

let timeoutId;
let isInit = true;

class LoginRegisterModal extends Component {

    state = {
        loginUsername : '',
        loginPassword : '',
        registerUsername : '',
        registerPssword : ''
    }

    componentDidUpdate () {
        isInit = false;
    }

    handleRegister = () => {
        const username = this.state.registerUsername;
        const password = this.state.registerPssword;

        let checkResult = validation.checkUsername(username);
        if (checkResult !== true) {
            message.error(checkResult);
            return;
        }
        checkResult = validation.checkPassword(password);
        if (checkResult !== true) {
            message.error(checkResult);
            return;
        }
        this.props.register({
            username,
            password
        });
    }

    handleChange = (type, e) => {
        const {value} = e.target;
        this.setState({
            [type] : value
        });

        if (type !== 'registerUsername') return;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const checkResult = validation.checkUsername(value);
        if (checkResult === true) {
            timeoutId = setTimeout(() => {
                this.props.queryUserExist(value);
            }, 1000);
        }
    }

    render() {
        return (
            <Tabs className='tabs'>
                <TabPane className='tab-pane' tab="登录" key="login">
                    <Input className='input' placeholder="用户名" allowClear 
                        onChange={e => {this.handleChange('loginUsername', e)}}
                    />
                    <br/>
                    <Input.Password className='input password' placeholder="密码" allowClear 
                        onChange={e => {this.handleChange('loginPassword', e)}}
                    />
                    <Button className='input button' type='primary'>{'登录'}</Button>
                </TabPane>

                <TabPane className='tab-pane' tab="注册" key="register">
                    <Input className='input' placeholder="用户名：数字和字母，区分大小写！" allowClear 
                        onChange={e => {this.handleChange('registerUsername', e)}}
                    />
                    <Icon style={{display : this.props.userExistLoading ? 'inline-block' : 'none'}} 
                        className='icon' type="loading" />
                    <Icon style={{display : this.props.userExistLoading || this.props.userExist ? 'none' : 'inline-block'}} 
                        className='icon' type="check-circle" />
                    <Tooltip title='用户名已存在！'>
                    <Icon style={{display : isInit || this.props.userExistLoading || !this.props.userExist ? 'none' : 'inline-block'}} 
                        className='icon error' type="close-circle" />
                    </Tooltip>
                    <br/>
                    <Input.Password className='input password' placeholder="密码：5~16位，不能包含空格！" allowClear
                        onChange={e => {this.handleChange('registerPssword', e)}}
                    />
                    <Button className='input button' type='primary' onClick={this.handleRegister}>{'注册'}</Button>
                </TabPane>
            </Tabs>
        );
    }
}

export default connect(
    state => ({
        userExist: state.userExist,
        userExistLoading : state.userExistLoading
    }),
    {queryUserExist, register}
)(LoginRegisterModal);