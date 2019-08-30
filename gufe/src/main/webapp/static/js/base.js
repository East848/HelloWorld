 $(document).ready(function () {


    //获取所有文件
    $.ajax({
        type:"get",
        url:"/file/readAllFile",
        success:function (data) {
            DataAllFilesWriterTable(data)
            editdata(data)
        },
        error:function (data) {
            console.log("error: ")
            console.log(data)
        }
    })

     //文件分类
     //请求和样式
     $(".menutag ul li").click(function () {

         var liindex = $(this).index();
         $(".menutag ul li").eq(liindex).addClass("basetab").siblings(".basetab").removeClass("basetab");
        if (liindex == 0){
            //获取所以文件
            $.ajax({
                type:"get",
                url:"/file/readAllFile",
                success:function (data) {
                    DataAllFilesWriterTable(data)
                    editdata(data)
                },
                error:function (data) {
                    console.log("error: ")
                    console.log(data)
                }
            })
        } else if (liindex == 1){
            ajaxfun("word")
        }else if (liindex == 2){
            ajaxfun("excel")
        }else if(liindex == 3){
            ajaxfun("ppt")
        }else if (liindex == 4){
            ajaxfun("pdf")
        }else if (liindex == 5){
            ajaxfun("pic")
        }else{
            ajaxfun("other")  //其他
        }

     })

   // 文件分类 ajax 请求
   function ajaxfun(fico) {
       $.ajax({
           type:"get",
           url:"/file/fileclassify",
           data:{
             fIco:fico
           },
           success:function (data) {
               DataAllFilesWriterTable(data)
               editdata(data)
           },
           error:function (data) {
               console.log("System error: ")
               console.log(data)
           }
       })
   }
     
   //搜索文件
   $(".searchlab").click(function () {
      var searchcon = $.trim($(".searchinput").val());
      if (searchcon.length == 0){
          alert("请输入查询条件")
      }else{
          $.ajax({
              type:"get",
              url:"/file/getsearchlist",
              data:{
                  searchCon:searchcon
              },
              success:function (data) {
                  DataAllFilesWriterTable(data)
                  editdata(data)
              },
              error:function (data) {
                  console.log(data)
              }
          })
      }

   })



     
     

    //将后台传来的文件的对象写入表格中
    function DataAllFilesWriterTable(data) {
        $(".filestable tr:not('.filestr')").remove();
        $(".noAllFileTr").remove()
        $.each(data, function (i, result) {
            if (result.length != 0){
                for (var i = 0; i < result.length; i++) {
                    var item = "<tr><td>" + addImg(result[i]["fIco"]) + "</td><td>" + result[i]["fTitle"] + "</td><td>" + fileSize(result[i]["fSize"]) +"</td><td>"+result[i]["user"].userName+
                        "</td><td>" +BaseTimeUtil(result[i]["uploadDate"])+ "</td><td>" + result[i]["downloadSum"] + "</td><td>" +result[i]["collectSum"]+
                        "</td><td class='edit2'><label class='editl2'>下载</label></td><td class='edit3'><label class='editl3'>收藏</label></td></td></tr>";
                    $(".filestable").append(item);  //<td class='edit1'><label class='editl1'>查看</label></td>
                }
            }else {
                var item ="<tr><td colspan='9' class='noAllFileTr' style='color: red;font-weight: bold'>没有文件</td></tr>";
                $(".filestable").append(item);
            }
        });
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

    function editdata(data) {
        //下载
        $(".filestable td.edit2 .editl2").click(function () {
            var tr = $(this).parent().parent();
            console.log(data)
            $.each(data,function (j,result) {
                console.log(result)
                var filePath =result[tr.index()-1].fPath;  // 获取文件路径 用于下载
                var fId =result[tr.index()-1]["fId"];  //获取文件id用户插入下载数
                $.ajax({
                type:"post",
                url:"/file/updatedownloadsum",
                data:{
                    fId:fId
                },
                success:function (data) {
                    console.log("success:")
                    location.reload();

                },
                error:function (data) {
                    console.log("error:")
                    location.reload();
                }
            })
               if (filePath != undefined){
                    var fpath ="/files/"+filePath.substring(12,filePath.length)
                    console.log(fpath)
                    open(fpath)
               }else{
                   alert("文件路径不对")
               }
            })
        })
        //收藏
        $(".filestable td.edit3 .editl3").click(function (){
            //验证是否先登录
            var  loginNum = 0;
            $.ajax({
                type:"get",
                url:"/user/userLogin",
                async:false,
                success:function (logindata) {
                    if (logindata.userID ==null){
                        alert("需要先登录！")
                       return false;
                    }else {
                        loginNum = 1
                    }
                },
                error:function (logindata) {
                    console.log(logindata)
                }
            })
          if (loginNum == 1){
              var tr = $(this).parent().parent();
              $.each(data,function (j,result) {
                  var fId =result[tr.index()-1]["fId"];  //获取文件id用户插入下载数
                  //更新数量
                  $.ajax({
                      type:"post",
                      url:"/file/updatecollectsum",
                      data:{
                          fId:fId
                      },
                      success:function (data) {
                          console.log("success:")
                          location.reload();

                      },
                      error:function (data) {
                          console.log("error:")
                          location.reload();
                      }
                  })
                  //添加到数据库
                  $.ajax({
                      type:"post",
                      url:"/collect/addfilecollect",
                      data:{
                          fId:fId,
                      },
                      success:function (data) {
                          console.log(data)
                      },
                      error:function (data) {
                          console.log(data)
                      }
                  })
              })
          }
        })
    }

     //时间
     function BaseTimeUtil(times) {
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

