var login = (function(){

    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['login-btn'];
            this.$usernameInp =   this.$ele['username'];
            this.$passwordInp =   this.$ele['password'];
            this.$usernametishi = $('#username_tishi');
            this.$passwordtishi = $('#password_tishi');
            this.event();
        },
        event: function() {
            var _this = this;
            // 提交按钮
            this.$loginBtn.onclick = function() {
                // 发送ajax，验证用户名和密码
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value,
                        password: _this.$passwordInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.loginSuccess(data);
                    }
                }
                sendAjax('http://localhost:888/JinLIXiangMu/php/register.php', params);
            }
            this.$passwordInp.onchange = function(){
                var reg1 = /^\w{6,13}$/;
                if(reg1.test(_this.$passwordInp.value)){
                    _this.$passwordtishi.css({display:'none'}) 
                }else{
                    // alert('请输入正确的密码')
                    _this.$passwordtishi.css({display:'block'})
                }
            }
            this.$usernameInp.onchange = function(){
                var reg=/^1(3|4|5|7|8)[0-9]\d{8}$/;
                if(reg.test(_this.$usernameInp.value)){
                    _this.$usernametishi.css({display:'none'})
                }else{
                    // alert("请输入正确的手机号码");
                    _this.$usernametishi.css({display:'block'})
                }
            }
        },
        loginSuccess: function(data) {
            if(data.code == 200) {
                document.cookie = "user-id=" + data.data.id;
                document.cookie = "token=" + data.data.token;
                localStorage.userImg = data.data.ataver;
                location.href = 'JinLi.html';
            } else {
                alert(data.msg);
            }
        }
    }

}())
