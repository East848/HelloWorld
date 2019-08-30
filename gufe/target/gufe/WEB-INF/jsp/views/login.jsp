<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/1/29
  Time: 17:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户登录</title>
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/login.js"></script>
    <link rel="stylesheet" href="/static/css/login.css">
</head>
<body>
    <div class="loginbox">
        <div class="userform">
            <h3>User&nbsp;&nbsp;&nbsp;&nbsp;Login</h3>
            <table>
                <tr>
                    <td class="loginLable">手机号:</td>
                    <td><input type="text" name="telephone" placeholder="请输入手机号"  class="telephone"></td>
                </tr><br/><br/>
                <tr>
                    <td class="loginLable">密&nbsp;&nbsp;码:</td>
                    <td><input type="password" name="password" placeholder="请输入密码" class="password"></td>
                </tr>
            </table>
            <button class="login">登&nbsp;&nbsp;录</button>
        </div>
    </div>

</body>
</html>
