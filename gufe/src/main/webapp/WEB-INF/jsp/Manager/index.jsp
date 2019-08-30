<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/2/15
  Time: 9:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>后台管理</title>
    <link rel="stylesheet" href="/static/css/mag.css">
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/mag.js" ></script>
</head>
<body>
    <div>
        <div class="headetitle">
            <span>后台管理</span>
        </div>
        <div class="tagTitle">
            <ul>
                <li class="one">功能菜单</li>
                <li class="act">用户管理</li>
                <li>文件管理</li>
               <%-- <li>话题管理</li>
                <li>回复管理</li>--%>
            </ul>
        </div>
        <div class="Mangcontent">
            <div class="con userMang">
                <div class="userEditTag">
                    <span class="allUserTag">查询所有用户</span>
                    <span class="oneUserTag">查询单个用户</span><input type="text" placeholder="请输入手机号" class="oneinput">
                </div>
               <div class="usermagCon">
                   <table class="userMangTable">
                       <tr class="usermagTr0">
                           <td>编号</td>
                           <td>ID</td>
                           <td>姓名</td>
                           <td>密码</td>
                           <td class="telephone">电话</td>
                           <td>删除</td>
                       </tr>
                     <%--  <tbody>
                            <c:forEach items="${requestScope.users}" var="user">
                              <tr>
                                  <td>${user.uid}</td>
                                  <td>${user.username}</td>
                                  <td>${user.password}</td>
                                  <td>${user.telephone}</td>
                                  <td>${user.email}</td>
                                  <td>${user.sex}</td>
                                  <td>${user.brithday}</td>
                                  <td>${user.address}</td>
                              </tr>
                            </c:forEach>
                       </tbody>--%>
                   </table>
               </div>
            </div>
            <div class="con fileMang ">
               <div class="MfilesMenu">
                   <ul>
                       <li>按下载量排序</li>
                       <li>按收藏排序</li>
                   </ul>
               </div>
                <div class="MfilesCon">
                    <table class="MfilesTable">
                        <tr class="filestr">
                            <td>文件格式</td>
                            <td class="filestitle">文件标题</td>
                            <td>文件大小</td>
                            <td>上传者</td>
                            <td>上传时间</td>
                            <td>下载量</td>
                            <td>收藏量</td>
                            <td>操作</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="con themesMang">

            </div>
            <div class="con repyThemesMang">
                repythemes
            </div>
        </div>
    </div>
</body>
</html>
