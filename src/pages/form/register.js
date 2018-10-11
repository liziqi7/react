import React from 'react'
import { Card, Form, Button, Input, Icon, message, Checkbox,Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup=Radio.Group;
class Register extends React.Component {
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`${userInfo.username},恭喜登录成功，密码为${userInfo.password}`)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout={
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
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
                        <FormItem  label="密码" {...formItemLayout}>
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
                        <FormItem  label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: "1"
                                })(<RadioGroup><Radio value="1">男</Radio><Radio  value="2">女</Radio></RadioGroup>)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a href="/" style={{ float: 'right' }}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Register);