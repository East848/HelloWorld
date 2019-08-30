<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/2/18
  Time: 8:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>首页</title>
    <link rel="stylesheet" href="/static/css/index.css">
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/index.js"></script>
</head>
<body>
    <div>
        <%--网站头部--%>
        <div class="headbox">
            <%@include file="/jsp/index-top.jsp"%>
        </div>

        <%--网站内容--%>
        <div class="context">
            <div class="leftCon">
                <div class="topthree">
                    <div class="first">
                        <div class="imgplay imgShow">
                            <img src="/static/images/home/first-img.jpg"/>
                            <label class="imgTitle">聚焦“全国两会”</label>
                        </div>
                        <div class="imgplay">
                            <img src="/static/images/home/first-dus2.jpg"/>
                            <label class="imgTitle">智能科技改变生活</label>
                        </div>
                        <div class="imgplay">
                            <img src="/static/images/home/first-dus1.jpg"/>
                            <label class="imgTitle">世界读书日</label>
                        </div>
                        <div class="playNav">
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>

                        </div>
                    </div>
                    <div class="second">
                        <img src="/static/images/home/second-img2.jpg" height="100%" width="100%">
                        <%--<img src="/static/images/Struggle1.jpg" height="100%" width="100%">--%>
                    </div>
                    <div class="third">
                        <img src="/static/images/home/third-img2.jpg" height="100%" width="100%">
                        <%--<img src="/static/images/Struggle2.jpg" height="100%" width="100%">--%>
                    </div>

                </div>
                <div class="hottopic">
                    <ul class="hotpicul">
                    </ul>
                </div>
            </div>
            <div class="rigthCon">
                <div class="notice">
                   <div class="noticeimg">
                       <img src="/static/images/home/notice.jpg">
                   </div>
                </div>
                <div class="downloadrank">
                   <div class="downtitle">
                       下载&nbsp;<label style="color: red;font-weight: bold">Top10</label>
                   </div>
                    <div class="downloadtop10box">
                        <table class="downloadtop10tab">
                            <tr class="top10trfirst">
                                <td>文件格式</td>
                                <td class="toptabtitle">文件标题</td>
                                <td>上传者</td>
                                <td>下载数</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="hotauthor">
                   <div class="hottitle">热门作者</div>
                    <div class="hotcon">
                        <div class="hotauthorfristbox">
                        <div class="authorimg">
                            <img src="/static/images/headpic/ms2.jpg"/>
                        </div>
                        <label class="authorname"></label>
                        <div class="authorprofile">
                        </div>
                    </div>
                        <div class="hotauthorsecondbox">
                            <div class="authorimg">
                                <img src="/static/images/headpic/ms1.jpg"/>
                            </div>
                            <label class="authorname"></label>
                            <div class="authorprofile">

                            </div>
                        </div>
                        <div class="hotauthorthirdbox">
                            <div class="authorimg">
                                <img src="/static/images/headpic/ms3.jpg"/>
                            </div>
                            <label class="authorname"></label>
                            <div class="authorprofile">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="hyperlink">
                    <a href="https://www.gufe.edu.cn/www/">贵州财经大学</a><br/><br/>
                    <a href="www.baidu.com">百度一下</a><br/><br/>
                    <a href="http://book.dangdang.com/">当当网</a>
                </div>
            </div>
            </div>
        </div>
    </div>
    <div>
       <%@include file="/jsp/index-foot.jsp"%>
    </div>
</body>
</html>
