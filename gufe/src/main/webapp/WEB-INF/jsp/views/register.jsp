<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/1/30
  Time: 10:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<html>
<head>
    <title>注册</title>
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/reg.js"></script>
    <style>
        *{
            padding: 0%;
            margin: 0%;
        }

        .regUser{
            position: absolute;
            top: 10%;
            left: 0%;
            background-color: #cccccc;
            height: 480px;
            width: 100%;
        }
        .regUser table{
            position: absolute;
            top: 10%;
            left: 37%;
        }
        .regUser .centT{
            position: relative;
            top: auto;
            left: 50%;
        }
    </style>
</head>
<body>
<div class="regUser">
    <table >
        <tr>
            <td class="centT"><h3>注册用户</h3></td>
        </tr>
        <tr>
            <td>用户名</td>
            <td><input type="text" name="username" class="username"></td>
        </tr>
        <tr>
            <td>密&nbsp;&nbsp;&nbsp;码</td>
            <td><input type="password" name="password" class="password"></td>
        </tr>
        <tr>
            <td>电&nbsp;&nbsp;&nbsp;话</td>
            <td><input type="text" name="username" class="telephone"></td>
        </tr>
        <tr>
            <td>邮&nbsp;&nbsp;&nbsp;件</td>
            <td><input type="email" name="email" class="email"></td>
        </tr>

        <tr>
            <td>性&nbsp;&nbsp;&nbsp;别</td>
            <td >
                <select  name="sex" class="sex" style="width: 100px">
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>生&nbsp;&nbsp;&nbsp;日</td>
            <td><input type="date" name="brithday" class="brithday"></td>
        </tr>
        <tr>
            <td>地&nbsp;&nbsp;&nbsp;址</td>
            <td><input type="text" name="username" class="address"></td>
        </tr>
        <tr>
            <td class="centT "><button class="reg">注册</button></td>
        </tr>
    </table>
</div>
</body>
<script>


</script>
</html>
