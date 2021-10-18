const valid = ({
    fullname,

    username,
    email,
    password,
    cf_password,
    gender
}) => {
    const err = {}
    if (!fullname) {
        err.fullname = 'Vui lòng nhập tên đầy đủ'
    } else if (fullname.length > 25) {
        err.fullname = 'Họ và tên phải dưới 25 kí tự'
    }

    if (!email) {
        err.email = 'Vui lòng nhập tên đầy đủ'
    } else if (!validateEmail(email)) {
        err.email = 'Email không đúng'
    }


    if (!password) {
        err.password = 'Vui lòng nhập mật khẩu'
    } else if (password.replace(/ /g, '').length < 6) {
        err.password = 'Mật khẩu lớn hơn 6 kí tự'
    }

    if (password !== cf_password) {
        err.cf_password = 'Mật khẩu không giống'
    }
    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }

}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default valid