const checkUsername = (username) => {
    //lengh min 8
    if (username.length < 8) return false
    const regex = /^[a-zA-Z0-9]+$/
    return regex.test(username)
}
console.log(checkUsername('john'))