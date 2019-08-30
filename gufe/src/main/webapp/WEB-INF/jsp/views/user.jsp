<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019-3-18
  Time: 22:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户注册登录</title>
    <link rel="stylesheet" href="/static/css/user.css">
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/user.js"></script>
</head>
<body>
    <div class="user-top">
        <%@include file="/jsp/index-top.jsp"%>
    </div>
    <div class="usercon">
        <img src="/static/images/login-bg.jpg">
       <div class="logincon">
            <div class="userform">
                <label>账号(手机号)</label><br/>
                <input type="text" name="telephone" class="telephone"><br/>
                <label>密码</label><br/>
                <input type="password" name="password" class="password"><br/>
                <small class="forget">忘记密码?</small><br/>
                <button class="loginbut">登录</button>
            </div>
        </div>
        <div class="regcon">
            <table class="regtab">
                <tr>
                    <td><label>用户名:</label></td>
                    <td><input type="text" name="username" class="reg-username"></td>
                </tr>
                <tr>
                    <td><label>手机号:</label></td>
                    <td> <input type="text" name="telephone" class="reg-telephone"></td>
                </tr>
                <tr>
                    <td><label>密&nbsp;&nbsp;&nbsp;码:</label></td>
                    <td><input type="password" name="password" class="reg-password"></td>
                </tr>
                <tr>
                    <td><button class="regbut">注册</button></td>
                </tr>
            </table>
        </div>
        <div class="forgetbox">
            <div class="errorbox">
                <img src="/static/images/plugico/sign_error.png"/>
            </div>
            <div class="optiobox option1">
                <label>手机号:</label><input type="text" class="fphone" placeholder="输入注册的手机号">
            </div>
            <div class="optiobox option2">
                <label>姓名:</label><input type="text" class="fname" /><button class="forgetbut">找回</button>
            </div>
            <p class="forget-result"><%--已找到您的密码:--%></p>
            <div class="forgetnum">
                <label class="tarlab ">1</label><label class="forlab">2</label>
            </div>
        </div>
    </div>

</body>
</html>
