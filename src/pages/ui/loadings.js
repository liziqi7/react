import React from 'react'
import { Card ,Button,Spin,Icon,Alert } from 'antd';
export default class Loadings extends React.Component {
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
        
        const icon=<Icon type="loading"  style={{fontSize:24}}/>
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                    <Spin indicator={icon}></Spin>
                </Card>  
                <Card title="内容遮罩" className="card-wrap">
                   <Alert
                    message="React"
                    description="welcome to React"
                    type="info"
                   >
                   </Alert>                  
                   <Spin tip="Loading...">
                        <Alert
                            message="React"
                            description="welcome to React"
                            type="warning"
                        >
                        </Alert>
                   </Spin>
                   <Spin tip="Loading..." indicator={icon}>
                        <Alert
                            message="React"
                            description="welcome to React"
                            type="warning"
                        >
                        </Alert>
                   </Spin>
                </Card>              
            </div>
        )
    }
}