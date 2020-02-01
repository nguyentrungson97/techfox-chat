import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import firebase from 'firebase'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Loading } from './loading'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
} from 'react-router-dom'
import rootReducer from './reducers'
import { setUser } from './action'

const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user)
                this.props.history.push('/')
            }
        })
    }

    render() {
        return this.props.isLoading ? (
            <Loading />
        ) : (
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        )
    }
}

const mapStateFromProps = state => ({
    isLoading: state.user.isLoading,
})

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser })(Root))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
