<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019-3-4
  Time: 22:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>文件操作异常</title>
    <style>
        .fileerrormsg{
            color: red;
            font-size: 30px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div style="text-align: center">
        <label class="fileerrormsg"> ${filetypeMsg}</label>
        <label class="fileerrormsg">${filerepeatmsg}</label>
        <label class="fileerrormsg">${nullFile}</label>
    </div>
</body>
</html>
