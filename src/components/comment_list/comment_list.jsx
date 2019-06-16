import React, { Component } from 'react';
import { Comment, Empty, Tooltip, Icon, Avatar } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { awesome, getClientIP } from "../../redux/actions";
import time from '../../utils/time';
import './comment_list.less';

class CommentList extends Component {

    static propTypes = {
        commentList : PropTypes.array
    }

    componentDidMount () {
        this.props.getClientIP();
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
                            actions={[
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
                                <span className='c-theme'>回复</span>
                            ]}
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
                        />
                    ))
                    :
                    <Empty>暂无留言</Empty>
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
    {awesome, getClientIP}
)(CommentList);