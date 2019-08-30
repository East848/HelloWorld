$(document).ready(function () {
    $(".login").click(function () {
        loginfun()

    })
$(document).keydown(function (e) {
    if (e.keyCode == 13){loginfun()}
})

    function loginfun() {
        {
            var telephone = $.trim($(".telephone").val());
            var password = $.trim($(".password").val());
            if (telephone.length == 0 || password.length == 0){
                alert("用户名或密码不能为空");
            }else {
                $.ajax({
                    type:"post",
                    url:"/user/loginuser",
                    dataType:"json", //请求和响应返回data都需要是json个格式  否则会报错
                    cache:false, //不缓存
                    data:{
                        telephone:telephone,
                        password:password
                    },
                    success:function (data) {   //data 格式和dataType设置相同
                        var result =data.logResult;

                        if (result == "error"){
                            alert("密码错误")
                        }else if(result == "notUser") {
                            var con = confirm("您还没有请注册，是否去注册！")
                            if (con){
                                location.href = "/register"
                            }
                        }else if (result != null ){
                            alert("欢迎您: "+result);
                            document.cookie="username="+result
                            location.href = "/";

                        }

                    },
                    error:function (error) {

                        alert("error"+error)
                        console.log("error: "+error)
                        location.href = "/msg";
                    }
                })
            }

        }
    }
})
