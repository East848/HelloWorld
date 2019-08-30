package com.gufe.controller;

import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *   全局异常处理器
 */
public class CustomerException implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                         Object o, Exception ex) {

        //响应错误消息
        ModelAndView mav = new ModelAndView();
      /*  //错误消息
        String msg = "很抱歉，系统发生异常了，请联系管理员";
        mav.addObject("msg",msg);
        mav.setViewName("msg");*/
        //判断异常类型，来跳转不同页面
        if (ex instanceof MaxUploadSizeExceededException){
            //指定错误信息
            mav.addObject("msg", "上传文件过大");
            //设置跳转视图
            mav.setViewName("/msg");
            return mav;
        }
        //其他异常
        return null;
    }
}
