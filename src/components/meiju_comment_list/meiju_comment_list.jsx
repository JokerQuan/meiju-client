import React, { Component } from 'react';
import { Comment, Avatar, Tooltip, Icon, Input, Button, message } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import store from "../../redux/store";
import { deleteMeijuComment, meijuAwesome, meijuReplay } from "../../redux/actions";
import privilege from '../../utils/privilege';
import time from '../../utils/time';
import MeijuReplayList from "../meiju_replay_list/meiju_replay_list";
import './meiju_comment_list.less';

class MeijuCommentList extends Component {
    state = {
        replayEditing : '',
        replayContent : ''
    }

    static propTypes = {
        commentList : PropTypes.array.isRequired,
        meijuID : PropTypes.string.isRequired
    }

    handleAwesome = (commentId) => {
        this.props.meijuAwesome({
            meijuID : this.props.meijuID,
            commentId, 
            clientIP : this.props.clientIP.ip
        });
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

    replayShow = (commentID) => {
        this.setState({
            replayEditing : commentID === this.state.replayEditing ? '' : commentID
        });
    }

    replayChange = (e) => {
        this.setState({
            replayContent : e.target.value
        })
    }

    handleReplay = async (comment) => {
        if (this.state.replayContent === '') {
            message.warn('先说点什么呗！');
        } else {
            const isLogin = this.props.userCookie && this.props.userCookie._id;
            const replayObj = {
                meijuID : this.props.meijuID,
                comment_id : comment._id,
                from_id : isLogin ? this.props.userCookie._id : 'anonymous',
                from_name : isLogin ? this.props.userCookie.username : '游客',
                to_id : comment.user_id,
                to_name : comment.user_id === 'anonymous' ? '游客' : comment.user_name,
                content : this.state.replayContent
            };
            await this.props.meijuReplay(replayObj);
            this.setState({
                replayContent : '',
                replayEditing :  ''
            });
        }
    }

    handleDelete = (commentID) => {
        this.props.deleteMeijuComment({
            meijuID: this.props.meijuID,
            commentID
        });
    }

    getActions = (comment) => {
        //多级传递来的redux中的数据，不会在modal中更新，暂时没找到更好的办法，手动判断更新
        this.props.meijuList.map(meiju => {
            meiju.comment_list.map(_comment => {
                if (meiju._id === this.props.meijuID &&
                    comment._id === _comment._id &&
                    comment.awesome.length !== _comment.awesome.length) {
                        comment = _comment;
                    }
                return _comment;
            });
            return meiju;
        });
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
            <span className='c-theme' 
                onClick={this.replayShow.bind(this, comment._id)}>回复</span>
        ];
        if (privilege.isAdmin()) {
            actions.push(
                <span className='c-theme s-delete'
                    onClick={this.handleDelete.bind(this, comment._id)}
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
                    commentList.map(comment => (
                        <Comment
                            key={comment._id}
                            actions={this.getActions(comment)}
                            avatar={
                                <Avatar
                                    src={require(`../../assets/avatar/${comment.user_avatar ? comment.user_avatar : 0}.png`)}
                                    alt={comment._id}
                                />
                            }
                            author={
                                <span className='c-theme'>{comment.user_name}</span>
                            }
                            content={<p>{comment.content}</p>}
                            datetime={
                                <span>{time.parseTime(comment.create_time)}</span>
                            }
                        >
                        {
                            //回复输入框
                            this.state.replayEditing === comment._id
                            ?
                            <div>
                                <Input.TextArea autosize={{minRows: 1}} 
                                    autoFocus
                                    onChange={this.replayChange}
                                    value={this.state.replayContent}
                                    placeholder={'回复' + comment.user_name}>
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
                            <MeijuReplayList meijuID={this.props.meijuID} comment={comment} store={store}></MeijuReplayList>
                            :
                            null
                        }
                        </Comment>
                    ))
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        userCookie : state.userCookie,
        clientIP : state.clientIP,
        meijuList : state.meijuList
    }),
    {deleteMeijuComment, meijuAwesome, meijuReplay}
)(MeijuCommentList);