<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/2/22
  Time: 9:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>话题圈</title>
    <link rel="stylesheet" href="/static/css/topic.css">
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/topic.js"></script>
</head>
<body>
    <div class="topichead">
       <%@include file="/jsp/index-top.jsp"%>
    </div>
    <div class="topiccon">
        <div class="topicleft">
            <table class="topictable">
                <tr class="themetr">
                    <td>标题</td>
                    <td>评论数</td>
                    <td>发帖者</td>
                    <td>发帖时间</td>
                    <td>操作</td>
                </tr>
            </table>
        </div>
        <div class="topicreght">
            <div class="reghtimg">
               <img src="/static/images/topic/spring.jpg">
            </div>
            <div class="launchtheme">
                发起主题
            </div>
            <div class="themebox">
                <label class="tblable1">发表主题</label> <div class="sign_error"><img src="/static/images/plugico/sign_error.png"/></div><br/><br/>
                <label>主题:</label><input type="text" class="inptheme"><br/>
                <label>内容:</label>
                <textarea placeholder="内容可为空..." maxlength="200"></textarea>
                <label class="tblable2">发&nbsp;&nbsp;表</label>
            </div>
            <div class="themetag">
                <hr/>
                <div class="tagone">一吻定情</div>
                <label class="taglab1">中国梦</label>
                <label class="taglab2">大数据</label>
                <label class="taglab3">人工智能</label>
                <label class="taglab4">申请书模板</label>
                <label class="taglab5">试卷</label>
                <label class="taglab6">课件</label>
                <label class="taglab7">笔记</label>
                <label class="taglab8">小说</label>

            </div>
        </div>
    </div>
</body>
</html>
