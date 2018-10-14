import React from 'react'
import { Card, Table, message } from 'antd';
// import axios from 'axios';
import axios from '../../axios/index'
import Utils from '../../utils/utils'
export default class Basics extends React.Component {
    state = {
        dataSource2: [],
        selectedItem: null,
        selectedRowKeys: []
    }
    params = {
        page:1
    }
    handleSubmit = () => {

    }
    componentWillMount = () => {
        this.request();
    }

    request = () => {
        let _this = this;
        // var baseURL="https://easy-mock.com/mock/5bc079399944a90dbdbe6686/imooc";
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            // console.log(JSON.stringify(res));
            this.setState({
                dataSource2: res.list,
                selectedItem: null,
                selectedRowKeys: [],
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    this.request();
                })
            })
        });
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        message.info(`用户名：${record.userName},爱好：${record.interest}`)
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
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
        const columns2 = [{
            title: 'id',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: '用户名',
            key: 'userName',
            dataIndex: 'userName'
        },
        {
            title: '性别',
            key: 'sex',
            dataIndex: 'sex',
            render(sex) {
                return sex === 1 ? '男' : '女'
            }
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子',
                    '4': '百度FE',
                    '5': '创业者'
                }
                return config[state];
            }
        },
        {
            title: '爱好',
            key: 'interest',
            dataIndex: 'interest',
            render(abc) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[abc];
            }
        },
        {
            title: '生日',
            key: 'birthday',
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            key: 'address',
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            key: 'time',
            dataIndex: 'time'
        }]
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                let ids = [];
                selectedRows.map((item) => {
                    ids.push(item.id);
                })
                message.info(`用户ID：${ids}`)

                this.setState({
                    selectedRowKeys,
                    selectedIds: ids
                })
            }
        }
        return (
            <div>
                <Card title="基础表格" className="card-wrap">
                    <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
                </Card>
                <Card title="动态数据渲染表格" className="card-wrap">
                    <Table bordered dataSource={this.state.dataSource2} columns={columns2} pagination={false} />
                </Card>
                <Card title="动态数据渲染表格" className="card-wrap">
                    <Table bordered
                        rowSelection={
                            rowSelection
                        }
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        dataSource={this.state.dataSource2} columns={columns2} pagination={false} />
                </Card>
                <Card title="动态数据渲染表格" className="card-wrap">
                    <Table bordered
                        rowSelection={
                            rowCheckSelection
                        }
                        dataSource={this.state.dataSource2} columns={columns2} pagination={false} />
                </Card>
                <Card title="动态数据渲染表格" className="card-wrap">                
                    <Table bordered
                        dataSource={this.state.dataSource2}
                        columns={columns2}
                        pagination={this.state.pagination}
                    />                    
                </Card>
            </div>
        )
    }
}
