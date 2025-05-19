import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { FaEye, FaEyeSlash, FaCircleInfo } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import { useUserSendLoginMutation, useUserSendLogOutMutation } from './authApiSlice'
import { authMessageSet, credentialsSet, persistLoginSet } from './authSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import FormInput from '../../components/FormInput'

const createShowPasswordComp = (showPassword, setShowPassword, theme) => {
    return <button type="button" className={`cursor_pointer show-password__button show-password__button--color-${theme}`} onClick={() => {setShowPassword(!showPassword)}}>
        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
    </button>
}

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname ?? '/'
    const theme = useSelector((state) => state.auth.preferredTheme)

    const emailRef = useRef()
    const msgRef = useRef()

    const dispatch = useDispatch()
    const {credentials: loggedInCredentials, authMessage: authMessage} = useSelector(state => state.auth)
    // useEffect(() => {
    //     console.log(loggedInCredentials)
    // }, [loggedInCredentials])

    // authApiSlice
    const [login, {isLoading}] = useUserSendLoginMutation()
    const [logOut, {isLoadingLogOut}] = useUserSendLogOutMutation()

    // controlled inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [msg, setMsg] = useState('')
    const [persistLogin, setPersistLogin] = useState(false)

    useEffect(() => {
        if (loggedInCredentials?.token) {
            logOutHandler()
        }
        
        emailRef.current.focus()
    }, [])

    const resetControlledInputs = () => {
        setEmail('')
        setPassword('')
        setShowPassword(false)
    }

    const logOutHandler = async() => {
        try {
            const response = await logOut().unwrap()
                .then((payload) => {
                })
                .catch((error) => {
                })

        } catch (err) {
            setMsg('Log out failed!')
            msgRef.current.focus()
        } finally {
        }
    }

    const loginFormSubmitHandler = async(e) => {
        e.preventDefault()
        const form = e.currentTarget
        setMsg('')
        dispatch(authMessageSet({message: ''}))

        form.classList.add('disabled')

        try {
            const response = await login({email: email, password: password}).unwrap()
                .then((payload) => {
                    // console.log('login ', payload)
                    // save JWT token returned
                    // console.log(payload)
                    const credentials = {
                        name: payload?.user?.name,
                        email: payload?.user?.email,
                        id: payload?.user?.id,
                        preferredTheme: payload?.user?.preferredTheme,
                        token: payload?.token,
                    }
                    dispatch(credentialsSet(credentials))

                    dispatch(persistLoginSet({persistLogin}))

                    // clear form
                    resetControlledInputs()
                    // navigate to dashboard
                    navigate(from, { replace: true })
                })
                .catch((error) => {
                    // console.log(error)
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

  return (
    <section className="login__section">
        <p className={authMessage !== '' ? 'auth-msg__p' : 'auth-msg__p offscreen'}>{authMessage}</p>
        <form className={`login__form login__form--color-${theme}`} onSubmit={loginFormSubmitHandler}>
            <div className="login__form__div">
                {/* <div className="form-input_outer__div">
                    <div className="form-input_inner__div">
                        <label id='login-email__label' htmlFor="login-email__input" className="form__label">Email*</label>
                        <input required type="text" className="form-input__input" id="login-email__input"
                            onFocus={(e) => {inputOnFocusHandler(e)}}
                            onBlur={(e) => {inputOnBlurHandler(e)}}
                            ref={emailRef}
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </div>
                </div> */}
                <FormInput
                    required = {true}
                    labelId = 'login-email__label'
                    labelText = 'Email'
                    inputType = 'text'
                    inputId = 'login-email__input'
                    onFocusCB = {(e) => {}}
                    onBlurCB = {(e) => {}}
                    inputRef = {emailRef}
                    inputValueState = {email}
                    inputOnChangeCB = {setEmail}
                    aria = {false}
                    theme={theme}
                ></FormInput>
            </div>
            <div className="login__form__div">
                {/* <div className="form-input_outer__div">
                    <div className="form-input_inner__div">
                        <label id='login-password__label' htmlFor="login-password__input" className="form__label">Password*</label>
                        <input required className="form-input__input" id="login-password__input" 
                            type = {
                                showPassword ? "text" : "password"
                            }
                            value={password}
                            onFocus={(e) => {inputOnFocusHandler(e)}}
                            onBlur={(e) => {inputOnBlurHandler(e)}}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
                </div> */}
                <FormInput
                    required = {true}
                    labelId = 'login-password__label'
                    labelText = 'Password'
                    inputType = {showPassword ? "text" : "password"}
                    inputId = 'login-password__input'
                    onFocusCB = {(e) => {}}
                    onBlurCB = {(e) => {}}
                    inputRef = {null}
                    inputValueState = {password}
                    inputOnChangeCB = {setPassword}
                    inputOptionComp = {createShowPasswordComp(showPassword, setShowPassword, theme)}
                    aria = {false}
                    theme={theme}
                ></FormInput>
            </div>
            <div className="login__persist__div">
                <label className={`persistChkBox__label persistChkBox__label--color-${theme}`} htmlFor="persistChkBox"> Persist log in: </label>
                <input className='persistChkBox__input cursor_pointer' type="checkbox" id="persistChkBox" name="persistChkBox" value="persistVal"
                    checked={persistLogin}
                    onChange={(e) => setPersistLogin(e.currentTarget.checked)}
                />
            </div>
            <div className="login-button__div">
                <button className="login__button cursor_pointer" type="submit" disabled={isLoading}>
                    Log in
                </button>
            </div>
            <div className={msg ? "login__form__div" : "offscreen"}>
                <p className="login-error__p" ref={msgRef}>{msg}</p>
            </div>
            <div className={isLoading ? "login__form__div" : "offscreen"}>
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