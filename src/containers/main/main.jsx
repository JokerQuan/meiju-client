import React, {Component} from 'react';
import {Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBrowserHistory } from "history";

import Home from "../../containers/home/home";
import Recommend from '../../containers/recommend/recommend';
import Category from "../../containers/category/category";
import Search from '../../containers/search/search'

import { getCategory } from "../../redux/actions";

import './main.less';
import '../../common/common.less';
import { Layout, Menu, BackTop, Input, Divider } from 'antd';
const { Header, Content, Footer } = Layout;
const {SubMenu} = Menu;
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
        const minHeight = window.innerHeight - 64 - 69;
        document.getElementById('content_id').style.cssText=`min-height: ${minHeight}px;`;
        window.onresize = function(){
            const minHeight = window.innerHeight - 64 - 69;
            document.getElementById('content_id').style.cssText=`min-height: ${minHeight}px;`;
        }
    }

    render() {
        const {category} = this.props;

        /**
         * 刷新时设置选中菜单
         */
        let defaultSelectedMenu = 'home';
        const keys = window.location.href.split('/');
        if (keys[3]) {
            if (keys[3] === 'recommend') {
                defaultSelectedMenu = 'recommend';
            } else {
                defaultSelectedMenu = keys[4] + '-' + keys[5];
            }
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

        return (
            <Router history={history}>
            <Layout className='layout'>
                <Header>
                    <Link className="logo" to='/'>
                    </Link>
                    <p className='slogen'>美剧一键下载</p>
                    <Menu
                    className='menu'
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[defaultSelectedMenu]}
                    style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="home">
                            <Link to='/'>首页</Link>
                        </Menu.Item>
                        <Menu.Item key="recommend">
                            <Link to='/recommend'>推荐</Link>
                        </Menu.Item>
                        <SubMenu title='分类'>
                            {
                                category.types.map((type, index) => (
                                    <Menu.Item key={'type-'+index}>
                                        <Link to={'/category/type/' + index}>{type}</Link>
                                    </Menu.Item>
                                ))
                            }
                        </SubMenu>
                        <SubMenu title='地区'>
                            {
                                category.areas.map((area, index) => (
                                    <Menu.Item key={'area-'+index}>
                                        <Link to={'/category/area/' + index}>{area}</Link>
                                    </Menu.Item>
                                ))
                            }
                        </SubMenu>
                        <SubMenu title='标签' className='menu-box'>
                            {
                                category.tags.map((tag, index) => (
                                    <Menu.Item key={'tags-'+index}>
                                        <Link to={'/category/tags/' + index}>{tag}</Link>
                                    </Menu.Item>
                                ))
                            }
                        </SubMenu>
                    </Menu>

                    <Input.Search className='search'
                        placeholder="请输入中文名/英文名/别名"
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
                    本站仅供学习使用！数据来源：
                    <a href='https://www.meijutt.com' target="view_window">美剧天堂</a>
                    &nbsp;&nbsp;&nbsp;
                    设计参考：<a href='http://ddrk.me' target="view_window">低端影视</a>
                </Footer>
            </Layout>
            <BackTop className='back-to-top' />
            </Router>
        )
    }
}

export default connect(
    state => ({category: state.category}),
    {getCategory}
)(Main);