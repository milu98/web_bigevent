$.ajaxPrefilter(function(options) {
    //在发起ajax请求前，统一拼接根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂在complete回调函数
    options.complete = function(res) {
        //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})