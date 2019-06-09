import React, { Component } from 'react';
import PropTypes from "prop-types";

import { Menu } from "antd";
import { Link } from "react-router-dom";

const {SubMenu} = Menu;

class MenuBar extends Component {

    static propTypes = {
        category : PropTypes.object.isRequired,
        defaultSelectedMenu : PropTypes.string.isRequired
    }

    render() {
        const {category, defaultSelectedMenu, menuMode} = this.props;
        return (
            <Menu
                theme="dark"
                mode={menuMode}
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
        );
    }
}

export default MenuBar;