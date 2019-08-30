<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/2/20
  Time: 22:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>个人中心</title>
    <link rel="stylesheet" href="/static/css/personal.css">
    <script src="/static/js/jquery-3.2.1.min.js"></script>
    <script src="/static/js/personal.js"></script>
    <script src="/static/js/personal-util.js"></script>

</head>
<body>
<%@include file="/jsp/index-top.jsp"%>
    <div class="pershead">
        <div class="userheadbox">
            <div class="userimg">
                <img src="${sessionScope.SesheadPicPath}" alt="头像">
            </div>
            <div class="updateheadimg">修改头像</div>
        </div>
        <div class="userinfo">
            <div class="infoone">
                <label>您好:&nbsp;</label><label class="Sessionusername">${sessionScope.username}</label>
            </div>
            <hr/>
            <div class="infotwo">
                <div class="infotwo1">
                    <label>账户:</label><label class="userphone">${sessionScope.telephone}</label>
                </div>
                <div class="infotwo2">
                    <label>上次退出时间:</label><label class="loginDate">2019/01/01-12:00</label>
                </div>
            </div>
        </div>
        <%--地址 天气--%>
        <div class="rightinfo">
            <div>
               <img src="/static/images/ip_address.png"> <label class="address">贵州省贵阳市</label><img src="/static/images/Weather.png"><label>天气:晴朗</label>
            </div>
        </div>
    </div>
    <div class="persmenu">
        <ul>
            <li class="targ basicinfotag">基本信息</li>
            <li class="sharetag">知识分享</li>
            <li class="mycollecttag">我的收藏</li>
            <li class="jointhemestag">参与话题</li>
        </ul>
    </div>
    <div class="menucontext">
        <%--基本信息--%>
        <div class="perscon basicinfo ">
            <div class="persinfo">
            <table class="usertable">
                <tr class="persinfotitle ">
                    <td colspan="2">个人信息</td>
                </tr>
                <tr class="pusername">
                    <td class="">姓名</td>
                </tr>
                <tr class="ppassword">
                    <td>密码</td>
                </tr>
                <tr class="ptelephone">
                    <td >电话</td>
                </tr>
                <tr class="pemail">
                    <td>邮件</td>
                </tr>
                <tr class="psex">
                    <td>性别</td>
                </tr>
                <tr class="pbirthday">
                    <td>生日</td>
                </tr>
                <tr class="paddress">
                    <td>居住地址</td>
                </tr>
                <tr class="pprofile">
                    <td>简介</td>
                </tr>
                <tr class="updateuser">
                    <td colspan="2">修&nbsp;&nbsp;改</td>
                </tr>

            </table>
        </div>
            <div class="updateinfo">
                <table class="updatetable">
                    <tr class="updateinfotitle ">
                        <td colspan="2">修改个人信息</td>
                    </tr>
                    <tr>
                        <td class="username">姓名</td>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td class="password">密码</td>
                        <td><input type="password"></td>
                    </tr>
                    <tr>
                        <td class="telephone">电话</td>
                        <td><input type="text"></td>
                    </tr>
                    <tr>
                        <td class="email">邮件</td>
                        <td><input type="email"/></td>
                    </tr>
                    <tr>
                        <td class="sex">性别</td>
                        <td>
                            <select>
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="birthday">生日</td>
                        <td><input type="date"></td>
                    </tr>
                    <tr>
                        <td class="address">居住地址</td>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td class="profile">简介</td>
                        <td><textarea></textarea></td>
                    </tr>
                    <tr class="updatesubmit">
                        <td colspan="2">提&nbsp;&nbsp;交</td>
                    </tr>

                </table>
            </div>
        </div>
            <%--知识分享--%>
        <div class="perscon zhishifenx ">
            <div class="uploadform">
                <label style="color: red;margin-left: 20px">*</label>
                <small style="color: #cc2b00;">文件名会成为文档的标题</small>
                <form action="/file/upload" method="post" enctype="multipart/form-data">
                    <input type="file" name="uploadfile"class="input1"/>
                    <input type="submit" value="分&nbsp;享" class="input2">
                </form>

            </div>
            <div class="uploadfileinfo">
                <table class="filestable">
                    <tr class="fileonetr">
                        <td>文档格式</td>
                        <td>文档标题</td>
                        <td>文档大小</td>
                        <td>上传时间</td>
                        <td>下载量</td>
                        <td>收藏量</td>
                        <td>操作</td>
                    </tr>
                </table>
            </div>
        </div>
            <%--我的收藏--%>
            <div class="perscon mycollect">
                <div class="mycellectfile">
                    <table class="mycellecttable">
                        <tr class="mycellectfirsttr">
                            <td>文件格式</td>
                            <td class="filestitle">文件标题</td>
                            <td>文件大小</td>
                            <td>上传者</td>
                            <td>上传时间</td>
                            <td>收藏时间</td>
                            <td>下载量</td>
                            <td>收藏量</td>
                            <td>操作</td>
                        </tr>
                    </table>
                    <div class="nocollect">您还没有收藏文件</div>
                </div>
            </div>
            <%--参与话题--%>
            <div class="perscon jointopic ">
              <div class="jointhemes">
                    <label class="publishtopic">发布的话题</label>
                    <table class="publishtables">
                        <tr style="height: 25px;line-height: 25px">
                            <td class="editthemes">操作</td>  <%-- 删除 --%>
                            <td class="publishtitle">标题</td>
                            <td>内容</td>
                            <td>评论数</td>
                            <td class="publictime">发帖时间</td>
                        </tr>
                    </table>
                  <div class="publishmenu">
                      <ul>
                          <li><img src="/static/images/personal/plus.png"/>增加</li>
                          <li><img src="/static/images/personal/minus.png"/>删除</li>
                          <li><img src="/static/images/personal/Modify.png"/>修改</li>
                      </ul>
                  </div>
                  <%--修改主题盒子--%>
                  <div class="modifythemes">
                    <div class="modify-error">
                        <img src="/static/images/plugico/sign_error.png">
                    </div>
                      <div class="modifycon">
                          <h3>修改话题</h3>
                         <div class="modifyinp">
                           <label>标题:</label><input type="text">
                             <label>内容:</label>
                         </div>
                          <div class="modify-textarea">
                              <textarea></textarea>
                          </div>
                          <div class="modifythemes">
                              修改
                          </div>
                      </div>
                  </div>
                  <div class="nothemes">您没有发布话题</div>
              </div>
                <div class="joinrepy">
                    <label class="repytopic">回复的话题</label>
                    <table class="repytables">
                        <tr style="height: 25px">
                            <td>操作</td>
                            <td>话题标题</td>
                            <td class="repycontext">回复内容</td>
                            <td>回复时间</td>
                        </tr>
                    </table>
                    <%--回复菜单--%>
                    <div class="repymenu">
                        <ul>
                            <li><img src="/static/images/personal/plus.png"/>增加</li>
                            <li><img src="/static/images/personal/minus.png"/>删除</li>
                            <li><img src="/static/images/personal/Modify.png"/>修改</li>
                        </ul>
                    </div>
                    <%--修改回复内容--%>
                    <div class="modify-repybox">
                        <div class="mod-repy-error">
                            <img src="/static/images/plugico/sign_error.png"/>
                        </div>
                        <div class="mod-reptitle">
                            <label>修改回复内容</label>
                        </div>
                        <div class="mod-rep-theTitle">
                            <label>话题标题:</label><div class="mod-themestitle"></div>
                        </div>
                        <div class="mod-repcon">
                            <textarea></textarea>
                        </div>
                        <div class="mod-rep-submit">
                          <label>修改</label>
                        </div>
                    </div>
                    <div class="norepythemes">您没有参与回复话题</div>
                </div>
            </div>

    </div>
    <%--公共幕布--%>
    <div class="publicbox">

    </div>

    <%--悬浮窗口--%>
    <%--上传头像--%>
    <div class="uploaduserheadpic">
        <label>更新头像<div class="erro_sign"><img src="/static/images/plugico/sign_error.png"/></div></label>
        <%--<input type="file" class="headfile"><input type="submit" value="上传" class="submitheadpic">--%>
        <div class="picname">apple
        </div>
        <div class="leftarrowbox">
            <img src="/static/images/plugico/arrow_back_left.png">
        </div>
        <div class="headpicshow">
            <img class="picshow" src="${sessionScope.SesheadPicPath}" alt="用户头像"/>
        </div>
        <div class="rightarrowbox">
            <img src="/static/images/plugico/arrow_forward_right.png">
        </div>
        <div class="submitheadpiclab">
            上传
        </div>
    </div>

</body>
</html>
