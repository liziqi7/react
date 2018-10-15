import React from 'react'

import { Link } from 'react-router-dom'
import MenuConfig from '../../config/menuConfig'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
class NavLeft extends React.Component {
    state = {
        currentKey: ''
    }
    componentWillMount = () => {
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
        const menuTreeNode = this.renderMenu(MenuConfig, currentKey);

        this.setState({
            menuTreeNode,
            currentKey
        });
    }

    handleClick = (item) => {
        const { dispatch } = this.props;
        dispatch(switchMenu(item.item.props.title))
        this.setState({
            currentKey: item.key
        });
    }


    //菜单渲染
    renderMenu = (data, currentKey) => {
        return data.map((item) => {
            if (currentKey === item.key) {
                const { dispatch } = this.props;
                dispatch(switchMenu(item.title))
            }
            if (item.children) {
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.renderMenu(item.children, currentKey)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}><Link to={item.key}>{item.title}</Link></Menu.Item>

        })
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme="dark" mode="inline" onClick={this.handleClick} selectedKeys={[this.state.currentKey]}>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
export default connect()(NavLeft);