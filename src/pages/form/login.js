import React from 'react'
import { Card ,Form,Button,Input,Icon ,message,Checkbox} from 'antd';
const FormItem=Form.Item;
class Logins extends React.Component {
    handleSubmit=()=>{  
        let userInfo=this.props.form.getFieldsValue();      
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${userInfo.username},恭喜登录成功，密码为${userInfo.password}`)
            }
        })
    }
    render() {
        const {getFieldDecorator}  = this.props.form;
        return (
            <div>                
                <Card title="登录行内表单" className="card-wrap">
                         <Form layout="inline">
                            <FormItem>
                                <Input placeholder="请输入账号"/>   
                            </FormItem>
                            <FormItem>
                                <Input placeholder="请输入密码"/>   
                            </FormItem>
                            <FormItem>
                               <Button type="primary">登录</Button>
                            </FormItem>
                        </Form>         
                </Card>
                <Card title="登录水平表单" className="card-wrap">
                         <Form style={{width:300}}>
                            <FormItem>
                                {
                                    getFieldDecorator('username',{
                                        initialValue:"" ,
                                        rules:[{
                                            required:true,
                                            message:'请输入用户名'
                                        },{
                                          min:5,max:10,
                                          message:"长度不在范围内"  
                                        },{
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:"用户名必须为字母或数字" 
                                        }]  
                                    })(<Input prefix={<Icon type="user" />} placeholder="请输入账号"/> )
                                }  
                            </FormItem>
                            <FormItem>
                            {
                                    getFieldDecorator('password',{
                                        initialValue:""  ,
                                        rules:[{
                                            required:true,
                                            message:'请输入密码'
                                        }] 
                                    })(<Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码"/> )
                                } 
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )}
                                <a  href="/" style={{float:'right'}}>忘记密码</a>                               
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
export default Form.create()(Logins);