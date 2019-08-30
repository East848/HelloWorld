<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019-3-8
  Time: 14:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>主题详细信息</title>
    <link rel="stylesheet" href="/static/css/themesdetail.css">
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/themesdetail.js"></script>
</head>
<body>
<%--获取get传过的主题id--%>
    <div>
        <div class="themeparmid"><%out.print(request.getParameter("tId"));%></div>
    </div>
<%--头部--%>
    <div class="themedethead">
        <%@include file="/jsp/index-top.jsp"%>
    </div>
   <div class="themedetailContext">
       <div class="themedetleft">
           <div class="themedetcon">
               <div class="themespaerent">
                   <%--主题信息--%>
                   <div class="themesinfo">
                       <label class="info1"></label>
                       <label class="info2"><img src="/static/images/plugico/people.png"></label>
                       <label class="info3"><img src="/static/images/plugico/Time.png"></label>
                   </div>
                   <%--主题内容--%>
                   <div class="themescon"></div>
                   <%--编辑主题--%>
                   <div class="themesedit">
                       <p class="repyedit">回复</p>
                       <p class="collectdit">收藏</p>
                   </div>
               </div>
               <div class="repycon">
                   <%-- <div class="repy repyuser">
                        <div class="userpic">
                            <img src="/static/images/headpic/ms1.jpg">
                        </div>
                        <label class="username">唐钱东</label>
                        <div class="repynumbox">
                           <label class="repynumlab">1楼</label>
                        </div>
                        <p class="repycentcon">
                            天越来越冷了，以后如果我不回复你消息，不是我高冷，是我手冷。
                        </p>
                        <div class="repyrightbox">
                            <label class="repyrighlab">回复</label>
                        </div>
                    </div>
                    <div class="repy repyuser2">
                        <div class="userpic">
                            <img src="/static/images/headpic/ms2.jpg">
                        </div>
                        <label class="username">小米渣</label>
                        <div class="repynumbox">
                            <label class="repynumlab">2楼</label>
                        </div>
                        <p class="repycentcon">
                            当我讨厌一个人的时候，如果这个人突然说喜欢我，那我就一点也不讨厌对方了。就是这么有原则，无法讨厌一个有眼光的人。
                        </p>
                        <div class="repyrightbox">
                            <label class="repyrighlab">回复</label>
                        </div>
                    </div>
                    <div class="repy repyuser3">
                        <div class="userpic">
                            <img src="/static/images/headpic/ms3.jpg">
                        </div>
                        <label class="username">大洋芋</label>
                        <div class="repynumbox">
                            <label class="repynumlab">3楼</label>
                        </div>
                        <p class="repycentcon">
                            知道你今天为啥特别冷吗？因为你没我这么暖的男朋友，冻死你，傻比。
                        </p>
                        <div class="repyrightbox">
                            <label class="repyrighlab">回复</label>
                        </div>
                    </div>--%>
               </div>
               <div class="repywinbox">
                   <label class="boxlab1">回复话题 <img src="/static/images/plugico/sign_error.png"/></label>
                   <textarea class="repytextarea"></textarea>
                   <label class="boxlab2">提交</label>
               </div>
           </div>
       </div>
   </div>
    <div class="publicbox">
        <div class="userPicPath">
            <img src="${sessionScope.SesheadPicPath}">
        </div>
    </div>
<%--公共区域--%>
</body>
</html>
