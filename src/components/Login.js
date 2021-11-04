import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { AUTH_TOKEN } from '../constants'


// GQL documents
const SIGNUP_MUTATION = gql`
    mutation SignUpMutation(
        $email: String!
        $password: String!
        $name: String!
    ) {
        signup(
            email:$email
            password:$password
            name:$name
        ) {
            token
        }
    }
`

const LOGIN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
        login(email: $email, password: $password) {
            token
        }
    }
`
/////////BEGINNING OF COMPONENT/////////////
const Login = () => {
    const history = useHistory();
    const [formState, setFormState] = useState({
        login:true,
        email:'',
        password:'',
        name:''
    })

    // MUTATION HANDLERS
    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password
        },
        onCompleted:({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login.token)
            history.push('/')
        }
    })
    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            email:formState.email,
            password:formState.password,
            name:formState.name
        },
        onCompleted:({ signup }) => {
            localStorage.setItem(AUTH_TOKEN, signup.token)
            history.push('/')
        }
    })

    //Helper functions
    const renderLoginFormFields = () => {
        return (
            <div className="flex flex-column">
                    {/* if state.login is false, render the name field */}
                    {!formState.login && (
                        <input
                        value={formState.name}
                        onChange={(e) =>
                            setFormState({
                            ...formState,
                            name: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Your name"
                        />
                    )}
                    {/* always render email and pw fields */}
                    <input
                        value={formState.email}
                        onChange={(e) =>
                        setFormState({
                            ...formState,
                            email: e.target.value
                        })
                        }
                        type="text"
                        placeholder="Your email address"
                    />
                    <input
                        value={formState.password}
                        onChange={(e) =>
                        setFormState({
                            ...formState,
                            password: e.target.value
                        })
                        }
                        type="password"
                        placeholder="Choose a safe password"
                    />
                </div>
        )
    }

    const renderLoginButtons = () => {
        return (
            <div className="flex mt3">
                    <button
                        className="pointer mr2 button"
                        onClick={(e) => {
                            e.preventDefault()
                            formState.login ? login() : signup()
                        }}
                    >
                        {formState.login ? 'login' : 'create account'}
                    </button>
                    <button
                        className="pointer button"
                        onClick={(e) =>
                        setFormState({
                            ...formState,
                            login: !formState.login
                        })
                        }
                    >
                    {formState.login
                    ? 'need to create an account?'
                    : 'already have an account?'}
                    </button>
                </div>
        )
    }

    return (
        <div>
            <h4 className="mv3">
            {formState.login ? 'Login' : 'Sign Up'}
            </h4>
            
                {renderLoginFormFields()}
                {renderLoginButtons()}
            
        
        </div>
    );
}

export default Login