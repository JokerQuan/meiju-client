import React, {Component} from 'react';
import {Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBrowserHistory } from "history";

import Home from "../../containers/home/home";
import Recommend from '../../containers/recommend/recommend';
import Category from "../../containers/category/category";
import Search from '../../containers/search/search'

import MenuBar from "../../components/menu_bar/menu_bar";
import UserMenu from "../../components/user_menu/user_menu";

import { getCategory, getUserCookie } from "../../redux/actions";

import './main.less';
import '../../common/common.less';
import { Layout, BackTop, Input, Divider, Icon, Avatar } from 'antd';
const { Header, Content, Footer } = Layout;
const history = createBrowserHistory();

let subTitle = '';

class Main extends Component {

    static propTypes = {
        category : PropTypes.object.isRequired
    }

    getSubTitle = (keys=[]) => {
        let _sunTitle = '';
        if (keys[0] === 'recommend') {
            _sunTitle = '站长推荐';
        }

        if (keys[0] === 'category') {
            const {category} = this.props;
            const categoryMap = {
                type : '分类',
                area : '地区',
                tags : '标签'
            };
            const categoryKey = keys[1] === 'tags' ? keys[1] : keys[1] + 's';
            _sunTitle = categoryMap[keys[1]] + '：' + category[categoryKey][keys[2]];
        }

        if (keys[0] === 'search') {
            _sunTitle = '搜索：' + decodeURI(keys[1]);
        }
        return _sunTitle;
    }

    componentDidMount () {
        this.props.getCategory();
        const minHeight = window.innerHeight - 64 - 72;
        document.getElementById('content_id').style.cssText=`min-height: ${minHeight}px;`;
        window.onresize = function(){
            const minHeight = window.innerHeight - 64 - 72;
            document.getElementById('content_id').style.cssText=`min-height: ${minHeight}px;`;
        }
        this.props.getUserCookie();
    }

    render() {
        const {category} = this.props;

        /**
         * 刷新时设置选中菜单
         */
        let defaultSelectedMenu = '';
        const keys = window.location.href.split('/');
        if (keys[3] === '') {
            defaultSelectedMenu = 'home';
        }
        if (keys[3] === 'recommend') {
            defaultSelectedMenu = 'recommend';
        }
        if (keys[3] === 'category') {
            defaultSelectedMenu = keys[4] + '-' + keys[5];
        }
        if (keys[3] === 'search') {
            defaultSelectedMenu = '';
        }

        /**
         * 设置子标题
         */
        keys.splice(0, 3);
        subTitle = this.getSubTitle(keys);

        history.listen((location) => {
            let keys = location.pathname.split('/');
            keys.splice(0, 1);
            subTitle = this.getSubTitle(keys);
            
            if (subTitle) {
                document.getElementById('h1_id').innerHTML = subTitle;
                document.getElementById('h1_id').style.cssText=`display: block;`;
                document.getElementById('divider_id').style.cssText=`display: block;`;
            } else {
                document.getElementById('h1_id').style.cssText=`display: none;`;
                document.getElementById('divider_id').style.cssText=`display: none;`;
            }
        });

        const isLogin = !!this.props.userCookie._id;

        return (
            <Router history={history}>
            <Layout className='layout'>
                <Header className='header'>
                    <Link className="logo" to='/'>
                    </Link>
                    <p className='slogen'>美剧一键下载</p>
                    <div className='menu-horizontal'>
                        <MenuBar menuMode='horizontal' category={category} defaultSelectedMenu={defaultSelectedMenu}></MenuBar>
                    </div>
                    <Icon className='menu-icon' type="menu" />
                    <div className='menu-vertical'>
                        <MenuBar menuMode='vertical' category={category} defaultSelectedMenu={defaultSelectedMenu}></MenuBar>
                    </div>
                    <div className='avatar-box'>
                        {
                            isLogin
                            ? <Avatar className='avatar' src={require(`../../assets/avatar/${isLogin ? this.props.userCookie.avatar : 1}.png`)} />
                            : <Avatar className='avatar' icon='user' />
                        }
                    </div>
                    <div className='user-menu-box'>
                        <UserMenu></UserMenu>
                    </div>
                    <Input.Search className='search'
                        placeholder="中文/英文/别名"
                        enterButton
                        size="large"
                        onSearch={value => {
                            if (!value) return;
                            history.push("/search/" + value);
                        }} />
                </Header>

                <Content id='content_id' className='content'>
                    <h1 id='h1_id' className='sub-title' style={{display: subTitle? 'block': 'none'}}>{subTitle}</h1>
                    <Divider id='divider_id' className='divider' style={{display: subTitle? 'block': 'none'}} />
                    <Switch>
                        <Route path='/recommend' component={Recommend}/>
                        <Route path='/category/:prop/:type' component={Category}/>
                        <Route path='/search/:keyword' component={Search}/>
                        <Route exact path='/' component={Home}/>
                        <Redirect path="*" to="/" />
                    </Switch>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    本站仅供学习使用！<br/>
                    数据来源：<a href='https://www.meijutt.com' rel='noopener noreferrer' target="_blank">美剧天堂</a>
                    &nbsp;&nbsp;&nbsp;
                    设计参考：<a href='http://ddrk.me' rel='noopener noreferrer' target="_blank">低端影视</a>
                </Footer>
            </Layout>
            <BackTop className='back-to-top' />
            </Router>
        )
    }
}

export default connect(
    state => ({
        category: state.category,
        userCookie : state.userCookie
    }),
    {getCategory, getUserCookie}
)(Main);