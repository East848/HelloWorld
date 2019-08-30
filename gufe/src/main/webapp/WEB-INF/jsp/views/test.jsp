<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019-3-13
  Time: 16:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>测试</title>
    <script src="/static/js/jquery-3.2.1.min.js"></script>
</head>
<body>
  <div class="testbox">
      <form enctype="multipart/form-data" method="post">
          文件:  <input type="file" class="testfile" accept="image/*"> <div class="ddddd" style="height: 30px;width: 100px;cursor: pointer;background-color: #0e99ff;text-align: center;line-height: 30px;border-radius: 10px;margin-top: 10px;margin-left: 20px">提交</div>
      </form>
  </div>
<div>
    <label>头像</label>
    <img src="http://i3.hexunimg.cn/2016-06-06/184264782.jpg" alt="显示头像">
</div>
</body>
    <script>
      $(document).ready(function () {
        $(".ddddd").click(function () {
            var files = $(".testfile").val()
            console.log("files:"+ files)
            var file = files[0];
            console.log("file: "+file)
            var img = window.URL.createObjectURL(file);
            console.log("img: "+img)
        })
      })
/*
*
*    $(document).ready(function () {
           function showimg(event) {
               alert("d")
               var filePath = event.pathname[0].value;
               console.log(filePath)
           }

           function getFilePath(input) {
               if (input) {//input是<input type="file">Dom对象
                   if (window.navigator.userAgent.indexOf("MSIE") >= 1) {  //如果是IE
                       input.select();
                       return document.selection.createRange().text;
                   }
                   else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {  //如果是火狐  {
                       if (input.files) {
                           return input.files.item(0).getAsDataURL();
                       }
                       return input.value;
                   }
                   return input.value;
               }
           }

       })
* */
    </script>
</html>
