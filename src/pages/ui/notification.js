import React from 'react'
import { Card ,Button,notification } from 'antd';
export default class Notification extends React.Component {
   
    openNotification=(type,placement)=>{
        if(placement){
            notification.config({
                placement: placement,
                bottom: 50,
                duration: 3
            })
        }
        notification[type]({
            message:"are you ok",
            description:"this is description"
        })
    }
    render() {        
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>error</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>info</Button>
                </Card>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error','topRight')}>error</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning','bottomLeft')}>warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info','bottomRight')}>info</Button>
                </Card>                      
            </div>
        )
    }
}