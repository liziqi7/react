import React from 'react'
import {Row} from 'antd'
import Header from './components/Header'
import './css/common.css'
export default class Comomn extends React.Component{
    render(){
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType="second"/>  
                </Row>   
                <Row className="container">
                     {this.props.children}
                </Row>  
            </div>
        )
    }
}