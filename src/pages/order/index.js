import React from 'react'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component {
    state = {
        list: [],
        pagination: null,
        selectedRowKeys: '',
        isShowEndOrder: false,
        orderInfo:{}
    }
    params = {
        page: 1
    }
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: 'DATE'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
    handleFilter=(params)=>{
        // this.params = params;
        // this.requestList();
    }
    handleEndOrder = () => {
        let { selectedItem } = this.state;
        if (!selectedItem) {
            Modal.info({
                title: "信息",
                content: "请选择一条订单结束"
            })
            return;
        }
        if (selectedItem.status === 2) {
            Modal.info({
                title: "温馨提示",
                content: "该订单行程已结束"
            })
        } else {
            axios.ajax({
                url: '/order/ebike_info',
                data: {
                    params: {
                        orderId: selectedItem.id
                    }
                }
            }).then((res) => {

                this.setState({
                    orderInfo: res,
                    isShowEndOrder: true
                })

            })
        }


    }
    handleFinishOrder = () => {
        let { selectedItem } = this.state;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: selectedItem.id
                }
            }
        }).then((res) => {
            if (res === 0) {
                message.success('订单结束成功')
                this.setState({
                    isShowEndOrder: false
                })
                this.requestList();
            }
        })
    }
    handleOpenDetail = () => {
        let { selectedItem } = this.state;
        if (!selectedItem) {
            Modal.info({
                title: "信息",
                content: "请选择一条订单结束"
            })
            return;
        }
        window.open(`/#/common/order/detail/${selectedItem.id}`, "_black")
    }
    componentDidMount() {
        this.requestList();
    }
    onRowClick = (record, index) => {
        this.setState({
            selectedRowKeys: [index],
            selectedItem: record
        })
    }
    requestList = () => {
        var _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: this.params
            }
        }).then((res) => {
            let list = res.list.map((item, index) => {
                item.key = index;
                return item;
            })
            this.setState({
                list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }   
    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(status){
                    return status===1?"进行中":"行程结束"
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <div>
                <Card className="card-wrap"> 
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card className="card-wrap">
                    <Button type="primary" onClick={this.handleOpenDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleEndOrder}>结束订单</Button>
                </Card>
                <div style={{ background: '#fff' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.isShowEndOrder}
                    onCancel={() => {
                        this.setState({
                            isShowEndOrder: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号"  {...formItemLayout}
                        >
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
// class FilterForm extends React.Component {
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Form layout="inline">
//                 <FormItem label="城市">
//                     {
//                         getFieldDecorator('city_id')(
//                             <Select
//                                 style={{ width: 100 }}
//                                 placeholder="全部"
//                             >
//                                 <Option value="">全部</Option>
//                                 <Option value="1">北京市</Option>
//                                 <Option value="2">天津市</Option>
//                                 <Option value="3">深圳市</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>

//                 <FormItem label="订单时间">
//                     {
//                         getFieldDecorator('start_time')(
//                             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     {
//                         getFieldDecorator('end_time')(
//                             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="订单状态">
//                     {
//                         getFieldDecorator('op_mode')(
//                             <Select
//                                 style={{ width: 100 }}
//                                 placeholder="全部"
//                             >
//                                 <Option value="">全部</Option>
//                                 <Option value="1">进行中</Option>
//                                 <Option value="2">行程结束</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
//                     <Button>重置</Button>
//                 </FormItem>
//             </Form>
//         )
//     }
// }
// FilterForm = Form.create({})(FilterForm);











