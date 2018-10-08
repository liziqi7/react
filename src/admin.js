import React from 'react'
import {Row, Col} from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
export default class Admin extends React.Component{
    render(){
        return (
            <div>
                <Row>
                    <Col span="3">left</Col>
                    <Col span="21">
                        <Header></Header>
                        <Row>Content</Row>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        )
    }
}