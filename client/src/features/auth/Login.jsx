import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { FaEye, FaEyeSlash, FaCircleInfo } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import { useUserSendLoginMutation } from './authApiSlice'
import { credentialsSet, loggedOut } from './authSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname ?? '/'

    const emailRef = useRef()
    const msgRef = useRef()

    const dispatch = useDispatch()
    const loggedInCredentials = useSelector(state => state.auth)
    // useEffect(() => {
    //     console.log(loggedInCredentials)
    // }, [loggedInCredentials])

    // authApiSlice
    const [login, {isLoading}] = useUserSendLoginMutation()

    // controlled inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [msg, setMsg] = useState('')
    const [showSpinner, setShowSpinner] = useState(false)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    const resetControlledInputs = () => {
        setEmail('')
        setPassword('')
        setShowPassword(false)
    }

    const loginFormSubmitHandler = async(e) => {
        e.preventDefault()
        const form = e.currentTarget
        setMsg('')

        form.classList.add('disabled')

        try {
            const response = await login({email: email, password: password}).unwrap()
                .then((payload) => {
                    console.log('login ', payload)
                    // save JWT token returned
                    // console.log(payload)
                    const credentials = {
                        name: payload?.user?.name,
                        email: payload?.user?.email,
                        id: payload?.user?.id,
                        token: payload?.token
                    }
                    dispatch(credentialsSet(credentials))
                    // clear form
                    resetControlledInputs()
                    // navigate to dashboard
                    navigate(from, { replace: true })
                })
                .catch((error) => {
                    if (!error?.data) {
                        setMsg('No server response!')
                    // } else if (error?.data?.status === 409) {
                    //     setMsg('Email already registred, please enter a different one.')
                    } else if (error?.data?.message) {
                        const message = error?.data?.message ?? 'Error!'
                        setMsg(message)
                    } else {
                        setMsg('Login failed!')
                    }
                    msgRef.current.focus()
                })

        } catch (err) {
            setMsg('Login failed!')
            msgRef.current.focus()
        } finally {
            form.classList.remove('disabled')
        }
    }

    const logOutHandler = () => {
        dispatch(loggedOut())
        navigate('/login')
    }

    const inputOnFocusHandler = (e) => {
        const inputId = e.currentTarget.id
        let label = null
        switch (inputId) {
            case ('login-email__input'):
                label = document.getElementById('login-email__label')
                break;
            case ('login-password__input'):
                label = document.getElementById('login-password__label')
                break;
            default:
                break;
        }

        if (label) {
            label.classList.add('login__input__focus')
        }
    }

    const inputOnBlurHandler = (e) => {
        const inputElem = e.currentTarget
        let label = null
        switch (inputElem.id) {
            case ('login-email__input'):
                label = document.getElementById('login-email__label')
                break;
            case ('login-password__input'):
                label = document.getElementById('login-password__label')
                break;
            default:
                break;
        }
        
        if (label && inputElem.value === '') {
            label.classList.remove('login__input__focus')
        }
    }

  return (
    <section className="login__section">
        <form className="login__form" onSubmit={loginFormSubmitHandler}>
            <div className="login__form__div">
                <div className="login_input_outer__div">
                    <div className="login_input_inner__div">
                        <label id='login-email__label' htmlFor="login-email__input" className="login-email__label login__label">Email*</label>
                        <input required type="text" className="login-email__input login__input" id="login-email__input"
                            onFocus={(e) => {inputOnFocusHandler(e)}}
                            onBlur={(e) => {inputOnBlurHandler(e)}}
                            ref={emailRef}
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </div>
                </div>
            </div>
            <div className="login__form__div">
                <div className="login_input_outer__div">
                    <div className="login_input_inner__div">
                        <label id='login-password__label' htmlFor="login-password__input" className="login-password__label login__label">Password*</label>
                        <input required className="login-password__input login__input" id="login-password__input" 
                            type = {
                                showPassword ? "text" : "password"
                            }
                            value={password}
                            onFocus={(e) => {inputOnFocusHandler(e)}}
                            onBlur={(e) => {inputOnBlurHandler(e)}}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
                </div>
                <button type="button" className="show-password__button" onClick={() => {setShowPassword(!showPassword)}}>
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
            </div>
            <div className="login__form__div">
                <button className="login__button" type="submit" disabled={isLoading}>
                    Login
                </button>
            </div>
            <div className="login__form__div">
                <p className="login__p" ref={msgRef}>{msg}</p>
            </div>
            <div className="login__form__div">
                {
                    isLoading ? 
                    <div className="loader"></div> :
                    <></>
                }
            </div>
        </form>
    </section>
  )
}

export default Login