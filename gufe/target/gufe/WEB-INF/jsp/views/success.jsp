<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/2/11
  Time: 9:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>成功页面</title>
</head>
<body>
<%
//    String logResult = request.getParameter("logResult");  <==> ${param.logResult}
%>
    <h2>SUCCESS</h2>
    <%--<h2><%=logResult%></h2>--%>
    <label>result:${logResult}</label>
</body>
</html>
