import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Main from './Main'
import About from './About'
import Topic from './Topic'
import Home from './Home'
export default class IRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Home>
                        <Route path="/main" render={()=>
                            <Main>
                                {/* <div>this is a sub child element</div> */}
                                <Route path="/main/a" component={About}></Route>
                            </Main>
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                    </Home>
                </Router>
            </div>
        )
    }
}