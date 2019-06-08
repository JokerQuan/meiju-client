import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Typography, message } from "antd";

import './meiju_detail.less'

const {Paragraph} = Typography;

class MeijuDetail extends Component {

    static propTypes = {
        meiju : PropTypes.object.isRequired
    }

    handleCopy = () => {
        message.success('复制成功！请打开迅雷进行下载！');
    }

    render() {
        const {meiju} = this.props;
        return (
            <div>
                <div className='info-box'>
                    <img alt='' src={meiju.pic_url} />
                    <div className='info'>
                        <h1 className='detail-title'>{meiju.title}</h1>
                        <Paragraph>{'别名：' + meiju.alias_title}</Paragraph>
                        <Paragraph>{'英文名：' + meiju.en_title}</Paragraph>
                        <Paragraph>{'类型：' + meiju.type}</Paragraph>
                        <Paragraph>{'地区：' + meiju.area}</Paragraph>
                        <Paragraph>{'标签：' + meiju.tags}</Paragraph>
                        <Paragraph>{'首播日期：' + meiju.birth_date}</Paragraph>
                        <Paragraph>{'翻译：' + meiju.translator}</Paragraph>
                    </div>
                </div>
                <Paragraph className='download-all' 
                    copyable={{ 
                        text: meiju.files.map(file => file.url).join('\n'),
                        onCopy: this.handleCopy
                        }}>
                    复制全部下载链接</Paragraph>
                <div className='download-box'>
                    {
                        meiju.files.map((file) => (
                            <Paragraph copyable={{text: file.url, onCopy: this.handleCopy}}>{file.name}</Paragraph>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default MeijuDetail;