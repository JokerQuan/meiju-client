import React, { Component } from 'react';
import { Typography, Divider, Input, Button, message, Pagination } from 'antd';

import { connect } from "react-redux";
import { comment, getCommentList, getCommentCount } from "../../redux/actions";
import CommentList from '../../components/comment_list/comment_list';

import './about.less';

const { Title, Text } = Typography;

class About extends Component {

    state = {
        commentValue : ''
    }

    componentDidMount () {
        this.props.getCommentList(0);
        this.props.getCommentCount();
    }

    handleChange = (e) => {
        this.setState({
            commentValue : e.target.value,
        });
    }

    handleComment = () => {
        if (this.state.commentValue.trim() === '') {
            message.warn('先说点什么呗！')
        } else {
            this.props.comment(this.state.commentValue);
            this.props.getCommentCount();
            this.setState({
                commentValue : '',
            });
        }
    }

    onPageChange = (page) => {
        this.props.getCommentList(page - 1);
        document.querySelector("#divider").scrollIntoView();
    }

    render() {
        return (
            <div className='about-content'>
                <Title level={2}>建站初衷</Title>
                <Typography>
                    本站主要用于学习前端 React 框架，数据来源：
                    <a href='https://www.meijutt.com' rel='noopener noreferrer' 
                        target="_blank">美剧天堂</a>
                    <h4>
                        如有侵权，请联系邮箱：jokeshuan@gmail.com
                    </h4>
                    <ul className='url-box'>
                        项目源码链接如下，欢迎各位大佬交流：
                        <li>
                            <a href='https://github.com/JokerQuan/meiju-client' rel='noopener noreferrer' 
                                target="_blank">前端源码</a>
                        </li>
                        <li>
                            <a href='https://github.com/JokerQuan/meiju-server' rel='noopener noreferrer' 
                                target="_blank">服务端源码</a>
                        </li>
                        <li>
                            <a href='https://github.com/JokerQuan/meiju_spider' rel='noopener noreferrer' 
                                target="_blank">爬虫源码</a>
                        </li>
                    </ul>
                </Typography>
                <Typography>
                    <h4>开发计划：</h4>
                    <ul>
                        <li>
                            <Text>关于本站可评论</Text>
                        </li>
                        <li>
                            <Text>可对美剧进行评论</Text>
                        </li>
                        <li>
                            <Text>重构导航菜单、用户菜单</Text>
                        </li>
                    </ul>
                </Typography>
                <Divider id='divider'></Divider>
                <Title level={2}>留言板</Title>
                您对本站有任何意见或建议，请在下方留言，感谢！
                <div className='comment-box'>
                    <Input.TextArea autosize={{minRows: 2}} placeholder='说点什么...'
                        value={this.state.commentValue}
                        onChange={this.handleChange}>
                    </Input.TextArea>
                    <Button type='primary' onClick={this.handleComment}>留言</Button>
                </div>
                <Divider orientation="left">
                    <h4>目前有{this.props.commentCount}条留言</h4>
                </Divider>
                <div className='list-container'>
                <CommentList commentList={this.props.commentList}></CommentList>
                <Pagination className='pagination'
                    total={this.props.commentCount} 
                    pageSize={20} 
                    onChange={this.onPageChange}
                    hideOnSinglePage={true}/>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        commentList : state.commentList,
        commentCount : state.commentCount
    }),
    {comment, getCommentList, getCommentCount}
)(About);