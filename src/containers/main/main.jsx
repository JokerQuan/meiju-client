import React, {Component} from 'react';
import {Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBrowserHistory } from "history";

import Home from "../../containers/home/home";
import Recommend from '../../containers/recommend/recommend';
import Category from "../../containers/category/category";
import Search from '../../containers/search/search';
import MyFavorates from '../../containers/my-favorates/my-favorates';
import DataStatistics from '../../containers/data_statistics/data_statistics';
import About from '../../containers/about/about';

import MenuBar from "../../components/menu_bar/menu_bar";
import UserMenu from "../../components/user_menu/user_menu";

import { getCategory, getUserCookie, getClientIP } from "../../redux/actions";

import './main.less';
import '../../common/common.less';
import { Layout, BackTop, Input, Divider } from 'antd';
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

        if (keys[0] === 'favorates') {
            _sunTitle = '我的收藏';
        }

        if (keys[0] === 'about') {
            _sunTitle = '关于本站';
        }

        if (keys[0] === 'statistics') {
            _sunTitle = '数据统计';
        }
        return _sunTitle;
    }

    setContentMinHeight = () => {
        const minHeight = window.innerHeight - 64 - 51;
        document.getElementById('content_id').style.cssText=`min-height: ${minHeight}px;`;
    }

    componentDidMount () {
        this.props.getCategory();
        this.setContentMinHeight();
        window.onresize = () => {
            this.setContentMinHeight();
        }
        this.props.getUserCookie();
        this.props.getClientIP();
    }

    render() {
        const {category} = this.props;

        /**
         * 刷新时设置选中菜单
         */
        let defaultSelectedMenu = [];
        const keys = window.location.href.split('/');
        if (keys[3] === '') {
            defaultSelectedMenu = ['home'];
        }
        if (keys[3] === 'recommend') {
            defaultSelectedMenu = ['recommend'];
        }
        if (keys[3] === 'category') {
            defaultSelectedMenu = [keys[4], keys[4] + '-' + keys[5]];
        }
        if (keys[3] === 'search') {
            defaultSelectedMenu = [''];
        }
        if (keys[3] === 'about') {
            defaultSelectedMenu = ['about'];
        }
        if (keys[3] === 'favorates') {
            defaultSelectedMenu = ['favorates'];
        }
        if (keys[3] === 'statistics') {
            defaultSelectedMenu = ['statistics'];
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

        // const isLogin = !!this.props.userCookie._id;

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
                    <div className='menu-vertical'>
                        <MenuBar menuMode='vertical' category={category} defaultSelectedMenu={defaultSelectedMenu}></MenuBar>
                    </div>
                    <div className='user-menu-box'>
                        <UserMenu defaultSelectedMenu={defaultSelectedMenu}></UserMenu>
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
                    <Divider id='divider_id' style={{display: subTitle? 'block': 'none'}} />
                    <Switch>
                        <Route path='/recommend' component={Recommend}/>
                        <Route path='/category/:prop/:type' component={Category}/>
                        <Route path='/search/:keyword' component={Search}/>
                        <Route path='/favorates' component={MyFavorates}/>
                        <Route path='/statistics' component={DataStatistics}/>
                        <Route path='/about' component={About}/>
                        <Route exact path='/' component={Home}/>
                        <Redirect path="*" to="/" />
                    </Switch>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    本站仅供学习使用！
                    数据来源：<a href='https://www.meijutt.com' rel='noopener noreferrer' target="_blank">美剧天堂</a>
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
    {getCategory, getUserCookie, getClientIP}
)(Main);