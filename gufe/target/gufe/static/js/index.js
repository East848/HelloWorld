$(document).ready(function () {
    $(".userDIV").show();
    $(".userresult").hide();


    //搜索
    $(".searchbutton").click(function () {
        var searchValue = $.trim($(".search input").val());
        if (searchValue.length ==0){
            alert("查询条件不能为空")
        }else {
            alert(searchValue)
            window.open("/search")
        }
    })


    //图片轮播
    //轮播导航
    var index = 0; //当前显示图片序号
    var playTime = null;
    var imgLen = $(".first .imgplay img").length; //图片数量
    PlayImg()
    $(".playNav ul li").click(function () {
        var index = $(this).index();
        showImg(index)
    })
    //方法
    function showImg(i) {
        $(".first .imgplay").eq(i).show().siblings(".imgplay").hide();
    }
    function PlayImg() {
        if (playTime != null){
            window.clearInterval(playTime)
        }
        playTime = window.setInterval(function () {
            if (index == imgLen){
                index = 0;
            }
           if (index == 0){
               $(".playNav ul li").eq(index).css("background-color","#ffdf20")
               $(".playNav ul li").eq(imgLen - 1).css("background-color","#e2e2e2")
           }else{
               $(".playNav ul li").eq(index-1).css("background-color","#e2e2e2")
               $(".playNav ul li").eq(index).css("background-color","#ffdf20")
           }
            showImg(index)
            index++
            // $(".playNav ul li").eq(index).css("background-color","#f20900")
        },2000)
    }
    
    //鼠标悬浮
    $(".first .imgplay").mouseover(function () {
        $(".first .imgplay img").css("transform",1.1);
        window.clearInterval(playTime)
    })
    $(".first .imgplay").mouseout(function () {
        PlayImg()
    });
    $(".playNav ul li").mouseover(function () {
        $(".first .imgplay img").css("transform",1.1);
        window.clearInterval(playTime)
    })
    $(".playNav ul li").mouseout(function () {
        PlayImg()
    })




    //请求数据
    //热门话题
    $.ajax({
        type:"get",
        url:"/themes/themestopten",
        success:function (data) {
            writeThemesTop10(data)
        },
        error:function (data) {
           alert("请求错误")
        }
    })


    $(".hotpicul").on("mouseover",".TTopli",function () {
        var index = $(this).index()
        $(".hotpicul li").eq(index).children().siblings(".themescenterbox").css("background-color","#F3F3F3");
    })
    $(".hotpicul").on("mouseout",".TTopli",function () {
        var index = $(this).index()
      $(".hotpicul li").eq(index).children().siblings(".themescenterbox").css("background-color","white");
    })

    $(".hotpicul").on("click",".TTopli",function () {
        var index = $(this).index()
        var tId= $(".hotpicul li").eq(index).children().siblings(".themesId").text()
        location.href = "/themesdetail?tId="+tId;

    })


    //下载排行榜
    $.ajax({
        type:"get",
        url:"/file/downloadlisttopten",
        success:function (data) {
            writeTop10(data)
        },
        error:function (data) {
            console.log(data)
        }
    })

    //热门作者
    $.ajax({
        type:"get",
        url:"user/hotauthor",
        success:function (data) {

            HotAuthor(data);
        },error:function () {
            console.log(data)
        }
    })



    //函数
    //写入话题Top
    function writeThemesTop10(data) {
        $.each(data,function (j,result) {
           for (var i = 0;i < result.length;i++){
               var liItem = "<li class='TTopli'><label class='themesId'>"+result[i]["tId"]+"</label><div class='tuimg'><img src='"+result[i]["user"].headPicPath+"'/></div><div class='themescenterbox'><div class='peopleIco'> "+
                   "<img src='/static/images/plugico/people.png'/></div><label class='TTopusername'>"+result[i]["user"].userName+"</label><label class='TTopTitle'>"+
                   result[i]["themeTitle"]+"</label><div class='TTopMessageImg'><img src='/static/images/Message.png'/></div><label class='TTopCommNum'>"+result[i]["commSum"]+"</label>"+
                   "<label class='TTopTime'>"+IndexTimeUtil(result[i]["releaseTime"])+"</label></div></li>"
               $(".hotpicul").append(liItem)
           }
        })
    }   

    //写入top10
    function  writeTop10(data){
        if (data.downloadlisttopten.length != 0){
            $.each(data,function (j,result) {
                for(var i = 0; i<result.length;i++){
                    var temTr = "<tr><td>"+addImg(result[i]["fIco"])+"</td><td>"+result[i]["fTitle"]+
                        "</td><td>"+result[i]["user"].userName+"</td><td>"+result[i]["downloadSum"]+"</td></tr>";
                    $(".downloadtop10tab").append(temTr)
                }

            })
        }else {
            var tem ="<tr><td>没有文件</td></tr>"
            $(".downloadtop10tab").append(tem)
        }
    }

    //写入HotAuthor Top3
    function HotAuthor(data) {

        var author =data.hotAuthor
        $(".hotauthorfristbox .authorimg img").attr("src",author[0].headPicPath);
        $(".hotauthorfristbox .authorname").text(author[0].userName)
        $(".hotauthorfristbox .authorprofile").text(author[0].profile)

        $(".hotauthorsecondbox .authorimg img").attr("src",author[1].headPicPath);
        $(".hotauthorsecondbox .authorname").html(author[1].userName)
        $(".hotauthorsecondbox .authorprofile").html(author[1].profile)

        $(".hotauthorthirdbox .authorimg img").attr("src",author[2].headPicPath);
        $(".hotauthorthirdbox .authorname").html(author[2].userName)
        $(".hotauthorthirdbox .authorprofile").html(author[2].profile)
    }

    //图片格式
    function addImg(fico) {
        var ficotem =$.trim(fico.toLocaleLowerCase());
        if (ficotem =="docx"  ||ficotem =="doc" ){
            return "<img src='/static/images/fileico/word.png'/>"
        }else if(ficotem =="xls"  ||ficotem =="xlsx") {
            return "<img src='/static/images/fileico/excel.png'/>"
        }
        else if(ficotem =="jpg"  ||ficotem =="jpeg" || ficotem =="png"  ||ficotem =="ioc" ) {
            return "<img src='/static/images/fileico/img.png'/>"
        }
        else if(ficotem =="ppt"  ||ficotem =="pptx") {
            return "<img src='/static/images/fileico/ppt.png'/>"
        }else if (ficotem == "pdf"){
            return "<img src='/static/images/fileico/pdf.png'/>"
        }else{
            return "<img src='/static/images/fileico/pdf.png'/>"
        }

    }

    //时间
    function IndexTimeUtil(times) {
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
                }else if (times.substring(5,6) == 0 && times.substring(8,9) != 0){
                    result = times.substring(6,7)+"月"+times.substring(8,10)+"日&nbsp;"+times.substring(11,19);
                }else{
                    result = times.substring(5,7)+"月"+times.substring(8,10)+"日&nbsp;"+times.substring(11,19);
                }
        }
        return result
    }


})

