$(document).ready(function () {
    //登录注册切换
    var url = location.href;
    var profix = url.substring(url.lastIndexOf("/")+1,url.length)
    // console.log(url+" profix: "+profix)
    if (profix == "login"){
        $(".logincon").show();
        $(".regcon").hide();
    }else {
        $(".logincon").hide();
        $(".regcon").show();
    }

    //登录
    $(".loginbut").click(function () {loginfun()
    })
    $(document).keydown(function (e) {
        if (e.keyCode == 13){loginfun()}
    })
    //注册
    $(".regbut").click(function () {regfun()})





//函数
    //登录
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
                                location.href = "/reg"
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

    //注册
    function regfun() {
        var username = $.trim($(".reg-username").val());
        var telephone = $.trim($(".reg-telephone").val());
        var password = $.trim($(".reg-password").val());

        //alert("username: "+username +" telephone: "+telephone +" password: "+password)
        var phoneformat = /^1[3|4|5|7|8][0-9]{9}$/;

        if(username.length == 0){
            alert("用户名不能为空")
            return false;
        }
        if(telephone.length == 0){
            alert("手机号不能为空")
            return false;
        }
        if (!phoneformat.test(telephone)){
            alert("手机号:  "+telephone+"不对，请重新输入您的手机号")
            return false;
        }
        if(password.length == 0){
            alert("密码不能为空")
            return false;
        }
        if(password.length < 6){
            alert("密码不能低于六位")
            return false;
        }
        /*if(isPasswd(password)){
            alert("只能输入6-12个字母、数字、下划线");
            return false;
        }*/
        var userList = {"username":username,"password":password,"telephone":telephone};
        $.ajax({
            type:"post",
            dataType:"json",
            contentType:"application/json;charset=utf-8",
            url:"/user/reg",
            data:JSON.stringify(userList),
            success:function (data) {
                console.log(data)
                if (data.msg.length == 4){
                    alert("注册成功")
                    location.href ="/login";
                }
                if (data.msg.length == 7){
                    alert("该手机号已注册")
                    location.href ="/reg";
                }
            },
            error:function (error) {
                alert("系统异常，请联系管理员！")
            }
        })

    }

    //找回密码
    $(".forget").click(function () {
        $(".forgetbox").show();
    })
    $(".errorbox").click(function () {
       $(".forgetbox").hide();
    })
    $(".forgetnum label").click(function () {
       var index = $(this).index();
        $(".forgetnum label").eq(index).addClass("tarlab").removeClass("forlab").siblings(".forgetnum label").removeClass("tarlab").addClass("forlab");
        $(".optiobox").eq(index).show().siblings(".optiobox").hide()
    })
    $(".forgetbut").click(function () {
        var phone = $.trim($(".fphone").val());
        var name = $.trim($(".fname").val());
        if (phone.length ==0 || name.length == 0){
            alert("请重新输入")
            return false;
        }
        $.ajax({
            type:"get",
            url:"/user/forgetpassword",
            data:{
                telephone:phone,
                userName:name
            },
            success:function (data) {
                console.log(data)
                $(".forget-result").html(data.msg)
            },
            error:function (data) {
                console.log(data)
            }

        })
    })



//验证注册选项
    //校验密码：只能输入6-12个字母、数字、下划线
    function isPasswd(s)
    {
        var patrn=/^(\w){6,12}$/;
        if (!patrn.exec(s)) return false
        return true
    }



})