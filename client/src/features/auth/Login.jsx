import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { FaEye, FaEyeSlash, FaCircleInfo } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import { useUserSendLoginMutation } from './authApiSlice'

const Login = () => {
    const emailRef = useRef()
    const msgRef = useRef()

    // authApiSlice mutations
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
                    // save JWT token returned
                    console.log(payload)
                    // clear form
                    resetControlledInputs()
                    // navigate to dashboard
                })
                .catch((error) => {
                    console.log(error)
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
        <form className="login__form" onSubmit={loginFormSubmitHandler}>
            <div className="login__form__div">
                <label htmlFor="login-email__input" className="login-email__label">Email</label>
                <input required type="text" className="login-email__input" id="login-email__input"
                    ref={emailRef}
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>
            <div className="login__form__div">
                <div className="login-password-label__div">
                    <label htmlFor="login-password__input" className="login-password__label">Password</label>
                    <button type="button" className="show-password__button" onClick={() => {setShowPassword(!showPassword)}}>
                        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                    </button>
                </div>
                <input required className="login-password__input" id="login-password__input" 
                    type= {
                        showPassword ? "text" : "password"
                    }
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
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