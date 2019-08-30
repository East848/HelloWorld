<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/2/13
  Time: 14:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>异常页面</title>
    <link rel="stylesheet" href="/static/css/msg.css">
    <script src="/static/js/jquery-3.2.1.min.js"></script>
</head>
<body>
    <div class="msgbhead">
        <%@include file="/jsp/index-top.jsp"%>
    </div>
    <div class="msgbox">

        <h2 align="center" class="msg" style="color: red">${msg}</h2>
        <h2 align="center" class="loginmsg" style="color: red">${loginmsg}</h2>
    </div>
    <div style="height: 500px;background-color: #0e99ff;width: 100%">

    </div>
</body>
<script>
    $(document).ready(function () {
        var loginmsg =$(".loginmsg").html()
        if (loginmsg == ""){

        }else {
            if (loginmsg.length ==5){
                if(confirm("是否去登录")){
                    location.href = "/login"
                }
            }
        }
        var loginmsg2 = $(".loginmsg").text();
        var msg = $(".msg").text();
        if(msg.length == 0 && loginmsg2.length == 0){
            $(".msg").html("系统异常，请联系管理员!")
        }


    })
</script>
</html>
