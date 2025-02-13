import React from 'react'
import { useState } from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useRegisterMutation } from '../store/slices/api/authApiSlice'

const Register = () => {

    const [register, {isLoading}] = useRegisterMutation()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confEmail, setConfEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [msg, setMsg] = useState('')

    const registerHandler = async() => {
        if (!name || !email || !confEmail || !password || !confPassword) {
            setMsg('Please provide all required information!')
            return
        }

        if (email !== confEmail) {
            setMsg('Emails do not match!')
            return
        }

        if (password !== confPassword) {
            setMsg('Passwords do not match!')
            return
        }

        try {
            const response = await register({name: name, email: email, password: password}).unwrap()
            console.log(response)
        } catch {
            console.log(err)
            setMsg(err)
        }
    }

  return (
    <section className="register__section">
        <form className="register__form" action={registerHandler}>
            <div className="register__form__div">
                <label htmlFor="register-name__input" className="register-name__label">Name</label>
                <input required type="text" className="register-name__input" id="register-name__input"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
            </div>
            <div className="register__form__div">
                <label htmlFor="register-email__input" className="register-email__label">Email</label>
                <input required type="text" className="register-email__input" id="register-email__input" 
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />

                <label htmlFor="register-conf-email__input" className="register-conf-email__label">Confirm email</label>
                <input required type="text" className="register-conf-email__input" id="register-conf-email__input" 
                    value={confEmail}
                    onChange={(e) => {setConfEmail(e.target.value)}}
                />
            </div>
            <div className="register__form__div">
                <label htmlFor="register-password__input" className="register-password__label">Password</label>
                <input required className="register-conf-password__input" id="register-conf-password__input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />

                <label htmlFor="register-conf-password__input" className="register-conf-password__label">Confirm password</label>
                <input required className="register-conf-password__input" id="register-conf-password__input" 
                    type={showPassword ? "text" : "password"}
                    value={confPassword}
                    onChange={(e) => {setConfPassword(e.target.value)}}
                />

                <button type="button" className="show-password__button" onClick={() => {setShowPassword(!showPassword)}}>
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
            </div>
            <div className="register__form__div">
                <button className="register__button" type="submit" disabled={isLoading}>
                    Register
                </button>
            </div>
            <div className="register__form__div">
                <p className="register__p">{msg}</p>
            </div>
            <div className="register__form__div">
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