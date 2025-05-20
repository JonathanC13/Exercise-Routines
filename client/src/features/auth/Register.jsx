import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { FaEyeSlash, FaEye, FaCircleInfo } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useUserSendRegisterMutation } from './authApiSlice'
import { credentialsSet, authMessageSet } from './authSlice'
import FormInput from '../../components/FormInput'
import {checkValidName, checkValidEmail, checkValidPassword} from '../../functions/accountInfoValidation'
import { errorStatusSet, errorStatusCleared } from '../error/errorSlice'
import errorTextConversion from '../../functions/errorTextConversion'

// const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

// const checkValidName = (name) => {
//     return name.length > 0 && name.length <= 50
// }

// const checkValidEmail = (email) => {
//     return EMAIL_REGEX.test(email)
// }

// const checkValidPassword = (password) => {
//     return password.length >= 6
// }

const createShowPasswordComp = (showPassword, setShowPassword, theme) => {
    return <button type="button" className={`cursor_pointer show-password__button show-password__button--color-${theme}`} onClick={() => {setShowPassword(!showPassword)}}>
        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
    </button>
}

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useSelector((state) => state.auth.preferredTheme)

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
        dispatch(authMessageSet({message: ''}))
        
        // const action = e.nativeEvent.submitter.value;
        const form = e.currentTarget

        form.classList.add('disabled')

        if (!name || !email || !password || !confPassword) {
            msgRef.current.focus()
            setMsg('Please provide all required information!')
            form.classList.remove('disabled')
            return
        }

        const isEmailValid = checkValidEmail(email)
        if (!isEmailValid) {
            msgRef.current.focus()
            setMsg('Please provide a valid email!')
            form.classList.remove('disabled')
            return
        }

        const isValidPassword = checkValidPassword(password)
        if (!isValidPassword) {
            msgRef.current.focus()
            setMsg('Please enter valid password!')
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
                    dispatch(errorStatusCleared())
                    // save JWT token returned
                    const credentials = {
                        name: payload?.user?.name,
                        email: payload?.user?.email,
                        id: payload?.user?.id,
                        token: payload?.token
                    }
                    // clear form
                    resetControlledInputs()

                    dispatch(authMessageSet({message: 'Registration successful, you may log in!'}))

                    navigate("/login");
                })
                .catch((error) => {
                    if (!error?.data) {
                        // setMsg('No server response!')
                        dispatch(errorStatusSet(errorTextConversion(error)))
                        // navigate('/error')
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
        <form className={`register__form register__form--color-${theme}`} onSubmit={registerFormSubmitHandler}>
            <div className="register__form__div">
                {/* <label htmlFor="register-name__input" className="register-name__label form__label">Name*</label>
                <input required type="text" className="register-name__input" id="register-name__input"
                    ref={nameRef}
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    aria-invalid={nameValid ? "false" : "true"}
                    aria-describedby="nameNote"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <p id="nameNote" className={nameFocus && name && !nameValid ? "instructions" : "offscreen"}>
                    <FaCircleInfo /><br/>
                    Please enter a name that is 1 to 50 characters.
                </p> */}
                <FormInput
                    required = {true}
                    labelId = 'register-name__label'
                    labelText = 'Name'
                    inputType = 'text'
                    inputId = 'register-name__input'
                    onFocusCB = {(e) => setNameFocus(true)}
                    onBlurCB = {(e) => setNameFocus(false)}
                    inputRef = {nameRef}
                    inputValueState = {name}
                    inputOnChangeCB = {setName}
                    aria = {true}
                    ariaValidState = {nameValid}
                    ariaDescribedby = 'nameNote'
                    ariaInfoCond = {nameFocus && name && !nameValid}
                    ariaInfoText = 'Please enter a name that is 1 to 50 characters.'
                    theme={theme}
                ></FormInput>
            </div>
            <div className="register__form__div">
                {/* <label htmlFor="register-email__input" className="register-email__label form__label">Email</label>
                <input required type="text" className="register-email__input" id="register-email__input" 
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    aria-invalid={emailValid ? "false" : "true"}
                    aria-describedby="emailNote"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <p id="emailNote" className={emailFocus && email && !emailValid? "instructions" : "offscreen"}>
                    <FaCircleInfo /><br/>
                    Please provide a valid email.
                </p> */}
                <FormInput
                    required = {true}
                    labelId = 'register-email__label'
                    labelText = 'Email'
                    inputType = 'text'
                    inputId = 'register-email__input'
                    onFocusCB = {(e) => setEmailFocus(true)}
                    onBlurCB = {(e) => setEmailFocus(false)}
                    inputRef = {null}
                    inputValueState = {email}
                    inputOnChangeCB = {setEmail}
                    aria = {true}
                    ariaValidState = {emailValid}
                    ariaDescribedby = 'emailNote'
                    ariaInfoCond = {emailFocus && email && !emailValid}
                    ariaInfoText = 'Please provide a valid email.'
                    theme={theme}
                ></FormInput>
            </div>
            <div className="register__form__div">
                {/* <div className="register-password-label__div">
                    <label htmlFor="register-password__input" className="register-password__label form__label">Password</label>
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
                </p> */}

                <FormInput
                    required = {true}
                    labelId = 'register-password__label'
                    labelText = 'Password'
                    inputType = {showPassword ? "text" : "password"}
                    inputId = 'register-password__input'
                    onFocusCB = {(e) => setPasswordFocus(true)}
                    onBlurCB = {(e) => setPasswordFocus(false)}
                    inputRef = {null}
                    inputValueState = {password}
                    inputOnChangeCB = {setPassword}
                    inputOptionComp = {createShowPasswordComp(showPassword, setShowPassword, theme)}
                    aria = {true}
                    ariaValidState = {passwordValid}
                    ariaDescribedby = 'passwordNote'
                    ariaInfoCond = {passwordFocus && password && !passwordValid}
                    ariaInfoText = 'Please provide a password that is 6 or more characters.'
                    theme={theme}
                ></FormInput>
            </div>
            <div className="register__form__div">
                {/* <label htmlFor="register-conf-password__input" className="register-conf-password__label form__label">Confirm password</label>
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
                </p> */}

                <FormInput
                    required = {true}
                    labelId = 'register-conf-password__label'
                    labelText = 'Confirm password'
                    inputType = {showPassword ? "text" : "password"}
                    inputId = 'register-conf-password__input'
                    onFocusCB = {(e) => setConfPasswordFocus(true)}
                    onBlurCB = {(e) => setConfPasswordFocus(false)}
                    inputRef = {null}
                    inputValueState = {confPassword}
                    inputOnChangeCB = {setConfPassword}
                    aria = {true}
                    ariaValidState = {confPasswordValid}
                    ariaDescribedby = 'confPasswordNote'
                    ariaInfoCond = {confPasswordFocus && confPassword && !confPasswordValid}
                    ariaInfoText = 'Passwords do not match.'
                    theme={theme}
                ></FormInput>
            </div>
            <div className="register-button__div">
                <button className="register__button cursor_pointer" type="submit" name='register' value='register' disabled={isLoading}>
                    Register
                </button>
            </div>
            <div className={msg ? "register__form__div" : "offscreen"}>
                <p className="register-error__p" ref={msgRef}>{msg}</p>
            </div>
            <div className={isLoading ? "register__form__div" : "offscreen"}>
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

export default Register