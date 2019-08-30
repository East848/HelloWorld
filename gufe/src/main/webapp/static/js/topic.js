$(document).ready(function () {

    //页面加载完后显示所以主题
    $.ajax({
        type:"get",
        url:"/themes/getallthemes",
        success:function (data) {
            console.log("success")
            writeThemes(data);
            getThemes(data)
        },
        error:function (data) {
            console.log(error())
        }
    })

    //发布主题
    $(".launchtheme").click(function () {
        //验证是否先登录
        $.ajax({
            type:"get",
            url:"/user/userLogin",
            success:function (data) {
                if (data.userID ==null){
                    alert("需要先登录！")
                    return false
                }else {
                    $(".themebox").show();
                }
            },
            error:function (data) {
                console.log(data)
            }
        })

    })
    $(".sign_error").click(function () {
        $(".themebox").hide();
    })
    $(".tblable2").click(function () {
        var inptheme =$(".inptheme").val();
        var textareaval = $("textarea").val();
        if (inptheme.length !=0){
            $.ajax({
                type:"post",
                url:"/themes/addthemes",
                dataType:"text",
                data:{
                    themetitle:inptheme,
                    themecontext:textareaval
                },
                success:function (data) {
                    location.href ="/topic"
                    alert("成功发布主题")

                },
                error:function (data) {
                    alert("发布主题失败")
                    console.log(data)
                }
            })
            $(".themebox").hide();
            $(".inptheme").html("")
            $("textarea").html("")
        }else{
            alert("您还没有输入主题,不能发布")
           return false
        }
    })

    //查看 跳转
    function getThemes(data) {
      $(".topictable tr td.itemtd").click(function () {
          var tr = $(this).parent();
          var tId =data.allthemes[tr.index()-1]["tId"];
           location.href = "/themesdetail?tId="+tId;
         /*  $.ajax({
               type:"get",
               url:"/repy/getallrepythemes",
               data:{
                   tId:tId
               },
               success:function (data) {
                console.log(data);
                location.href = "/themesdetail";
               },
               error:function (data) {
                   console.log(data)
               }
           })*/
       })
    }

    $(".tagu1 li").length









    //*************函数***********
    //写入后台返回的所有主题
    function writeThemes(data) {
        console.log(data)
        $.each(data,function (i,result) {
           if(data.allthemes.length!=0){
               for(var i=0;i<result.length;i++){
                   var item = "<tr><td>"+result[i]["themeTitle"]+"</td><td><div class='tdimg'><img src='/static/images/Message.png'/></div><label style='margin-left: 20px'>"+result[i]["commSum"]+
                       "</label></td><td><div class='peopimg'><img src='/static/images/plugico/people.png'/></div><label style='margin-left: 20px'>"+result[i]["user"].userName+"</label></td><td>"+
                       (themesTimeUtil(result[i]["releaseTime"]))+"</td><td class='itemtd'>查看</td></tr>";
                   $(".topictable").append(item);
               }
           }else{
               var itmel ="<tr><td><lable>没有发布主题</lable></td></tr>"
               $(".topictable").append(itmel);
           }
        })
    }

    //时间
    function themesTimeUtil(times) {
        //times = "2019/03/03-16:54:19"
        // console.log(times.substring(8,10))
        var time = times.substring(8,10);
        var date = new Date();
        var today =date.getDate();
        var dif =today -time;
        var result;
        switch (dif){
            case 0:
                result = times.substring(11,19)
                break;
            case 1:
                result = "昨天"+times.substring(11,19)
                break;
            case 2:
                result = "前天"+times.substring(11,19)
                break;
            default:
                if (times.substring(5,6) == 0 && times.substring(8,9) == 0){
                    result = times.substring(6,7)+"月"+times.substring(9,10)+"日 "+times.substring(11,19);
                    console.log("aa"+times.substring(6,7))
                }else if (times.substring(5,6) == 0 && times.substring(8,9) != 0){
                    result = times.substring(6,7)+"月"+times.substring(8,10)+"日"+times.substring(11,19);
                }else{
                    result = times.substring(5,7)+"月"+times.substring(8,10)+"日"+times.substring(11,19);
                }
        }
        return result
    }

})