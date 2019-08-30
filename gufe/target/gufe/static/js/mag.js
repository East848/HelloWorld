$(document).ready(function () {
    // 选项卡
    $(".con").eq(0).show();
    var i;
    $(".tagTitle ul li").click(function () {
        //获取当前索引
        i=$(this).index();
       if(i != 0){  //功能菜单不需要跳转
           // 给当前li加样式“act”，其他移除
           $(".tagTitle ul li").eq(i).addClass("act").siblings().removeClass("act");
           //让索引为i的内容显示，其他隐藏
           $(".con").eq(i-1).show().siblings(".con").hide();
       }

    })

    //用户管理
    //获取所以用户
    $(".allUserTag").click(function () {
        $.ajax({
            type:"get",
            dataType:"json",
            contentType:"application/json;charset=utf-8",
            url:"/Manager/getalluser",
            success:function (data) {
                allData(data);
            },
            error:function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus)
                alert(textStatus)
            }
        })
    })
    //获取单个用户
    $(".oneUserTag").click(function () {
        var telephone =$(".oneinput").val()
        if (telephone.length != 11){
            alert("请重新输入手机号！")
        }else {
            $.ajax({
                type:"get",
                dataType:"json",
                contentType:"application/json;charset=utf-8",
                url:"/Manager/getoneuser?telephone="+telephone,
                success:function (data) {
                    oneData(data)
                },
                error:function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus)
                }
            })
        }

    })
    //显示输入框
    $(".oneUserTag").mouseover(function () {
        $(" .oneinput").css("display","block");
    })
    $(".usermagCon").mouseover(function () {
        $(".oneinput").css("display","none");
    })
    //删除用户
    $(".usermagCon").on("click",".magdelete",function () {
        var trData =$(this).parent().parent();
        var uId = trData.children().eq(1).text();
        var uName = trData.children().eq(2).text();
        var bool = confirm("您确定删除用户:  "+uName+" 吗？")
        if (bool){
            $.ajax({
                type:"post",
                url:"/Manager/deluser",
                data:{
                    uId:uId
                },
                success:function (data) {
                    location.reload();
                    alert("删除成功")
                },error:function (data) {
                    alert("删除失败")
                }
            })
        }
    })



    // 文件管理
    //获取所有文件
    $.ajax({
        type:"get",
        url:"/file/readAllFile",
        success:function (data) {
            WriterFiles(data)
        },
        error:function (data) {
            console.log("error: ")
            console.log(data)
        }
    })
    //删除
    $(".MfilesTable").on("click",".removefile",function () {
        var fId = $(this).next().text();
        if (fId.length !=0 ){
            $.ajax({
                type:"post",
                url:"/Manager/Managerdelfiles",
                data:{
                    fId:fId
                },
                success:function (data) {
                    location.reload()
                    alert(data.msg)
                },
                error:function (data) {
                    alert("删除文件当中出现异常")
                }
            })
        }else{
            alert("操作错误");
        }
    })

    //排序
    $(".MfilesMenu ul li").click(function () {
        var index = $(this).index();
        if (index == 0){
            SortByDownload()
        }else if(index == 1){
            SortByCollect()
        }
    })







    //*******函数方法********

    //用户管理

    //将后台传入的用户对象写入表格中
    function UserDataWriterTable(data) {
        $.each(data, function (i, result) {
            for (var i = 0; i < result.length; i++) {
                var item = "<tr><td>"+(i+1)+"</td><td>" + result[i]["uId"] + "</td><td>" + result[i]["userName"] + "</td><td>" + result[i]["password"] +
                    "</td><td>" + result[i]["telephone"] + "</td><td><label class='magdelete'>删除</label></td></tr>";
                $('.usermangtable').append(item);
            }
        });
    }
    //写入全部用户
    function allData(data) {
        $(".usermagCon h2.temH2").remove();
        //alert(data.users.length)  5
        var number =$(".userMangTable tr").length;
        var userdata =data.users;
        if(number != 1 && number-1 == userdata.length()){
        }else {
            $(".userMangTable tr.usermagTr0").show();
            $(".userMangTable tr").not($(".userMangTable tr.usermagTr0")).remove();
            UserDataWriterTable(data)
        }
    }
    //写入单个用户
    function oneData(data) {
        $(".usermagCon h2.temH2").remove();
        $(".userMangTable tr").not( $(".userMangTable tr").eq(0)).remove();
        if(data.users.length != 0) {
            $(".userMangTable tr.usermagTr0").show();
            UserDataWriterTable(data)
        }else {
            $(".userMangTable tr.usermagTr0").hide();
            var h2 = "<h2 class='temH2'>没有该用户</h2>"
            $(".usermagCon").append(h2)
        }
    }



    //文件管理

    //将后台传来的文件的对象写入表格中
    function WriterFiles(data) {
        $(".MfilesTable tr:not('.filestr')").remove();
        $(".noAllFileTr").remove()
        $.each(data, function (i, result) {
            if (result.length != 0){
                for (var i = 0; i < result.length; i++) {
                    var item = "<tr><td>" + addImg(result[i]["fIco"]) + "</td><td>" + result[i]["fTitle"] + "</td><td>" + fileSize(result[i]["fSize"]) +"</td><td>"+result[i]["user"].userName+
                        "</td><td>" +MangTimeUtil(result[i]["uploadDate"])+ "</td><td>" + result[i]["downloadSum"] + "</td><td>" +result[i]["collectSum"]+
                        "</td><td><label class='removefile'>删除</label><label style='display: none'>"+result[i]["fId"]+"</label></td></td></tr>";
                    $(".MfilesTable").append(item);  //<td class='edit1'><label class='editl1'>查看</label></td>
                }
            }else {
                var item ="<tr><td colspan='8' class='noAllFileTr' style='color: red;font-weight: bold'>没有文件</td></tr>";
                $(".MfilesTable").append(item);
            }
        });
    }

    //按下载量排序
    function SortByDownload() {
        $.ajax({
            type:"get",
            url:"/file/sortbydownload",
            success:function (data) {
                WriterFiles(data)
            },
            error:function (data) {
                console.log("error: ")
                console.log(data)
            }
        })
    }
    //按收藏量量排序
    function SortByCollect() {
        $.ajax({
            type:"get",
            url:"/file/sortbycollect",
            success:function (data) {
                WriterFiles(data)
            },
            error:function (data) {
                console.log("error: ")
                console.log(data)
            }
        })
    }
    
    
    
    //时间
    function MangTimeUtil(times) {
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

    //文件大小
    function fileSize(filesize) {
        var count =0,number=filesize,resultFileSize;
        var array =new Array("1024", "1048576", "1073741824", "1099511627776", "1125899906842624", "1152921504606846976")
        for (var i = 0; i < array.length; i++) {
            count++;
            var lon =parseInt(array[i])
            if (number < lon) {
                var aa = lon / 1024;
                switch (count) {
                    case 1:
                        resultFileSize = number.toFixed(2) + "B";
                        break;
                    case 2:
                        resultFileSize = (number = number / aa).toFixed(2) + "KB";

                        break;
                    case 3:
                        resultFileSize = (number = number / aa).toFixed(2) + "MB";
                        break;
                    case 4:
                        resultFileSize = (number = number / aa).toFixed(2) + "GB";
                        break;
                    case 5:
                        resultFileSize = (number = number / aa).toFixed(2) + "TB";
                        break;
                    case 6:
                        resultFileSize = (number = number / aa).toFixed(2) + "PB";
                        break;
                    default:
                        break;
                }
                break;
            }

        }
        return resultFileSize;
    }






})