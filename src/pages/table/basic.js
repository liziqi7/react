import React from 'react'
import { Card ,Table} from 'antd';
import axios from 'axios';
export default class Basics extends React.Component {
    state={
        dataSource2:[]
    }
    handleSubmit=()=>{  
        
    }
    componentWillMount = () => {
      this.request();
    }
    
    request=()=>{
        var baseURL="https://easy-mock.com/mock/5bc079399944a90dbdbe6686/imooc";
        axios.get(baseURL+'/table/list').then((res)=>{
            console.log(JSON.stringify(res));
        });
    }
    render() {
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
          }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }];
          
          const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          }];
        return (
            <div>                
                <Card title="基础表格" className="card-wrap">
                        <Table bordered dataSource={dataSource} columns={columns}  pagination={false}/>      
                </Card>
                <Card title="动态数据渲染表格" className="card-wrap">
                        <Table bordered dataSource={this.state.dataSource2} columns={columns}  pagination={false}/>      
                </Card>
            </div>
        )
    }
}
