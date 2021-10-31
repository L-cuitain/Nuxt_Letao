//表单校验
export const verify = {
    //校验用户名
    username(uName){
        //用户名是否为空
        if(!uName){
            return '必须输入用户名'
        }
        //正则校验用户名格式是否正确
        if(!/^[\u4e00-\u9fa5a-zA-Z0-9]{2,20}$/.test(uName.trim())){
            return '您输入的用户名格式不正确'
        }

    },
    //校验密码
    password (pwd,repeatPwd){
        //密码是否为空
        if(!pwd){
            return '必须输入密码'
        }
        //密码格式是否正确
        if(!/^[a-zA-Z0-9]{6,20}$/.test(pwd.trim())){
            return '您输入的密码格式不正确'
        }
        //确认密码是否一致
        if(arguments.length > 1 && pwd !== repeatPwd){
            return '两次密码输入不一致'
        }
    },

    //校验手机号
    mobile(tele){
        // 手机号是否为空
        if(!tele){
            return '必须输入手机号'
        }
        //手机号格式是否正确
        if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(tele.trim())){
            return '您输入的手机号格式不正确'
        }
    }

}