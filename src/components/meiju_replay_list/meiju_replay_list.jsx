import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Comment, Input, Button, message } from "antd";
import { connect } from "react-redux";

import time from '../../utils/time';
import { meijuReplay } from "../../redux/actions";

class MeijuReplayList extends Component {

    state = {
        replayContent : '',
        replayEditing : ''
    }

    static propTypes = {
        comment : PropTypes.object.isRequired,
        meijuID : PropTypes.string.isRequired
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
                meijuID : this.props.meijuID,
                comment_id : comment._id,
                from_id : isLogin ? this.props.userCookie._id : 'anonymous',
                from_name : isLogin ? this.props.userCookie.username : '游客',
                to_id : replay.from_id,
                to_name : replay.from_name,
                content : this.state.replayContent
            }
            this.props.meijuReplay(replayObj);
            this.setState({
                replayContent : '',
                replayEditing :  ''
            });
        }
    }

    render() {
        let comment = this.props.comment;
        //多级传递来的redux中的数据，不会在modal中更新，暂时没找到更好的办法，手动判断更新
        this.props.meijuList.map(meiju => {
            meiju.comment_list.map(_comment => {
                if (meiju._id === this.props.meijuID &&
                    comment._id === _comment._id &&
                    comment.replay_list.length !== _comment.replay_list.length) {
                        comment = _comment;
                    }
                return _comment;
            });
            return meiju;
        });
        return (
            <div>
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
                            <div className='replay-box'>
                                <Input.TextArea autosize={{minRows: 1}} 
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
        userCookie : state.userCookie,
        meijuList : state.meijuList
    }),
    {meijuReplay}
)(MeijuReplayList);