import React, { Component } from 'react'
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import md5 from 'md5'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false,
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    displayError = errors =>
        errors.map((error, index) => <h4 key={index}>{error.message}</h4>)

    isFormValid = ({ email, password }) => email && password

    handleSubmit = e => {
        e.preventDefault()
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true })
            firebase
                .auth()
                .signInWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )
                .then(signInUser => {
                    console.log(signInUser)
                })
                .catch(err => {
                    console.error(err)
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false,
                    })
                })
        }
    }

    handleInputError = (errors, inputName) => {
        return errors.some(err => err.message.toLowerCase().includes(inputName))
            ? 'error'
            : ''
    }

    render() {
        const { password, email, errors, loading } = this.state

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login to DevChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email"
                                onChange={this.handleChange}
                                value={email}
                                type="email"
                                className={this.handleInputError(
                                    errors,
                                    'email'
                                )}
                            />
                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={password}
                                type="password"
                                className={this.handleInputError(
                                    errors,
                                    'password'
                                )}
                            />

                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color="violet"
                                fluid
                                size="large"
                            >
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayError(errors)}
                        </Message>
                    )}
                    <Message>
                        Don't have account? <Link to="/register">Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}
