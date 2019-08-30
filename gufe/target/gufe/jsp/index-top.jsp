<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019-3-18
  Time: 10:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Top</title>
    <%--<link rel="stylesheet" href="/static/css/index.css">--%>
    <link rel="stylesheet" href="/static/css/index-top.css">
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/index-top.js"></script>
</head>
<body>
<%--网站头部--%>
<div class="home-top">
    <div class="logo-img">
        <img src="/static/images/qq-logo.jpg" alt="网站logo" >
    </div>
    <div class="top-nav">
        <ul>
            <li>首页</li>
            <li>贵财智库</li>
            <li>话题圈</li>
            <li>个人中心</li>
        </ul>
    </div>
    <div class="top-search">
        <div class="search-input">
            <input type="text" name="search-inp"  class="search-inp">
        </div>
        <div class="search-button">
            <div class="search-img">
                <img src="/static/images/plugico/search.png">
            </div>
            <div class="search-lab">搜索</div>
        </div>
    </div>
    <div class="top-user">
        <div class="usersign">
            <span class="login">登录</span>
            <span class="reg">注册</span>
        </div>
        <div class="top-sign-result">
            <span class="sr-name"><label style="color: #333333">您好:</label> <label class="top-username">${sessionScope.username}</label></span>
            <div class="userheadimg">
                <img src="${sessionScope.SesheadPicPath}" alt="头像">
            </div>
            <div class="usermenu">
                <ul>
                    <li>个人中心</li>
                    <li>退出</li>
                </ul>
            </div>
        </div>
    </div>
</div>
</body>
</html>
