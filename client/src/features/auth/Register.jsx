import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { FaEyeSlash, FaEye, FaCircleInfo } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useUserSendRegisterMutation } from './authApiSlice'

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const checkValidName = (name) => {
    return name.length > 0 && name.length <= 50
}

const checkValidEmail = (email) => {
    return EMAIL_REGEX.test(email)
}

const checkValidPassword = (password) => {
    return password.length >= 6
}

const Register = () => {

    const nameRef = useRef()
    const msgRef = useRef()

    const [register, {isLoading}] = useUserSendRegisterMutation()

    const [name, setName] = useState('')
    const [nameValid, setNameValid] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [confPassword, setConfPassword] = useState('')
    const [confPasswordValid, setConfPasswordValid] = useState(false)
    const [confPasswordFocus, setConfPasswordFocus] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setNameValid(checkValidName(name))
    }, [name])

    useEffect(() => {
        setEmailValid(checkValidEmail(email))
    }, [email])

    useEffect(() => {
        setPasswordValid(checkValidPassword(password))
    }, [password])

    useEffect(() => {
        setConfPasswordValid(password === confPassword)
    }, [password, confPassword])

    const resetControlledInputs = () => {
        setName('')
        setEmail('')
        setPassword('')
        setConfPassword('')
        setShowPassword(false)
    }

    const gotoLogin = () => {
        resetControlledInputs()
        //navigate to login
    }

    const registerFormSubmitHandler = async(e) => {
        e.preventDefault()
        setMsg('')
        
        // const action = e.nativeEvent.submitter.value;
        const form = e.currentTarget

        form.classList.add('disabled')

        const isEmailValid = EMAIL_REGEX.test(email)
        if (!isEmailValid) {
            msgRef.current.focus()
            setMsg('Please provide a valid email!')
            form.classList.remove('disabled')
            return
        }

        if (!name || !email || !password || !confPassword) {
            msgRef.current.focus()
            setMsg('Please provide all required information!')
            form.classList.remove('disabled')
            return
        }

        if (password !== confPassword) {
            msgRef.current.focus()
            setMsg('Passwords do not match!')
            form.classList.remove('disabled')
            return
        }

        try {
            const response = await register({name: name, email: email, password: password}).unwrap()
                .then((payload) => {
                    // save JWT token returned
                    console.log(payload)
                    // clear form
                    resetControlledInputs()
                    // navigate to dashboard
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
                        setMsg('Registration failed!')
                    }
                    msgRef.current.focus()
                })
        } catch(error) {
            msgRef.current.focus()
            setMsg('Registration failed!')
        } finally {
            form.classList.remove('disabled')
        }
    }

  return (
    <section className="register__section">
        <form className="register__form" onSubmit={registerFormSubmitHandler}>
            <h1>Register</h1>
            <div className="register__form__div">
                <label htmlFor="register-name__input" className="register-name__label">Name</label>
                <input required type="text" className="register-name__input" id="register-name__input"
                    ref={nameRef}
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    aria-invalid={nameValid ? "false" : "true"}
                    aria-describedby="nameNote"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <p id="nameNote" className={nameFocus && name && !nameValid? "instructions" : "offscreen"}>
                    <FaCircleInfo /><br/>
                    Please enter a name that is 1 to 50 characters.
                </p>
            </div>
            <div className="register__form__div">
                <label htmlFor="register-email__input" className="register-email__label">Email</label>
                <input required type="text" className="register-email__input" id="register-email__input" 
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    aria-invalid={emailValid ? "false" : "true"}
                    aria-describedby="emailNote"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <p id="nameNote" className={emailFocus && email && !emailValid? "instructions" : "offscreen"}>
                    <FaCircleInfo /><br/>
                    Please provide a valid email.
                </p>
            </div>
            <div className="register__form__div">
                <div className="register-password-label__div">
                    <label htmlFor="register-password__input" className="register-password__label">Password</label>
                    <button type="button" className="show-password__button" onClick={() => {setShowPassword(!showPassword)}}>
                        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                    </button>
                </div>

                <input required className="register-password__input" id="register-password__input"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    aria-invalid={passwordValid ? "false" : "true"}
                    aria-describedby="passwordNote"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <p id="passwordNote" className={passwordFocus && password && !passwordValid? "instructions" : "offscreen"}>
                    <FaCircleInfo /><br/>
                    Please provide a password that is 6 or more characters.
                </p>
            </div>
            <div className="register__form__div">
                <label htmlFor="register-conf-password__input" className="register-conf-password__label">Confirm password</label>
                <input required className="register-conf-password__input" id="register-conf-password__input" 
                    onFocus={() => setConfPasswordFocus(true)}
                    onBlur={() => setConfPasswordFocus(false)}
                    aria-invalid={confPasswordValid ? "false" : "true"}
                    aria-describedby="confPasswordNote"
                    type={showPassword ? "text" : "password"}
                    value={confPassword}
                    onChange={(e) => {setConfPassword(e.target.value)}}
                />
                <p id="confPasswordNote" className={confPasswordFocus && confPassword && !confPasswordValid? "instructions" : "offscreen"}>
                    <FaCircleInfo /><br/>
                    Passwords do not match.
                </p>
            </div>
            <div className="register__form__div">
                <button className="register__button" type="submit" name='register' value='register' disabled={isLoading}>
                    Register
                </button>
            </div>
            <div className="register__form__div">
                <p className="register__p" ref={msgRef}>{msg}</p>
            </div>
            <div className="register__form__div">
                {
                    isLoading ? 
                    <div className="loader"></div> :
                    <></>
                }
            </div>
        </form>
        <div className="register__form__div">
            <p>Have an account?</p>
            <button className="gotoLogin__button" type="submit" name='gotoLogin' value='gotoLogin' disabled={isLoading} onClick={gotoLogin}>
                Log in
            </button>
        </div>
    </section>
  )
}

export default Register