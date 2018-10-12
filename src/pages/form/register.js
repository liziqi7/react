import React from 'react'
import { Card, Form, Button, Input, Icon, message, Checkbox, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class Register extends React.Component {
    state = {
        imageUrl: ''
    }
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`${userInfo.username},恭喜登录成功，密码为${userInfo.password}`)
            }
        })
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout={           
            wrapperCol: {
                xs: 24,
                sm: {span:12,offset:4}
            }
        }
        const dateFormat = 'YYYY-MM-DD HH:mm:ss';
        return (
            <div>
                <Card title="注册表单" className="card-wrap">
                    <Form>
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('username', {
                                    initialValue: "",
                                    rules: [{
                                        required: true,
                                        message: '请输入用户名'
                                    }, {
                                        min: 5, max: 10,
                                        message: "长度不在范围内"
                                    }, {
                                        pattern: new RegExp('^\\w+$', 'g'),
                                        message: "用户名必须为字母或数字"
                                    }]
                                })(<Input prefix={<Icon type="user" />} placeholder="请输入账号" />)
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('password', {
                                    initialValue: "",
                                    rules: [{
                                        required: true,
                                        message: '请输入密码'
                                    }]
                                })(<Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />)
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: "1"
                                })(<RadioGroup><Radio value="1">男</Radio><Radio value="2">女</Radio></RadioGroup>)
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: "18"
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: "2"
                                })(<Select>
                                    <Option value="1">闲鱼</Option>
                                    <Option value="2">风华</Option>
                                    <Option value="3">绝代</Option>
                                    <Option value="4">才子</Option>
                                    <Option value="5">官人</Option>
                                    <Option value="6">666</Option>
                                </Select>)
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ["2", "3"]
                                })(<Select mode="multiple">
                                    <Option value="1">游泳</Option>
                                    <Option value="2">跑步</Option>
                                    <Option value="3">跳绳</Option>
                                    <Option value="4">划船</Option>
                                    <Option value="5">打球</Option>
                                    <Option value="6">爬山</Option>
                                </Select>)
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(<Switch mode="multiple" />)
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2018-08-08', dateFormat)
                                })(<DatePicker showTime format={dateFormat} />)
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '皇后大道'
                                })(<TextArea autosize={{ minRows: 4, maxRows: 8 }} />)
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time', {
                                    initialValue: moment('09:30:00', 'HH:mm:ss')
                                })(<TimePicker format={'HH:mm:ss'} />)
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('avatar', {
                                    initialValue: ''
                                })(<Upload
                                    listType="picture-card"
                                    showUploadList={false}
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    onChange={this.handleChange}
                                >
                                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" /> : <Icon type="plus" />}
                                </Upload>)
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('agreement',{
                                    valuePropName: 'checked',
                                    initialValue:true
                                })(<Checkbox>我已阅读过<a href="/">开发协议</a></Checkbox>)
                            }
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Register);