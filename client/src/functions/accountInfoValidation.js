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

export {checkValidName, checkValidEmail, checkValidPassword}