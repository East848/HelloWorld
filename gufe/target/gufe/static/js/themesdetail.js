$(document).ready(function () {
    //请求显示主题及回复内容
    var themeid = $(".themeparmid").text();
    if (themeid.length != 0){
        //显示主题
        $.ajax({
            type:"get",
            url:"/themes/getonethemes",
            data:{
                tId:themeid
            },
            success:function (data) {
                console.log(data)
                var onethemes = data.onethemes;
                var themeTitle =onethemes.themeTitle;
                var userName =onethemes["user"].userName;
                var releaseTime =themesTimeUtil(onethemes.releaseTime);
                var themeContext =onethemes.themeContext;

                $(".themesinfo .info1").append(themeTitle)
                $(".themesinfo .info2").append(userName)
                $(".themesinfo .info3").append(releaseTime)
                if (themeContext.length !=0){
                    $(".themescon").append(themeContext)
                }else{
                    $(".themescon").remove();
                    $(".themesedit").css("top","35px")
                    $(".themespaerent").css("height","60px")
                    $(".repycon").css("top","80px")
                }
            },
            error:function (data) {
                console.log(data)
            }
        })
        //显示回复内容
        $.ajax({
            type:"get",
            url:"/repy/getallrepythemes",
            data:{
                tId:themeid
            },
            success:function (data) {
                console.log(data);
                writerepydata(data)
            },
            error:function (data) {
                console.log(data)
            }
        })

    }else {
        alert("请返回话题圈")
    }
    //请求回复内容
    //显示回复主题
    $(".repyedit").click(function () {
        //验证是否先登录
        $.ajax({
            type:"get",
            url:"/user/userLogin",
            success:function (data) {
                if (data.userID ==null){
                    alert("需要先登录！")
                    return false
                }else {
                    $(".repywinbox").css("display","block")
                    $(".winbox").css("display","block")
                }
            },
            error:function (data) {
                console.log(data)
            }
        })

    })
    // 隐藏回复框
    $(".boxlab1 img").click(function () {
        location.reload();
        $(".repywinbox").css("display","none")
        $(".winbox").css("display","none")
    })
        //添加回复
        $(".boxlab2").click(function () {
            var  themeId = $.trim($(".themeparmid").text())
            var textarea = $.trim($(".repywinbox textarea").val());
            if (textarea.length != 0) {
                $.ajax({
                    type:"post",
                    url:"/repy/addrepythemes",
                    async:true,
                    cache:false,
                    data:{
                        tId:themeId,
                        repyContext:textarea
                    },
                    success:function (data) {
                        console.log(data)
                        //alert("success")
                    },
                    error:function (data) {
                        console.log(data)
                        //alert("error")
                    }
                });
            }else{
                alert("回复内容不能为空")
                return false;
            }
            location.reload();
        })




    //函数
    //写入回复内容
    function writerepydata(data) {
        if (data.repyThemesList.length != 0) {
            $.each(data, function (j,result) {
                for (var i = 0; i < result.length; i++) {
                    var userPicPath = result[i]["user"].headPicPath;
                   var userName = result[i]["user"].userName;
                   var repyContext = result[i]["repyContext"];
                   var repyTime =result[i]["repyTime"];
                    var repycon =" <div style='position: absolute;left: 10px;top: "+i*110+"px; height: 100px;width: 99%;'>"+
                        "<div class='userpic'><img src='"+userPicPath+"'></div>"+
                        "<label class='username'>"+userName+"</label>"+
                        "<div class='repynumbox'><label class='repynumlab'>"+(i+1)+"楼</label></div>"+
                        "<p class='repycentcon'>"+repyContext+"<label style='color: #005bcd;margin-left: 30px'>"+themesTimeUtil(repyTime)+"</label>"+"</p>"+
                        "<div class='repyrightbox'>"+"<label class='repyrighlab'>回复</label></div>" +
                        "</div>";
                    $(".repycon").append(repycon);
                }
            })
        }else {
            var tempcon = "<h3 style='text-align: center;color: #cc2b00'>等你来沙发！</h3>";
            $(".repycon").append(tempcon)
        }

    }
    
    //时间
    function themesTimeUtil(times) {
        //times = "2019/03/20:10:15:01"
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
                    result = times.substring(6,7)+"月"+times.substring(9,10)+"日&nbsp;"+times.substring(11,19);
                    console.log("aa"+times.substring(6,7))
                }else if (times.substring(5,6) == 0 && times.substring(8,9) != 0){
                    result = times.substring(6,7)+"月"+times.substring(8,10)+"日&nbsp;"+times.substring(11,19);
                }else{
                    result = times.substring(5,7)+"月"+times.substring(8,10)+"日&nbsp;"+times.substring(11,19);
                }
        }
        return result
    }
})