import React from 'react'
import { Card ,Button,Radio } from 'antd';
export default class Buttons extends React.Component {
    state={
        loading:true,
        size:'default'
    }
    
    handleCloseLoading=()=>{      
        this.setState({
            loading:false
        })
    }
    handleChange=(e)=>{
        this.setState({
            size:e.target.value
        })
    }
    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button disabled>Danger</Button>
                </Card>
                <Card title="图像按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button icon="left" type="primary">返回</Button>
                        <Button icon="right" type="primary">前进</Button>
                    </Button.Group>                   
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group onChange={this.handleChange} value={this.state.size}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>  
                    <Button type="primary" size={this.state.size}>Primary</Button>
                    <Button size={this.state.size}>Default</Button>
                    <Button size={this.state.size} type="dashed">Dashed</Button>
                    <Button size={this.state.size} type="danger">Danger</Button>                 
                </Card>
            </div>
        )
    }
}