import React from 'react'
import { Row, Col } from 'antd'
import Util from '../../utils/utils'
import axios from '../../axios'
import { connect } from 'react-redux'

class Header extends React.Component {
    componentWillMount = () => {
        this.setState({
            userName: "abc"
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({ sysTime })
        }, 1000)
        this.getWeatherAPI();
    }

    getWeatherAPI = () => {
        // 
        const city = '北京';
        axios.jsonp({
            url: "http://api.map.baidu.com/telematics/v3/weather?location=" + encodeURIComponent(city) + "&output=json&ak=lxIkFkym9f0ptG1LSvZBcSkF",

        }).then((res) => {
            if (res.status === "success") {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }
    render() {
        const menuType = this.props.menuType;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? <Col span="6">logo</Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="/">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' : <Row className="breadcrumb">
                        <Col span="3" className="breadcrumb-title">{this.props.menuName}</Col>
                        <Col span="21" className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-img">
                                <img src={this.state.dayPictureUrl} alt="" />
                            </span>
                            <span className="weather-detail">{this.state.weather}</span>
                        </Col>
                    </Row>
                }

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        menuName: state.menuName
    }
}


export default connect(mapStateToProps)(Header);