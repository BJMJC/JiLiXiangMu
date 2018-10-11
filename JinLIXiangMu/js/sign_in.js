var register = (function(){

    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['login-btn'];
            this.$usernameInp =   this.$ele['username'];
            this.$passwordInp =   this.$ele['password'];
            this.event();
        },
        event: function() {
            var _this = this;
            // 注册按钮
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
                sendAjax('http://localhost:888/JinLIXiangMu/php/sign_in.php', params);
            }
            this.$passwordInp.onchange = function(){
                var reg1 = /^\w{6,13}$/;
                if(reg1.test(_this.$passwordInp.value)){

                }else{
                    alert('请输入正确的密码')
                }
            }
            this.$usernameInp.onchange = function(){
                var reg=/^1(3|4|5|7|8)[0-9]\d{8}$/;
                if(reg.test(_this.$usernameInp.value)){
                    
                }else{
                    alert("请输入正确的手机号码");
                }
                var params = {
                    data: {
                        username: _this.$usernameInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.checkName(data);
                    }
                }
                sendAjax('http://localhost:888/JinLIXiangMu/php/check_username.php', params);
            }
        },
        checkName: function(data) {
            if(data.code == 200) {
                // 用户名称不存在
            } else {
                // 用户名称存在
            }
        },
        loginSuccess: function(data) {
            if(data.code == 200) {
               
                location.href = 'denglu.html';
            } else {
                alert(data.msg);
            }
        }
    }

}())
