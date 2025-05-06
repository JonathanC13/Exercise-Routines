import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import FormInput from '../../components/FormInput'
import {checkValidName, checkValidEmail, checkValidPassword} from '../../functions/accountInfoValidation'
import { useUserSendInfoUpdateMutation, useUserSendPasswordUpdateMutation } from '../auth/authApiSlice'

const EditAccountSettings = () => {
    const nameRef = useRef()
    const nameMsgRef = useRef()
    const passMsgRef = useRef()

    const { credentials, preferredTheme } = useSelector((state) => state.auth)
    const [name, setName] = useState(credentials.name)
    const [validName, setValidName] = useState(checkValidName(name))
    const [nameFocus, setNameFocus] = useState(true)
    const [nameMsg, setNameMsg] = useState('')
    // const [email, setEmail] = useState(credentials.email)
    // const [validEmail, setValidEmail] = useState(checkValidEmail(email))
    const [currentPassword, setCurrentPassword] = useState('')
    const [validCurrentPassword, setValidCurrentPassword] = useState(false)
    const [currentPasswordFocus, setCurrentPasswordFocus] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [validNewPassword, setValidNewPassword] = useState(false)
    const [newPasswordFocus, setNewPasswordFocus] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passMsg, setPassMsg] = useState('')

    const [updateUserInfo, {isLoading}] = useUserSendInfoUpdateMutation()
    const [updatePassword, {isLoadingUpdatePassword}] = useUserSendPasswordUpdateMutation()

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setValidName(checkValidName(name))
    }, [name])

    useEffect(() => {
        setValidCurrentPassword(checkValidPassword(currentPassword))
    }, [currentPassword])

    useEffect(() => {
        setValidNewPassword(checkValidPassword(newPassword))
    }, [newPassword])

    const submitNameChange = (e) => {
        e.preventDefault()

        if (!checkValidName(name)) {
            setNameMsg('Please provide a name!')
            nameMsgRef.current.focus()
            return
        }

        try {
            const payload = {
                'id': credentials.id,
                'body': {
                    name: name
                }
            }

            const response = updateUserInfo(payload).unwrap()
                .then((payload) => {
                    // save JWT token returned
                    const credentials = {
                        name: payload?.user?.name
                    }
                })
                .catch((error) => {
                    if (!error?.data) {
                        setNameMsg('No server response!')
                    // } else if (error?.data?.status === 409) {
                    //     setMsg('Email already registred, please enter a different one.')
                    } else if (error?.data?.message) {
                        const message = error?.data?.message ?? 'Error!'
                        setNameMsg(message)
                    } else {
                        setNameMsg('Update failed!')
                    }
                    nameMsgRef.current.focus()
                })
        } catch (error) {
            setNameMsg('Update failed.')
            nameMsgRef.current.focus()
        }
    }

    const submitPasswordChange = (e) => {
        e.preventDefault()

        if (!checkValidPassword(currentPassword) || !checkValidPassword(newPassword)) {
            setPassRef('Please provide the current and desired new password!')
            passMsgRef.current.focus()
            return
        }

        try {
            const payload = {
                'id': credentials.id,
                'body': {
                    currentPassword: currentPassword,
                    newPassword: newPassword
                }
            }

            const response = updatePassword(payload).unwrap()
                .then((payload) => {
                })
                .catch((error) => {
                    if (!error?.data) {
                        setPassMsg('No server response!')
                    // } else if (error?.data?.status === 409) {
                    //     setMsg('Email already registred, please enter a different one.')
                    } else if (error?.data?.message) {
                        const message = error?.data?.message ?? 'Error!'
                        setPassMsg(message)
                    } else {
                        setPassMsg('Update failed!')
                    }
                    passMsgRef.current.focus()
                })
        } catch (error) {
            setPassMsg('Update failed.')
            passMsgRef.current.focus()
        }
    }

  return (
    <div className='edit-account-settings__section'>
        <section className={`edit-account-settings__container edit-account-settings__container--color-${preferredTheme}`}>
            <h1 className={`edit-account-settings_container__h1 edit-account-settings_container__h1--color-${preferredTheme}`}>Edit account settings</h1>

            <form className="edit-account-settings_container__form" onSubmit={submitNameChange}>
                <h2 className={`edit-account-settings_container__h2 edit-account-settings_container__h2--color-${preferredTheme}`}>Change name</h2>
                <div className="edit-account-settings_container__div">
                    <FormInput
                        required = {true}
                        labelId = 'edit-account-settings-name__label'
                        labelText = 'Name'
                        inputType = 'text'
                        inputId = 'edit-account-settings-name__input'
                        onFocusCB = {(e) => setNameFocus(true)}
                        onBlurCB = {(e) => setNameFocus(false)}
                        inputRef = {nameRef}
                        inputValueState = {name}
                        inputOnChangeCB = {setName}
                        aria = {true}
                        ariaValidState = {validName}
                        ariaDescribedby = 'nameNote'
                        ariaInfoCond = {nameFocus && name && !validName}
                        ariaInfoText = 'Please enter a name that is 1 to 50 characters.'
                        theme={preferredTheme}
                    ></FormInput>
                </div>
                <div className="edit-account-settings_container__div">
                    <button type='submit' className='account-settings_edit__button cursor_pointer' name='submit_name_change__button' disabled={isLoading}>Change name</button>
                </div>
                <div className={nameMsg ? "edit-account-settings_container__div" : "offscreen"}>
                    <p className="change-user-info-error__p" ref={nameMsgRef}>{nameMsg}</p>
                </div>
            </form>

            <form className="edit-account-settings_container__form" onSubmit={submitPasswordChange}>
                <h2 className={`edit-account-settings_container__h2 edit-account-settings_container__h2--color-${preferredTheme}`}>Change password</h2>
                <div className="edit-account-settings_container__div">
                    <FormInput
                        required = {true}
                        labelId = 'edit-account-settings-curr-password__label'
                        labelText = 'Current password'
                        inputType = {showPassword ? "text" : "password"}
                        inputId = 'edit-account-settings-curr-password__input'
                        onFocusCB = {(e) => setCurrentPasswordFocus(true)}
                        onBlurCB = {(e) => setCurrentPasswordFocus(false)}
                        inputRef = {null}
                        inputValueState = {currentPassword}
                        inputOnChangeCB = {setCurrentPassword}
                        inputOptionComp = {createShowPasswordComp(showPassword, setShowPassword, preferredTheme)}
                        aria = {true}
                        ariaValidState = {validCurrentPassword}
                        ariaDescribedby = 'passwordNote'
                        ariaInfoCond = {currentPasswordFocus && currentPassword && !validCurrentPassword}
                        ariaInfoText = 'Please provide a password that is 6 or more characters.'
                        theme={preferredTheme}
                    ></FormInput>
                </div>
                <div className="edit-account-settings_container__div">
                    <FormInput
                        required = {true}
                        labelId = 'edit-account-settings-new-password__label'
                        labelText = 'New password'
                        inputType = {showPassword ? "text" : "password"}
                        inputId = 'edit-account-settings-new-password__input'
                        onFocusCB = {(e) => setNewPasswordFocus(true)}
                        onBlurCB = {(e) => setNewPasswordFocus(false)}
                        inputRef = {null}
                        inputValueState = {newPassword}
                        inputOnChangeCB = {setNewPassword}
                        inputOptionComp = {createShowPasswordComp(showPassword, setShowPassword, preferredTheme)}
                        aria = {true}
                        ariaValidState = {validNewPassword}
                        ariaDescribedby = 'passwordNote'
                        ariaInfoCond = {newPasswordFocus && newPassword && !validNewPassword}
                        ariaInfoText = 'Please provide a password that is 6 or more characters.'
                        theme={preferredTheme}
                    ></FormInput>
                </div>
                <div className="edit-account-settings_container__div">
                    <button type='submit' className='account-settings_edit__button cursor_pointer' name='submit_password_change__button' disabled={isLoading}>Change password</button>
                </div>
                <div className={passMsg ? "edit-account-settings_container__div" : "offscreen"}>
                    <p className="change-user-info-error__p" ref={passMsgRef}>{passMsg}</p>
                </div>
            </form>
        </section>
    </div>
  )
}

export default EditAccountSettings