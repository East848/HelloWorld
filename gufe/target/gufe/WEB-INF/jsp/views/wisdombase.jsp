<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/2/22
  Time: 9:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>贵财智库</title>
    <link rel="stylesheet" href="/static/css/base.css">
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/base.js"></script>
</head>
<body>
   <div class="boxhead">
       <%@include file="/jsp/index-top.jsp"%>
   </div>
   <div class="menutag">
       <ul>
           <li class="basetab">全部</li>
           <li>word</li>
           <li>excel</li>
           <li>ppt</li>
           <li>pdf</li>
           <li>图片</li>
           <li>其他</li>
       </ul>
       <div class="boxsearch">
           <label class="searchlab">搜索</label><input class="searchinput" type="text" placeholder="请输入文件名称或用户名">
       </div>
   </div>
    <div class="boxcon">
        <div class="allfiles">
            <table class="filestable">
                <tr class="filestr">
                    <td>文件格式</td>
                    <td class="filestitle">文件标题</td>
                    <td>文件大小</td>
                    <td>上传者</td>
                    <td>上传时间</td>
                    <td>下载量</td>
                    <td>收藏量</td>
                    <td colspan="2">操作</td>
                </tr>

            </table>
        </div>
    </div>
    <div class="fileshow">

    </div>
</body>
</html>
