import React from 'react'
import { HashRouter as Router, Route,Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Admin from './admin'
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
export default class IRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <App>
                       <Route path="/login" component={Login} />
                       <Route path="/admin" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path="/admin/ui/buttons" component={Buttons} />
                                    <Route path="/admin/ui/modals" component={Modals} />
                                    <Route path="/admin/ui/loadings" component={Loadings} />
                                    <Route path="/admin/ui/notification" component={Notification} />
                                    <Route path="/admin/ui/messages" component={Messages} /> 
                                    <Route path="/admin/ui/tabs" component={Tabs} />   
                                    <Route path="/admin/ui/gallery" component={Gallery} /> 
                                    <Route path="/admin/ui/carousel" component={Carousel} />     
                                    <Route path="/admin/form/login" component={Logins} />                 
                                    <Route component={NoMatch}></Route>
                                </Switch>
                            </Admin>
                        } />
                    </App>
                </Router>
            </div>
        )
    }
}