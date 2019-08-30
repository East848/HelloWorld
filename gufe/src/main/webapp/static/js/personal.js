$(document).ready(function () {

    //导航栏
    $(".persmenu ul li").click(function () {
       var i = $(this).index();
        $(".persmenu ul li").eq(i).addClass("targ").siblings().removeClass("targ")
        $(".perscon").eq(i).show().siblings(".perscon").hide();

    })

    //基本信息
    //头像操作
    $(".userheadbox").mouseover(function () {
        $(".userimg").css("opacity","0.5")
        $(".updateheadimg").css("opacity","1")
    })
    $(".userheadbox").mouseout(function () {
        $(".userimg").css("opacity","1")
    })
    $(".userheadbox").click(function (e) {
        $(".uploaduserheadpic").show();
    })
    $(".erro_sign").click(function () {
        $(".uploaduserheadpic").hide();  //隐藏上传头像窗口
        $(".publicbox").css("display","none"); //隐藏全屏幕布
        location.reload(true)
    })
    // 显示
    $(".userheadbox").click(function () {
       //1.显示选择图片窗口时  2.发起请求 3.获取用户上传的所有图片

        $(".publicbox").css("display","block");
        //图片名称
        $(".picname").html("");
        var picpath = $(".userimg img").attr("src") //picpath: /files/A_背影.png
        var picprofix =picpath.lastIndexOf("_")
        var picsuffix = picpath.lastIndexOf(".")
        var picname = picpath.substring(picprofix+1,picsuffix);
        $(".picname").append(picname)
       var username = $(".Sessionusername").text();
        $.ajax({
            type:"get",
            url:"/file/userpicList",
            success:function (data) {
                writeheadpicshow(data)
            },
            error:function (data) {
                alert("换头像错误，请联系管理员")
                console.log(data)
            }
        })
    })
    //上一张
    $(".leftarrowbox").click(function () {
        reducepic()
    })
    //下一张
    $(".rightarrowbox").click(function () {
        pulspic();
    })
    //上传
    $(".submitheadpiclab").click(function () {
        var picpath = $(".headpicshow img").siblings(".picshow").attr("src");
        var userphone = $(".userphone").text();
        $.ajax({
            type:"post",
            url:"/user/updateheadpic",
            data:{
                telephone:userphone,
                headPicPath:picpath
            },
            success:function (data) {
                console.log(data)
                location.href = "/personal"
            },
            error:function (data) {
                console.log(data)
            }
        })
        $(".uploaduserheadpic").hide();
        $(".publicbox").hide();
        location.replace("/personal")
    })



    //个人信息
    $(".usertable tr td").css({"width":"100px","height":"25px","line-height":"25px"})
    var userphone = $(".userphone").text();
    if(userphone.length != 0){
        $.ajax({
            type:"get",
            url:"user/userinfo",
            data:{
                telephone:userphone
            },
            success:function (data) {

                var user = data.users[0];
                writeuserinfo(user)
                copyuserinfo(user)
                writeUserLoginDate(data)
            },
            error:function (data) {
                console.log(data)
            }
        })
    }

    //文件上传背景显示
    $(".input1").click(function () {
        $(".input1").focus(function() {
            $(this).css({ 'border': '1px solid #14C58E', 'background': '#fff' });
        })
            .blur(function() {
                $(this).css('border', '1px solid #CDCDCD');
                var value = $(this).val(); // 获取值
                if (value == '') {// 判断是否是空字符串，而不是null
                    $(this).css('background','#F8F8F8');
                    return false;
                }else{
                    $(this).css('background','#fff');
                };
            });

    })
    //获取个人 上传文件
    $(".persmenu ul li").eq(1).click(function () {
        $.ajax({
            type:"get",
            url:"/file/getUserFiles",
            success:function (data) {
                DataFilesWriterTable(data)
            },
            error:function (data) {
                alert(data)
            }
        })



    })

    //删除文件 使用事件委托/ 事件代理
    $(" .filestable").on("click",".deluserfile",function () {
        var fId =$(this).next().text();
        if (fId.length !=0 ){
            $.ajax({
                type:"post",
                url:"file/delfile",
                data:{
                    fId:fId
                },
                success:function (data) {
                    location.href = "/personal"
                    alert("已移除")
                },
                error:function (data) {
                    alert("移除失败")
                }

            })
        }else{
            alert("操作错误");
        }
    })



    //我的收藏
    $(".mycollecttag").click(function () {
        //获取我的收藏文件
        $.ajax({
            type:"get",
            url:"/collect/getcollectfileslist",
            success:function (data) {
                writecollect(data)
            },
            error:function (data) {
                console.log(data)
            }
        })
    })

    //移除收藏 使用事件委托/ 事件代理
    $(" .mycellecttable").on("click",".removecollect",function () {
       var cfId =$(this).next().text();
        var fId =$(this).next().next().text();
       if (cfId.length !=0 ){
           //移除文件收藏 和对应的文件收藏减1
           $.ajax({
               type:"post",
               url:"collect/delfilecollect",
               data:{
                   cfId:cfId,
                   fId:fId
               },
               success:function (data){
               location.href = "/personal"
                   alert("已移除")
               },
               error:function (data) {
                   alert("移除失败")
               }

           })



       }else{
           alert("操作错误");
       }
    })


    

    //个人信息
    //注销用户
    $(".userquit").click(function () {
        $.ajax({
            type:"get",
            url:"/user/userquit",
            success:function () {
                alert("已退出")
                location.href = "/"
            },
            error:function () {
                alert("2")
            }
        })
        $(".userDIV").show();
        $(".userresult").hide();
    })

   //更新信息
    $(".usertable tr.updateuser").click(function () {
        $(".updateinfo").toggle()
    })
    $(".updatesubmit").click(function () {

        var pusername,ppassword,ptelephone,pemail,psex,pbirthday,paddress,pprofile;
        pusername = $(".updatetable .username").next().children().val();
        ppassword = $(".updatetable .password").next().children().val();
        ptelephone = $(".updatetable .telephone").next().children().val();
        pemail = $(".updatetable .email").next().children().val();
        psex = $(".updatetable .sex").next().children().val();
        pbirthday = $(".updatetable .birthday").next().children().val();
        paddress = $(".updatetable .address").next().children().val();
        pprofile = $(".updatetable .profile").next().children().val();
        if (psex == null){
            alert("性别不能为空")
            return false
        }
        if (pbirthday .length == 0){
            alert("生日不能为空")
            return false
        }
        $.ajax({
              type:"post",
              url:"/user/updateuserinfo",
              data:{
                  userName:pusername,
                  password:ppassword,
                  telephone:ptelephone,
                  email:pemail,
                  sex:psex,
                  birthday:pbirthday,
                  address:paddress,
                  profile:pprofile
              },
              success:function (data) {
                  alert("修改成功")
                  location.href = "/personal"
                  console.log(data)
              },
              error:function (data) {
                  alert("修改失败")
                  console.log(data)
              }

          })
    })

    $(".jointhemestag").click(function () {
        //发布话题
       $.ajax({
           type:"get",
           url:"/themes/getonethemeslist",
           success:function (data) {
               console.log("success get themes")
               //console.log(data)
               writeThemes(data)
           },
           error:function (data) {
               console.log("error get themes")
               writeRepyThemes(data)
           }
       })
        //回复话题
        $.ajax({
            type:"get",
            url:"/repy/getonerepythemeslist",
            success:function (data) {
                console.log("success get repythemes")
                writeRepyThemes(data)
            },
            error:function (data) {
                console.log("error get repythemes")
            }
        })
    })

    //操作主题
    //全选与取消全选
   /* $(".publishtables .editthemes").click(function () {
        var text = $(".publishtables .editthemes").text();
        if (text == "全选"){
            $(".publishtables .editthemes").text("取消").css({"color":"red"})
            $(".publishtables input:checkbox").each(function () {
                if ($(this).prop("checked") != true){
                    $(this).attr("checked",true)
                }
            })

            $(".publishmenu ul li").eq(1).show().siblings().hide(); //菜单栏只显示删除选项
        }else {
            $(".publishtables .editthemes").text("全选").css("color","black")
            $(".publishtables input:checkbox").each(function () {
                if ($(this).prop("checked") != false){
                    $(this).attr("checked",false)
                }
            })

            $(".publishmenu ul li").show();
        }

       //$(".publishmenu ul li").toggle();


    })*/

    //操作菜单
    $(".publishmenu ul li").click(function () {
       var clickNum = $(this).index()
        switch (clickNum){
            case 0:
                location.href = "/topic";
                break;
            case 1:
                if (confirm("确定要删除话题吗？")){
                    delThemes();
                }
                break;
            case 2:
                modifyThemes()
                break;
        }
    })
    
    //点击修改
    $(".modifycon .modifythemes").click(function () {
        var modifyData = getPubCheckedList()
        var tId = modifyData[0];
        var modifyTitle = $.trim($(".modifycon input").val())
        var modifyContext = $.trim($(".modifycon textarea").val())
        if (modifyTitle.length != 0 && modifyTitle.length <50 && modifyContext.length <300){
            $.ajax({
                type:"post",
                url:"themes/moidfythemes",
                data:{
                    tId:tId,
                    modifyTitle:modifyTitle,
                    modifyContext:modifyContext
                },
                success:function () {
                    location.href = "/personal";
                    $(".modifythemes").hide();
                    alert("已修改")
                },
                error:function () {
                    alert("修改失败")
                }

            })
        }else if(modifyTitle.length == 0){
            alert("修改标题不能为空")
            return false;
        }else if(modifyTitle.length > 50){
            alert("修改标题不能过长")
            return false;
        }else if(modifyContext.length > 200){
            alert("修改内容不能过长")
            return false;
        }


    })
    //隐藏修改框
    $(".modify-error").click(function () {
        $(".modifythemes").hide();
    })


    //操作回复话题
    $(".repymenu ul li").click(function () {
        var clickNum = $(this).index()
        switch (clickNum){
            case 0:
                location.href = "/topic";
                break;
            case 1:
                if (confirm("确定要删除话题吗？")){
                    delrepythemes();
                }
                break;
            case 2:
                modifyRepyThemes()
                break;
        }
    })
    //关闭回复框
    $(".mod-repy-error").click(function () {
        $(".modify-repybox").hide();
    })
    //提交修改内容
    $(".mod-rep-submit").click(function () {
        var ridList =getRepyRidList();
        var rid=ridList[0];
        var modifyRepyContext = $.trim($(".mod-repcon textarea").val());
        if (modifyRepyContext.length != 0){
            $.ajax({
                tyep:"post",
                url:"repy/modifyrepycontext",
                data:{
                    rId:rid,
                    modifyRepyContext:modifyRepyContext
                },
                success:function (data) {
                    alert("已修改")
                    location.href = "/personal"
                },
                error:function (data) {
                    alert("修改失败")
                }
            })
        }else if(modifyRepyContext.length > 250){
            alert("您输入的修改内容过长")
        }else{
            alert("请输入修改内容")
            return false;
        }
        $(".modify-repybox").hide();
    })










   //函数
    //写入登录时间
    function writeUserLoginDate(data) {
        console.log(data)
        var loginDate =personalTimeUtil(data.users[0]["logoffDate"]);
        $(".loginDate").html(loginDate)
    }
    //写入用户头像
    function writeheadpicshow(data){
        var pic = data.userpicList;
        for (var i = 0;i<pic.length;i++){
            var picbox = "<img class='pichide' src = '/files/"+pic[i].substring(12,pic[i].length)+"'/>"
            $(".headpicshow").append(picbox)
        }
    }
   function pulspic() {
        $(".picname").empty();
        var picObj =$(".headpicshow img");
        var imglen =picObj .length
        var showinddex = picObj.siblings(".picshow").index();
        if (showinddex +1 == imglen){ showinddex =0}
        picObj.eq(showinddex).hide().removeClass("picshow");
        picObj.eq(showinddex+1).show().addClass("picshow");
       //图片名称
       var picpath = picObj.siblings(".picshow").attr("src") //picpath: /files/A_背影.png
       var picprofix =picpath.lastIndexOf("_")
       var picsuffix = picpath.lastIndexOf(".")
       var picname = picpath.substring(picprofix+1,picsuffix);
       $(".picname").append(picname)
   }
   function  reducepic(){
       $(".picname").empty();
       var picObj = $(".headpicshow img")
       var imglen =picObj.length
       var showinddex =picObj.siblings(".picshow").index();

       picObj.eq(showinddex).hide().removeClass("picshow");
       if (showinddex == 0) {
           $(".picname").empty();
           showinddex = imglen - 1
           picObj.eq(0).hide().removeClass("picshow");
           picObj.eq(showinddex).addClass("picshow").removeClass("pichide");
       }
           picObj.eq(showinddex-1).addClass("picshow").show().removeClass("pichide");
           //图片名称
           var picpath = picObj.siblings(".picshow").attr("src") //picpath: /files/A_背影.png
           var username = $(".Sessionusername").text();
           var picprofix =picpath.lastIndexOf("_")
           var picsuffix = picpath.lastIndexOf(".")
           var picname = picpath.substring(picprofix+1,picsuffix);
           $(".picname").append(picname)
   }




    //写入从后台获取用户的数据
    function writeuserinfo(user) {

       $(".userimg img").attr("src",user.headPicPath);
       var pusername,ppassword,ptelephone,pemail,psex,pbirthday,paddress,profile;
        pusername = "<td>"+user.userName+"</td>";
        $(".pusername").append(pusername);
        ppassword = "<td>"+user.password+"</td>";
        $(".ppassword").append(ppassword);
        ptelephone = "<td>"+user.telephone+"</td>";
        $(".ptelephone").append(ptelephone);
        pemail = "<td>"+user.email+"</td>";
        $(".pemail").append(pemail);
        psex = "<td>"+user.sex+"</td>";
        $(".psex").append(psex);
        pbirthday = "<td>"+user.brithday+"</td>";
        $(".pbirthday").append(pbirthday);
        paddress = "<td>"+user.address+"</td>";
        $(".paddress").append(paddress);
        profile = "<td>"+user.profile+"</td>";
        //profile = "<td><textarea>知道你今天为啥特别冷吗？因为你没我这么暖的男朋友，冻死你，傻比。</textarea></td>"
        $(".pprofile").append(profile);
    };
    //同步用户信息
    function copyuserinfo(user) {
        $(".username").next().children().val(user.userName);
        $(".password").next().children().val(user.password);
        $(".telephone").next().children().val(user.telephone);
        $(".email").next().children().val(user.email);
        $(".sex").next().children().val(user.sex);  //给select标签添加  而不是加到option上
        //var aa =new Date((user.brithday).replace(/-/,"/"));\
       /* if(user.brithday.length != 0){
            formatDate
        }*/
        //$(".brithday").next().children().val(formatDate);
        $(".address").next().children().val(user.address);
        $(".profile").next().children().val(user.profile);
    }


    //将后台传来的文件的对象写入表格中
    function DataFilesWriterTable(data) {
        console.log(data)
        $(".noFileTr").parent().remove()
        var trlen = $(".uploadfileinfo .filestable tr").length-1;
        var resultlen =data.authorFiles.length;
        if(trlen == resultlen){
            if (trlen !=0)
                return null;
            else {
                var item ="<tr><td colspan='8' class='noFileTr'>您还没有上传文件</td></tr>";
                $(".uploadfileinfo .filestable").append(item);
            }
        }else{
            $.each(data, function (i, result) {
                // (Math.random()*100).toFixed(0)  随机数 保留0位小数
                for (var i = 0; i < result.length; i++) {
                    var item = "<tr><td>" + addImg(result[i]["fIco"]) + "</td><td>" + result[i]["fTitle"] + "</td><td>" + fileSize(result[i]["fSize"]) +
                        "</td><td>" + (personalTimeUtil(result[i]["uploadDate"])).substring(0,10) + "</td><td>" + result[i]["downloadSum"] + "</td><td>" +
                        result[i]["collectSum"] +"</td><td ><label class='deluserfile'>删除</label><label style='display:none;'>"+result[i]["fId"]+"</label></td></tr>";
                    $(".uploadfileinfo .filestable").append(item);
                }
            });
        }
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
            return "<img src='/static/images/fileico/photo.png'/>"
        }
        else if(ficotem =="ppt"  ||ficotem =="pptx") {
            return "<img src='/static/images/fileico/ppt.png'/>"
        }else if (ficotem == "pdf"){
            return "<img src='/static/images/fileico/pdf.png'/>"
        }else if (ficotem == "txt"){
            return "<img src='/static/images/fileico/txt.png'/>"
        }else {
            return "<img src='/static/images/fileico/qita.png'/>"
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


    //写入从后台获取我的收藏
    function writecollect(data) {
        var tablelen = $(".mycellecttable tr").length;
        var datalen = data.collectFilesList.length;
        if (datalen !=0 && tablelen-1 != datalen){
            $(".nocollect").remove();

            $.each(data,function (j,data) {
                for (var i = 0;i<data.length;i++){
                    var collectresult ="<tr><td>"+addImg(data[i]["files"].fIco)+"</td><td>"+data[i]["files"].fTitle+"</td><td>"+
                        fileSize(data[i]["files"].fSize)+"</td><td>"+data[i]["files"].user["userName"]+"</td><td class='collectdate'>"+(personalTimeUtil(data[i]["files"].uploadDate))+"</td><td class='collectdate'>"+
                        personalTimeUtil(data[i]["collectDate"])+"</td><td>"+data[i]["files"].downloadSum+"</td><td>"+data[i]["files"].collectSum+"</td>" +
                        "<td><label class='removecollect'>移除</label><label style='display: none'>"+data[i]["cfId"]+"</label><label style='display: none'>"+data[i]["files"].fId+"</label></td></tr>"
                    $(".mycellecttable").append(collectresult)
                }
            })
        }
    }

    //参与话题
    //写入从后台获取的话题
    function writeThemes(data) {
        var datalen = data.onethemeslist.length;
        var tablelen =  $(".publishtables tr").length;
        if(datalen != 0 && tablelen-1 != datalen){
            $(".nothemes").remove();
            $.each(data,function (j,result) {
                for(var i = 0;i<datalen;i++){
                    var resultthemes = "<tr><td><input type='checkbox' class='checkedbox'><label style='display: none'>"+result[i]['tId']+"</label></td><td>"+result[i]["themeTitle"]+"</td><td class='themeContext'>"+result[i]["themeContext"]+"</td><td><div class='themesimgbox'><img src='/static/images/Message.png'/></div><label style='margin-left: 2px;color: blue;'>"+result[i]["commSum"]+
                        "</label></td><td>"+ (personalTimeUtil(result[i]["releaseTime"]))+"</td></tr>";
                    $(".publishtables").append(resultthemes);
                }
            })
            $(".publishtables tr:odd").addClass("themestabOdd")
            $(".publishtables tr:even").addClass("themestabEven")
        }
    }
    //写入从后台获取的回复话题
    function  writeRepyThemes(data){
        var datalen = data.onerepythemeslist.length;
        var tablelen =  $(".repytables tr").length;
        if(datalen != 0 && tablelen-1 !=datalen){
            $(".norepythemes").remove();
            $(".nothemes").remove();
            $.each(data,function (j,result) {
                console.log(result)
                for(var i = 0;i<datalen;i++){
                    var resultrepythemes = "<tr><td ><input type='checkbox'><label style='display: none'>"+result[i]["rId"]+"</label><label style='display: none'>"+result[i]["themes"].tId+"</label></td><td>"+
                       result[i]["themes"].themeTitle+"</td><td class='repythemeContext'>"+result[i]["repyContext"]+"</td><td>"+(result[i]["repyTime"]).substring(11,19)+"</td></tr>";
                    $(".repytables").append(resultrepythemes);
                }
            })
            $(".repytables tr:odd").addClass("repytabOdd")
            $(".repytables tr:even").addClass("repytabEven")
        }
    }


    //删除主题
    function delThemes() {
       var delList =  getPubCheckedList();
       console.log(delList)
       $.ajax({
           type:"post",
           url:"themes/delthemes",
           data:{
               delList:delList
           },
           success:function () {
                location.href = "/personal"
           }
       })
        $(".publishmenu ul li").show();
    }
    //修改主题
    function modifyThemes() {
        var modifyList =  getPubCheckedList();
        if (modifyList.length == 0){
            alert("请选择您要修改的话题")
            return false
        }else if(modifyList.length >1 ){
            alert("只能选择一条话题进行修改")
        }else{
            $(".modifythemes").show();
        }
    }


    // 删除回复
    function delrepythemes() {
        var TidList = getRepyTidList();
        var RidList =getRepyRidList();
        $.ajax({
            type:"post",
            url:"repy/delrepythemes",
            data:{
                delRidArray:RidList,
                tIdArray:TidList
            },
            success:function (data) {
                console.log(data)
                location.href = "/personal"
            },
            error:function (data) {
                console.log(data)
            }
        })
    }
    //修改回复
    function modifyRepyThemes() {
       var modifyData = getRepyRidList();
        if (modifyData.length == 0){
            alert("请选择您要修改的话题")
            return false
        }else if(modifyData.length >1 ){
            alert("只能选择一条话题进行修改")
        }else{
            //显示修改话题
            writeRepybox()
            $(".modify-repybox").show();
        }
    }




    //获取话题中选择话题的id集合
    function getPubCheckedList() {
        var array = []
        $(".publishtables :checkbox").each(function () {
            var checkboxList =$(this);
            for(var i =0;i<checkboxList.length;i++){
                if (checkboxList[i]["checked"] == true){
                    var  tid = $(this).next().text()
                    array.push(tid)
                }
            }

        })
        return array;
    }

    //获取复选框选中的回复主题中的主题id
    function getRepyTidList() {
        var array = []
        $(".repytables :checkbox").each(function () {
            var checkboxList =$(this);
            for(var i =0;i<checkboxList.length;i++){
                if (checkboxList[i]["checked"] == true){
                    var  tid = $(this).next().next().text()
                    array.push(tid)
                }
            }

        })
        return array;
    }
    //获取复选框选中的回复主题id
    function getRepyRidList() {
        var array = []
        $(".repytables :checkbox").each(function () {
            var checkboxList =$(this);
            for(var i =0;i<checkboxList.length;i++){
                if (checkboxList[i]["checked"] == true){
                    var  tid = $(this).next().text()
                    array.push(tid)
                }
            }

        })
        return array;
    }

    //获取复选框选中的回复主题id
    function getRepyThemesTitle(){
        var themesTitle
        $(".repytables :checkbox").each(function () {
            var checkboxList =$(this);
            for(var i =0;i<checkboxList.length;i++){
                if (checkboxList[i]["checked"] == true){
                    themesTitle = $(this).parent().next().text()
                }
            }
        })
        return themesTitle;
    }

    //将话题标题写入回复框
    function writeRepybox() {
        var themesTitle = getRepyThemesTitle();
        var Titletext = $(".mod-themestitle").text();
        if (Titletext.length == 0){
            var Titletext = $(".mod-themestitle").text(themesTitle);
        }else{
            $(".mod-themestitle").text("");
            $(".mod-themestitle").text(themesTitle);
        }
    }











    //函数工具
    //奇偶行显示不同颜色
   /* $(".publishtables tr:odd").addClass("tabOdd")
    $(".publishtables tr:even").addClass("tabEven")
    $(".repytables tr:odd").addClass("tabOdd")
    $(".repytables tr:even").addClass("tabEven")*/

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
    //字符串转时间
    //字符串转日期格式，strDate要转为日期格式的字符串
    function getDate(strDate) {
        var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
            function (a) {
                return parseInt(a, 10) - 1;
            }).match(/\d+/g) + ')');
        return date;
    }

    //时间
    function personalTimeUtil(times) {
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