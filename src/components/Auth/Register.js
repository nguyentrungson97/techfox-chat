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

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: [],
            loading: false,
            usersRef: firebase.database().ref('users'),
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    isFormEmpty = ({ username, email, password, passwordConfirm }) => {
        return (
            !username.length ||
            !email.length ||
            !password.length ||
            !passwordConfirm.length
        )
    }

    isPasswordValid = ({ password, passwordConfirm }) => {
        if (password.length < 6 || passwordConfirm.length < 6) {
            return false
        } else if (password !== passwordConfirm) {
            return false
        } else {
            return true
        }
    }

    isFormValid = () => {
        let errors = []
        let error

        if (this.isFormEmpty(this.state)) {
            error = { message: 'Fill in all fields' }
            this.setState({ errors: errors.concat(error) })
            return false
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: 'Password is invalid' }
            this.setState({ errors: errors.concat(error) })
            return false
        } else {
            //form valid
            return true
        }
    }

    displayError = errors =>
        errors.map((error, index) => <h4 key={index}>{error.message}</h4>)

    handleSubmit = e => {
        e.preventDefault()
        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true })
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )
                .then(createdUser => {
                    console.log(createdUser)
                    createdUser.user
                        .updateProfile({
                            displayName: this.state.username,
                            photoURL: `http://gravatar.com/avatar/${md5(
                                createdUser.user.email
                            )}?d=identicon`,
                        })
                        .then(() => {
                            this.savaUser(createdUser).then(() => {
                                console.log('user saved')
                            })
                        })
                        .catch(err => {
                            console.error(err)
                            this.setState({
                                errors: this.state.errors.concat(err),
                                loading: false,
                            })
                        })
                })
                .catch(err => {
                    console.error(err)
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: true,
                    })
                })
        }
    }

    savaUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
        })
    }

    handleInputError = (errors, inputName) => {
        return errors.some(err => err.message.toLowerCase().includes(inputName))
            ? 'error'
            : ''
    }

    render() {
        const {
            username,
            password,
            email,
            passwordConfirm,
            errors,
            loading,
        } = this.state

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for DevChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="username"
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={this.handleChange}
                                value={username}
                                type="text"
                            />
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
                            <Form.Input
                                fluid
                                name="passwordConfirm"
                                icon="repeat"
                                iconPosition="left"
                                placeholder="Password Confirm"
                                onChange={this.handleChange}
                                value={passwordConfirm}
                                type="password"
                                className={this.handleInputError(
                                    errors,
                                    'password'
                                )}
                            />

                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color="orange"
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
                        Already have account? <Link to="/login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}
