$(document).ready(function () {

    //基本样式
    //隐藏输入框 搜索
    $(".top-search").mouseover(function () {
        $(".search-input").show();
    })
    $(".top-search").mouseout(function () {
        $(".search-input").hide();
    })
    $(".search-input").mouseout(function () {
        $(".search-input").hide();
    })
    // 搜索
    $(".search-button").click(function () {
      var searval =  $.trim($(".search-inp").val())
        //alert("后台出错")
    })

    //登录注册和显示登录结果切换显示
    if($(".top-username").text().length == 0){
        $(".top-sign-result").hide();
        $(".usersign").show();
    }
    $(".userheadimg").mouseover(function () {
        $(".usermenu").css("display","block")
    })
    $(".top-sign-result").mouseleave(function () {
        $(".usermenu").css("display","none")
    })
    $(".usermenu").mouseleave(function () {
        $(".usermenu").css("display","none")
    })

    //侧边菜单1 个人中心 2 退出系统
    $(".usermenu ul li").click(function () {
       var index = $(this).index();
       if (index == 0){
           location.href = "/personal"
       }else if (index == 1){
           var quit = confirm("确定退出系统吗？")
           if(quit){
               $.ajax({
                   type:"get",
                   url:"/user/userquit",
               })
               $(".top-sign-result").hide();
               $(".usersign").show();
           }
           location.href = "/"
       }
    })

    //关闭浏览器
  /* window.onunload = function () {
        alert("真的退出吗")
       $.ajax({
           type:"get",
           url:"/user/userquit",
       })
   }*/






    //登录注册
    $(".login").click(function () {
        location.href = "/login"
    })
    $(".reg").click(function () {
        location.href = "/reg"
    })


    //导航菜单
    $(".top-nav ul li").click(function () {
       var index = $(this).index()
        if(index == 0){
           location.href = "/"
        }else if(index ==1){
            location.href = "/base"
        }else if(index ==2){
            location.href = "/topic"
        }else if(index ==3){
            location.href = "/personal"
        }

    })




})