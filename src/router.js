import React from 'react'
import { HashRouter as Router, Route,Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Admin from './admin'
import Common from './common'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/ui/nomatch'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import Logins from './pages/form/login'
import Register from './pages/form/register'
import Basic from './pages/table/basic'
import Hight from './pages/table/high'
import City from './pages/city'
import Order from './pages/order'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import orderDetail from './pages/order/detail'
export default class IRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                <LocaleProvider locale={zhCN}>
                    <App>
                       <Route path="/login" component={Login} />
                       <Route path="/common" render={()=>
                            <Common>
                            <Switch>
                                <Route path="/common/order/detail/:orderId" component={orderDetail}></Route>
                            </Switch>
                        </Common>
                       } />
                       <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notification} />
                                    <Route path="/ui/messages" component={Messages} /> 
                                    <Route path="/ui/tabs" component={Tabs} />   
                                    <Route path="/ui/gallery" component={Gallery} /> 
                                    <Route path="/ui/carousel" component={Carousel} />     
                                    <Route path="/form/login" component={Logins} />     
                                    <Route path="/form/reg" component={Register} />
                                    <Route path="/table/basic" component={Basic} />
                                    <Route path="/table/high" component={Hight} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />                                    
                                    <Route component={NoMatch}></Route>
                                </Switch>
                            </Admin>
                        } />
                    </App>
                    </LocaleProvider>
                </Router>
            </div>
        )
    }
}