import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Typography, message, Icon, Tooltip, Modal, Tabs, Input, Button, Empty } from "antd";
import { connect } from "react-redux";

import store from "../../redux/store";
import { star, cancelStar, meijuComment } from "../../redux/actions";
import LoginRegisterModal from '../login_register_modal/login_register_modal';
import MeijuCommentList from '../meiju_comment_list/meiju_comment_list';

import './meiju_detail.less'

const {Paragraph} = Typography;
const {TabPane} = Tabs;

class MeijuDetail extends Component {

    state = {
        content : ''
    }

    static propTypes = {
        meiju : PropTypes.object.isRequired
    }

    handleCopy = () => {
        message.success('复制成功！请打开迅雷进行下载！');
    }

    openLoginModal = () => {
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

    handleStar = () => {
        const isLogin = this.props.userCookie && this.props.userCookie._id;
        if (!isLogin) {
            Modal.confirm({
                title : '您尚未登录，是否登录以收藏？',
                onOk : this.openLoginModal
            });
        } else {
            this.props.star(this.props.meiju._id);
        }
    }

    handleCancelStar = () => {
        this.props.cancelStar(this.props.meiju._id);
    }

    handleChange = (e) => {
        this.setState({
            content : e.target.value
        });
    }

    handleComment = async () => {
        if (this.state.content === '') {
            message.warn('先说点什么呗！');
        } else {
            await this.props.meijuComment({
                meijuID : this.props.meiju._id,
                content : this.state.content
            });
            this.setState({
                content : ''
            });
        }
    }

    render() {
        let {meiju, meijuList} = this.props;
        //多级传递来的redux中的数据，不会在modal中更新，暂时没找到更好的办法，手动判断更新
        meijuList.map(_meiju => {
            if (meiju._id === _meiju._id && meiju.comment_list.length !== _meiju.comment_list.length) {
                meiju = _meiju;
            }
            return _meiju;
        });

        let isStar = false;
        if (this.props.userCookie.favorates) {
            isStar = this.props.userCookie.favorates.indexOf(meiju._id) !== -1
        }
        return (
            <div>
                <div className='info-box'>
                    <img alt='' src={
                        meiju.pic_url === '/pic/nopic.gif'
                        ?
                        require(`../../assets/nopic.gif`)
                        :
                        meiju.pic_url
                    } />
                    <div className='info'>
                        <h1 className='detail-title'>{meiju.title}</h1>
                        {
                            isStar 
                            ?
                            <Tooltip title="已收藏，点击取消收藏">
                                <Icon className='cancel-star' type="star" theme="filled"
                                    onClick={this.handleCancelStar} />
                            </Tooltip>
                            :
                            <Tooltip title="点击收藏">
                                <Icon className='star' type="star" theme="twoTone" twoToneColor="#F2C941"
                                    onClick={this.handleStar} />
                            </Tooltip> 
                        }
                        <Paragraph>{'别名：' + meiju.alias_title}</Paragraph>
                        <Paragraph>{'英文名：' + meiju.en_title}</Paragraph>
                        <Paragraph>{'类型：' + meiju.type}</Paragraph>
                        <Paragraph>{'地区：' + meiju.area}</Paragraph>
                        <Paragraph>{'标签：' + meiju.tags}</Paragraph>
                        <Paragraph>{'首播日期：' + meiju.birth_date}</Paragraph>
                        <Paragraph>{'翻译：' + meiju.translator}</Paragraph>
                    </div>
                </div>

                <Tabs type="card" className='tabs'>
                    <TabPane tab="下载" key="download">
                    {
                        meiju.files && meiju.files.length > 0 && meiju.files[0].name && meiju.files[0].url
                        ? 
                        <div>
                            <Paragraph className='download-all' 
                                copyable={{ 
                                    text: meiju.files.map(file => file.url).join('\n'),
                                    onCopy: this.handleCopy
                                    }}>
                                复制全部下载链接</Paragraph>
                            <div className='download-box'>
                                {
                                    meiju.files.map((file, index) => (
                                        <Paragraph key={index} copyable={{text: file.url, onCopy: this.handleCopy}}>{file.name}</Paragraph>
                                    ))
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <Paragraph>{'暂无下载链接，请前往源站查看:'}</Paragraph>
                            <a href={'https://www.meijutt.com' + meiju.href} rel='noopener noreferrer' target="_blank">{'美剧天堂'}</a>
                        </div>
                    }
                    </TabPane>
                    <TabPane tab={'评论（' + meiju.comment_list.length + '）'} key="comment">
                        <div className='comments-box'>
                            
                            {
                                meiju.comment_list && meiju.comment_list.length > 0
                                ?
                                <MeijuCommentList 
                                    meijuID = {meiju._id}
                                    commentList={meiju.comment_list}
                                    store={store}>
                                </MeijuCommentList>
                                :
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>抢沙发啦~</Empty>
                            }
                        </div>
                        <div className='comments-box'>
                            <Input.TextArea autosize={{minRows: 1}} placeholder='说点什么...'
                                value={this.state.content}
                                onChange={this.handleChange}>
                            </Input.TextArea>
                            <Button type='primary'
                                onClick={this.handleComment}
                                >评论</Button>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default connect(
    state => ({
        userCookie : state.userCookie,
        meijuList : state.meijuList
    }),
    {star, cancelStar, meijuComment}
)(MeijuDetail);