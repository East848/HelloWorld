package com.gufe.controller.interceptor;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Iterator;
import java.util.Map;

public class FileTypeInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        boolean flag =true;
        // 判断是否为文件上传请求
        if (request instanceof MultipartHttpServletRequest) {
            MultipartHttpServletRequest multipartRequest =
                    (MultipartHttpServletRequest) request;
            Map<String, MultipartFile> files =
                    multipartRequest.getFileMap();
            Iterator<String> iterator = files.keySet().iterator();
            //对多部件请求资源进行遍历
            while (iterator.hasNext()) {
                String formKey = (String) iterator.next();
                MultipartFile multipartFile =
                        multipartRequest.getFile(formKey);
                String filename=multipartFile.getOriginalFilename();
                //判断是否为限制文件类型
                if (! checkFile(filename)) {
                    //限制文件类型，请求转发到原始请求页面，并携带错误提示信息
                    request.setAttribute("filetypeMsg", "系统不支持该类型文件上传！");
                    request.getRequestDispatcher("/fileerrormsg").forward(request, response);
                    flag= false;
                }
            }
        }
        return flag;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

    /**
     * 判断是否为允许的上传文件类型,true表示允许
     */
    private boolean checkFile(String filename){
        //先设置允许上传文件类型
        String suffixList = "jpg,png,jpeg,ioc,gif,pdf,doc,docx,ppt,pptx,xls,xlsx,txt";
        //获取文件的后缀
        String suffix =filename.substring(filename.lastIndexOf(".")+1,filename.length());
        if (suffixList.contains(suffix.trim().toLowerCase())){
            return true;
        }
        return false;
    }


}
