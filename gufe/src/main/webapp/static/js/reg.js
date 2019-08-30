$(document).ready(function () {
    $(".reg").click(function () {
       var username,password,telephone,email,sex,brithday,address;
       username = $.trim($(".username").val());
       password = $.trim($(".password").val());
       telephone = $.trim($(".telephone").val());
       email = $.trim($(".email").val());
       sex = $.trim($(".sex").val());
       brithday = $.trim($(".brithday").val());
       address = $.trim($(".address").val());
       var userList = {"username":username,"password":password,"telephone":telephone,"email":email,
           "sex":sex,"brithday":brithday,"address":address};
       var user = {"user":userList}
       if (username.length== 0 || password.length== 0 ||email.length==0 ||
       sex.length ==0 || brithday.length ==0 || address.length == 0){
           alert("选项不能为空")
       }else if(telephone.length != 11){
           alert("请重新输入手机号")
       }
       else {
            $.ajax({
                type:"post",
                dataType:"json",
                contentType:"application/json;charset=utf-8",
                url:"/user/reg",
                data:JSON.stringify(userList),
                success:function (data) {
                    if (data.msg.length == 4){
                        alert(data.msg)
                        location.href ="/";
                    }
                    if (data.msg.length == 7){
                        alert(data.msg)
                        location.href ="/register";
                    }
                },
                error:function (error) {
                    alert(error)
                }
            })
       }

    })
})