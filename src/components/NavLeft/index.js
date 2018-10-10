import React from 'react'

import { Link } from 'react-router-dom'
import MenuConfig from '../../config/menuConfig'

import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
export default class NavLeft extends React.Component{
    componentWillMount = () => {
      const menuTreeNode=this.renderMenu(MenuConfig);
      this.setState({
        menuTreeNode
      });
    }
    
    
    
    //菜单渲染
    renderMenu=(data)=>{
        return  data.map((item)=>{
            item.key='/admin'+item.key;
            if(item.children){
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}><Link to={item.key}>{item.title}</Link></Menu.Item>
            
        })
    }
    render(){
        return (
            <div>
              <div className="logo">
                <img src="/assets/logo-ant.svg" alt="" />
                <h1>Imooc MS</h1>
              </div>
              <Menu theme="dark">
                {this.state.menuTreeNode}
              </Menu>
            </div>
        )
    }
}