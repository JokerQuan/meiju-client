import React, { Component } from 'react';
import { 
    Comment, 
    Empty, 
    Tooltip, 
    Icon, 
    Avatar, 
    Input, 
    Button, 
    message 
} from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import ReplayList from '../replay_list/replay_list';
import { 
    awesome,
    deleteComment, 
    getCommentCount, 
    replay 
} from "../../redux/actions";

import time from '../../utils/time';
import privilege from '../../utils/privilege';
import './comment_list.less';

class CommentList extends Component {

    state = {
        replayContent : '',
        replayEditing : ''
    }

    static propTypes = {
        commentList : PropTypes.array
    }

    handleAwesome = (commentId) => {
        this.props.awesome(commentId, this.props.clientIP.ip);
    }

    checkAwesome = (comment) => {
        const isLogin = this.props.userCookie && this.props.userCookie._id;
        let isAwesome = false;
        if (isLogin) {
            isAwesome = comment.awesome.indexOf(this.props.userCookie._id) !== -1;
        } else {
            isAwesome = comment.awesome.indexOf(this.props.clientIP.ip) !== -1;
        }
        return isAwesome;
    }

    handleDelete = (comment) => {
        this.props.deleteComment(comment._id);
        this.props.getCommentCount();
    }

    isEditShow = (comment) => {
        this.setState({
            replayContent : '',
            replayEditing : this.state.replayEditing === comment._id ? '' : comment._id
        });
    }

    handleChange = (e) => {
        this.setState({
            replayContent : e.target.value
        });
    }

    handleReplay = (comment) => {
        if (this.state.replayContent === '') {
            message.warn('先说点什么呗！');
        } else {
            const isLogin = this.props.userCookie && this.props.userCookie._id;
            const replayObj = {
                comment_id : comment._id,
                from_id : isLogin ? this.props.userCookie._id : 'anonymous',
                from_name : isLogin ? this.props.userCookie.username : '游客',
                to_id : comment.user_id,
                to_name : comment.user_id === 'anonymous' ? '游客' : comment.user_name,
                content : this.state.replayContent
            }
            this.props.replay(replayObj);
            this.setState({
                replayContent : '',
                replayEditing :  ''
            });
        }
    }

    getActions = (comment) => {
        let actions = [
            <span>
            <Tooltip title={this.checkAwesome(comment) ? "我觉得不行，取消点赞！" : "我觉得不错，点个赞！"}>
                <Icon onClick={() => this.handleAwesome(comment._id)}
                    className='c-theme' type="like"
                    theme={this.checkAwesome(comment) ? 'filled' : 'outlined'}/>
            </Tooltip>
            <span className='c-theme' style={{ paddingLeft: 8, cursor: 'auto' }}>
                {comment.awesome.length}
            </span>
            </span>,
            <span className='c-theme' onClick={() => this.isEditShow(comment)}>回复</span>
        ];
        if (privilege.isAdmin()) {
            actions.push(
                <span  className='c-theme s-delete'
                    onClick={() => this.handleDelete(comment)}
                >删除</span>
            );
        }
        return actions;
    }

    render() {
        const {commentList} = this.props;
        return (
            <div>
                {
                    commentList && commentList.length > 0 
                    ?
                    commentList.map(comment => (
                        <Comment
                            className='comment-item'
                            key={comment._id}
                            actions={this.getActions(comment)}
                            avatar={
                                <Avatar
                                    src={require(`../../assets/avatar/${comment.user_avatar ? comment.user_avatar : 0}.png`)}
                                    alt={comment._id}
                                />
                            }
                            author={
                                <span className='c-theme'>{
                                    comment.user_id === 'anonymous'
                                    ?
                                    '游客'
                                    :
                                    comment.user_name
                                }</span>
                            }
                            content={
                                <p className='comment-content'>
                                    {comment.content}
                                </p>
                            }
                            datetime={
                                <span>{time.parseTime(comment.create_time)}</span>
                            }
                        >
                            {
                                //回复输入框
                                this.state.replayEditing === comment._id
                                ?
                                <div className='comment-box'>
                                    <Input.TextArea autosize={{minRows: 2}} 
                                        autoFocus
                                        onChange={this.handleChange}
                                        value={this.state.replayContent}
                                        placeholder={
                                            '回复' +
                                            (comment.user_id === 'anonymous'
                                            ?
                                            '游客'
                                            :
                                            comment.user_name)
                                        }>
                                    </Input.TextArea>
                                    <Button type='primary' onClick={() => this.handleReplay(comment)}>回复</Button>
                                </div>
                                :
                                null
                            }
                            
                            {
                                // 回复列表
                                comment.replay_list.length > 0
                                ?
                                <ReplayList comment={comment}></ReplayList>
                                :
                                null
                            }
                        </Comment>
                    ))
                    :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>抢沙发啦~</Empty>
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        clientIP : state.clientIP,
        userCookie : state.userCookie
    }),
    {awesome, deleteComment, getCommentCount, replay}
)(CommentList);