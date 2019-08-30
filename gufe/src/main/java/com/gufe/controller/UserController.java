package com.gufe.controller;


import com.gufe.manager.Messages;
import com.gufe.pojo.User;

import com.gufe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
     /**
      * 登录功能
      1. 判断该手机号是否存在
      2. 根据手机号和密码查找
      2.1 存在 返回用户名
      2.2 不存在 密码错误
      3.获取用户头像  存入session
     */
    @ResponseBody
    @RequestMapping("/loginuser")
    public ModelAndView loginUser(@RequestParam("telephone")String telephone, @RequestParam("password")String password, HttpServletRequest request ){
        String resultTem; //返回结果
        Map resultmap = new HashMap<String,String>();
        ModelAndView mav = new ModelAndView();
        System.out.println("telephone ==> "+telephone+"  password ==>  "+password);
        String phone =userService.getTelephone(telephone);
        System.out.println("查到手机号: "+phone);
        if(phone == null){
            resultmap.put("logResult","notUser");
            System.out.println("没有该用户");
        }else{
            resultmap.clear();
            resultTem = userService.loginUser(telephone,password);
            if (resultTem != null){
                resultmap.put("logResult",resultTem);
                System.out.println("查询到登录用户是: "+resultTem);
                String SesheadPicPath;  //图片地址
                SesheadPicPath = userService.getHeadPicPath(phone);
                if (SesheadPicPath == null){
                    String headPicPath ="/static/images/A_apple.jpg";
                    userService.updateHeadPic(phone,headPicPath);
                    SesheadPicPath = headPicPath;
                }
                List<User> oneuser =userService.oneUser(telephone);
                int uid =oneuser.get(0).getuId();
                HttpSession session = request.getSession();

                session.setAttribute("username",resultTem);
                session.setAttribute("telephone",phone);
                session.setAttribute("userID",uid);
                session.setAttribute("SesheadPicPath",SesheadPicPath);
            }else {
                resultmap.put("logResult","error");
                System.out.println("密码错误");
            }
        }
        return new ModelAndView(new MappingJackson2JsonView(),resultmap);
    }

    /*
      验证用户登录
     */
    @RequestMapping("/userLogin")
    public ModelAndView userLogin(HttpServletRequest request,Map<String,Object> map){
        map.put("userID",request.getSession().getAttribute("userID"));
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }


    /**
     * 注册功能
     */
    @RequestMapping(value = "reg",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String regUser(@RequestBody Map<String,Object> map){
        System.out.println(map);
        User user =new User();
        user.setUserName(map.get("username").toString());
        user.setPassword(map.get("password").toString());
        user.setTelephone(map.get("telephone").toString());
        user.setRegDate(new SimpleDateFormat("yyyy/MM/dd:HH:mm:ss").format(new Date()));
        String phone = userService.getTelephone(user.getTelephone());
        System.out.println(phone);
        if (phone == null){
            userService.regUser(user); //插入数据
            System.out.println("用户添加成功，主键为: "+user.getuId());
            return new Messages().JsonMsg("注册成功");
        }else {
            return new Messages().JsonMsg("该手机号已注册");
        }

    }

    //注销用户
    @RequestMapping("/userquit")
    public String userquit(HttpServletRequest request){
        HttpSession session = request.getSession();
        String telephone =(String) session.getAttribute("telephone");
        session.invalidate();  //后面的session失效
        String logoffDate = new SimpleDateFormat("yyyy/MM/dd:HH:mm:ss").format(new Date());
        System.out.println("退出用户手机号: "+telephone +"  date:  "+logoffDate);
        userService.updateLogoffDate(telephone,logoffDate);
        System.out.println("已注销用户");
        return "/gufe";
    }



    /**
     *  获取用户信息
     */
    @RequestMapping(value = "userinfo",method = RequestMethod.GET)
    public ModelAndView userinfo(Map<String ,Object> map,@RequestParam("telephone") String telephone){
        List<User> oneuserList =userService.oneUser(telephone);
        map.put("users",oneuserList);
        new ModelAndView().setViewName("views/personal");
        return new ModelAndView(new MappingJackson2JsonView(),map);
   /*     System.out.println("查询到用户有: "+Arrays.asList(oneuserList));
        List<User> OneUserList =new ArrayList<>();
       *//* for (int i = 0;i<oneuserList.size();i++){
            User user = oneuserList.get(i);
            if(user.getBrithday() != null){
              *//**//*  Date date = user.getBrithday();
                user.setBrithday(new java.sql.Date(date.getTime()));*//**//*
            }
            OneUserList.add(user);
        }*/

    }

    /**
     *  更新用户信息
     */
    @RequestMapping("/updateuserinfo")
    public String updateUserInfo(HttpServletRequest request,@RequestParam("userName") String userName,@RequestParam("password") String password,
                                 @RequestParam("telephone") String telephone,@RequestParam("email") String email,@RequestParam("sex") String sex,
                                 @RequestParam("birthday") String birthday,@RequestParam("address") String address,@RequestParam("profile") String profile){
        User user = new User();
        user.setuId((int)request.getSession().getAttribute("userID"));
        user.setUserName(userName);
        user.setPassword(password);
        user.setTelephone(telephone);
        user.setEmail(email);
        user.setSex(sex);
        user.setBrithday(birthday);
        user.setAddress(address);
        user.setProfile(profile);
        System.out.println("修改内容: "+user);
       int result = userService.modifyUser(user);
        System.out.println("用户修改结果: "+result);
        return "views/personal";
    }

    /**
     * updateheadpic 更新头像
     */
    @RequestMapping("/updateheadpic")
    public String updateHeadPic(String telephone,String headPicPath,HttpServletRequest request){
        System.out.println("要更新头像账号是: "+telephone+"  地址是:  "+headPicPath);
        userService.updateHeadPic(telephone,headPicPath);
        request.getSession().setAttribute("SesheadPicPath",headPicPath);
        return "views/personal";
    }

    /**
     *  forgetpassword 找回密码
     */
    @RequestMapping(value = "/forgetpassword",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String forgetPassword(String telephone,String userName){
        String phone =userService.getTelephone(telephone);
        System.out.println("phone: "+phone);
        if (phone == null){
            return new Messages().JsonMsg("没有找到您的手机号");
        }else {
            String pass = userService.forgetPassword(telephone,userName);
            if (pass != null){
                return   new Messages().JsonMsg("已找到您的密码: "+pass);
            }else{
                return   new Messages().JsonMsg("您输入的姓名不对");
            }
        }
    }

    /**
     *  热门作者
     *
     */

    @RequestMapping("/hotauthor")
    public ModelAndView hotauthor(Map<String,Object> map){
        List<User> userList = userService.hotAuthor();
        map.put("hotAuthor",userList);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }



}
