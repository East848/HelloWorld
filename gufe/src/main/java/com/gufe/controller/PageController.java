package com.gufe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller

public class PageController {
    @RequestMapping("/login")
    public String login(){
        return "views/user";
    }
    @RequestMapping("/reg")
    public String register(){
        return "views/user";
    }
    @RequestMapping("/login2")
    public String login2(){
        return "views/login";
    }
    @RequestMapping("/reg2")
    public String register2(){
        return "views/register";
    }
    @RequestMapping("/file")
    public String fileController(){
        return "views/filemsg";
    }
    //贵财智库
    @RequestMapping("/base")
    public String wisdombase(){
        return "views/wisdombase";
    }
    //话题圈
    @RequestMapping("/topic")
    public String topic(){
        return "views/topic";
    }
    @RequestMapping("/personal")
    public String personal(){
        return "views/personal";
    }
    @RequestMapping("/search")
    public String search(){
        return "views/search";
    }

    //异常
    @RequestMapping("/msg")
    public String msgException(){
        return "views/msg";
    }
    //文件异常
    @RequestMapping("/fileerrormsg")
    public String fileerrormsg(){
        return "views/error/fileError";
    }
    @RequestMapping("/themesdetail")
    public String themesDetail(){
        return "views/themesdetail";
    }
    @RequestMapping("/test")
    public String test(){
        return "views/test";
    }


}
