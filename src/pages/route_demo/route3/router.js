import React from 'react'
import { HashRouter as Router, Route,Switch } from 'react-router-dom'
import Main from './Main'
import About from './About'
import Topic from './Topic'
import Home from './Home'
import Info from './Info'
import NoMatch from './NoMatch'
export default class IRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Home>
                        <Switch>
                            <Route path="/main" render={()=>
                                <Main>
                                    {/* <div>this is a sub child element</div> */}
                                    <Route path="/main/:value" component={Info}></Route>
                                </Main>
                            }></Route>
                            <Route path="/about" component={About}></Route>
                            <Route path="/topics" component={Topic}></Route>
                            <Route component={NoMatch}></Route>
                        </Switch>
                    </Home>
                </Router>
            </div>
        )
    }
}