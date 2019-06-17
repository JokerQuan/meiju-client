import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Comment, Input, Button, message } from "antd";
import { connect } from "react-redux";

import { replay } from "../../redux/actions";
import time from '../../utils/time';
import './replay-list.less'

class ReplayList extends Component {

    state = {
        replayContent : '',
        replayEditing : ''
    }

    static propTypes = {
        comment : PropTypes.object.isRequired
    }

    handleChange = (e) => {
        this.setState({
            replayContent : e.target.value
        });
    }

    isEditShow = (comment, replay) => {
        this.setState({
            replayContent : '',
            replayEditing : this.state.replayEditing === comment._id + replay.create_time
                ? '' 
                : comment._id + replay.create_time
        });
    }

    handleReplay = (comment, replay) => {
        if (this.state.replayContent === '') {
            message.warn('先说点什么呗！');
        } else {
            const isLogin = this.props.userCookie && this.props.userCookie._id;
            const replayObj = {
                comment_id : comment._id,
                from_id : isLogin ? this.props.userCookie._id : 'anonymous',
                from_name : isLogin ? this.props.userCookie.username : '游客',
                to_id : replay.from_id,
                to_name : replay.from_name,
                content : this.state.replayContent
            }
            this.props.replay(replayObj);
            this.setState({
                replayContent : '',
                replayEditing :  ''
            });
        }
    }

    render() {
        const comment = this.props.comment;
        return (
            <div className='replay-list'>
            {
                comment.replay_list.map(replay => (
                    <Comment
                        key={replay.from_id + replay.create_time}
                        actions={[<span onClick={() => this.isEditShow(comment, replay)} className='c-theme'>回复</span>]}
                        author={
                            <span>
                            <span className='c-theme'>{replay.from_name}</span>
                            <span> 回复 </span>
                            <span className='c-theme'>{replay.to_name}</span>
                            </span>
                        }
                        datetime={
                            <span>{time.parseTime(replay.create_time)}</span>
                        }
                        content={replay.content}
                    >
                        {
                            //回复输入框
                            this.state.replayEditing === (comment._id + replay.create_time)
                            ?
                            <div className='comment-box'>
                                <Input.TextArea autosize={{minRows: 2}} 
                                    autoFocus
                                    onChange={this.handleChange}
                                    value={this.state.replayContent}
                                    placeholder={'回复' + replay.from_name}>
                                </Input.TextArea>
                                <Button type='primary' onClick={() => this.handleReplay(comment, replay)}>回复</Button>
                            </div>
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
        userCookie : state.userCookie
    }),
    {replay}
)(ReplayList);