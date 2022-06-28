$(function() {
    getUserInfo()
    var layer = layui.layer
        //退出按钮绑定点击事件
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //点确定do something
            //清空本地存储中的token
            localStorage.removeItem('token')
                //重新跳转到登录页面
            location.href = '/login.html'
            layer.close(index); //关闭confirm询问框
        })
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        // //不论成功还是失败，最终都会调用complete回调函数
        // complete: function(res) {
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
        //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}