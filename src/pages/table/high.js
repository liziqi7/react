import React from 'react'
import { Card, Table, Modal,message,Badge } from 'antd';
// import axios from 'axios';
import axios from '../../axios/index'
import Utils from '../../utils/utils'
export default class HighTable extends React.Component {
    state = {
        dataSource: [],
        sortedInfo:null
    }
    params = {
        page: 1
    }
    handleSubmit = () => {

    }
    componentWillMount = () => {
        this.request();
    }

    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/hight/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                dataSource: res.list,
                selectedItem: null,
                selectedRowKeys: [],
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    this.request();
                })
            })
        });
    }
    handleChange = (pagination, filters, sorter) => {

        this.setState({
            sortedInfo: sorter
        })

    }
    handleDelect=(item)=>{
       Modal.confirm({
        title:"are you ok?",
        content:"是否删除此条数据",
        onOk:()=>{
             message.success("删除成功！");
             this.request();
        }
       })
    }
    render() {
        let { sortedInfo } = this.state;
        sortedInfo=sortedInfo||{};
        const columns = [{
            title: 'id',
            key: 'id',
            dataIndex: 'id',
            width: 80
        },
        {
            title: '用户名',
            key: 'userName',
            dataIndex: 'userName',
            width: 80
        },
        {
            title: '性别',
            key: 'sex',
            dataIndex: 'sex',
            render(sex) {
                return sex === 1 ? '男' : '女'
            },
            width: 80
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
            },
            width: 80
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
            },
            width: 80
        },
        {
            title: '生日',
            key: 'birthday',
            dataIndex: 'birthday',
            width: 80
        },
        {
            title: '地址',
            key: 'address',
            dataIndex: 'address',
            width: 180
        },
        {
            title: '早起时间',
            key: 'time',
            dataIndex: 'time',
            width: 80
        }]
        const columns2 = [{
            title: 'id',
            key: 'id',
            dataIndex: 'id',
            width: 80,
            fixed: 'left',
        },
        {
            title: '用户名',
            key: 'userName',
            dataIndex: 'userName',
            width: 80,
            fixed: 'left'
        },
        {
            title: '性别',
            key: 'sex',
            dataIndex: 'sex',
            render(sex) {
                return sex === 1 ? '男' : '女'
            },
            width: 80
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
            },
            width: 80
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
            },
            width: 80
        },
        {
            title: '生日',
            key: 'birthday',
            dataIndex: 'birthday',
            width: 80
        },
        {
            title: '地址',
            key: 'address',
            dataIndex: 'address',
            width: 180
        },
        {
            title: '早起时间',
            key: 'time',
            dataIndex: 'time',
            width: 80,
            fixed: 'right'
        }]
        const columns3 = [{
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
            title: '年龄',
            key: 'age',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.order,
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
        const columns4 = [{
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
                    '1': <Badge status="success" text="游泳" />,
                    '2': <Badge status="error" text="打篮球" />,
                    '3': <Badge status="default" text="踢足球" />,
                    '4': <Badge status="processing" text="跑步" />,
                    '5': <Badge status="warning" text="爬山" />
                }
                return config[abc];
            }
        },
        {
            title: '年龄',
            key: 'age',
            dataIndex: 'age'
        },
        {
            title: '地址',
            key: 'address',
            dataIndex: 'address'
        },
        {
            title: '操作',
            render: (text,item)=> {return(<a href="javascript:;" onClick={(item)=>{this.handleDelect(item)}}>删除</a>)}
        }]
        return (
            <div>
                <Card title="头部固定" className="card-wrap">
                    <Table scroll={{ y: 240 }} bordered dataSource={this.state.dataSource} columns={columns} pagination={false} />
                </Card>
                <Card title="左侧固定" className="card-wrap">
                    <Table scroll={{ x: 750, y: 240 }} bordered dataSource={this.state.dataSource} columns={columns2} pagination={false} />
                </Card>
                <Card title="排序" className="card-wrap">
                    <Table onChange={this.handleChange} bordered dataSource={this.state.dataSource} columns={columns3} pagination={false} />
                </Card>
                <Card title="操作按钮" className="card-wrap">
                    <Table bordered dataSource={this.state.dataSource} columns={columns4} pagination={false} />
                </Card>

            </div>
        )
    }
}
