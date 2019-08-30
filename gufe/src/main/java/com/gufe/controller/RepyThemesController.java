package com.gufe.controller;

import com.gufe.manager.Messages;
import com.gufe.pojo.RepyThemes;
import com.gufe.pojo.Themes;
import com.gufe.pojo.User;
import com.gufe.services.RepyThemesService;
import com.gufe.services.ThemesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;


import javax.jws.Oneway;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/repy")
public class RepyThemesController {
    @Autowired
    private ThemesService themesService;
    @Autowired
    private RepyThemesService repyThemesService;

    @RequestMapping("/addrepythemes")
    public ModelAndView addrepythemes(int tId, String repyContext,HttpServletRequest request,Map<String,Object> map) {

//        ModelAndView mav = new ModelAndView();mav.setViewName("views/themesdetail");

        int uId = (int) request.getSession().getAttribute("userID");
        String repyTime = new SimpleDateFormat("yyyy/MM/dd-HH:mm:ss").format(new Date());
        RepyThemes repyThemes = new RepyThemes();
        repyThemes.setRepyContext(repyContext);
        repyThemes.setRepyTime(repyTime);
        repyThemes.setUser(new User(uId));
        repyThemes.setThemes(new Themes(tId));

        repyThemesService.addRepyThemes(repyThemes); //添加回复
        themesService.addCommentSum(tId);  //加评论数
        map.put("repythemes",repyThemes); //存储添加内容  可以用于追加到回复内容后面
        System.out.println("已添加回复内容是: "+map);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    @RequestMapping("/getallrepythemes")
    public ModelAndView getallrepythemes(int tId,Map<String,Object> map){
        List<RepyThemes> repyThemesList =repyThemesService.getAllRepyThemes(tId);
        map.put("repyThemesList",repyThemesList);
        new ModelAndView().setViewName("views/themesdetail");
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    @RequestMapping("/getonerepythemeslist")
    public ModelAndView getonerepythemeslist(HttpServletRequest request,Map<String,Object> map){
        List<RepyThemes> onerepythemeslist = repyThemesService.getOneRepyThemesList((int)request.getSession().getAttribute("userID"));
        System.out.println("查询到您的参与的回复有: "+onerepythemeslist.size()+" 条");
        map.put("onerepythemeslist",onerepythemeslist);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    //删除回复
     @RequestMapping("/delrepythemes")
    public String delRepyThemes(@RequestParam("delRidArray[]") int[] delRidArray, @RequestParam("tIdArray[]") int[] tIdArray){
        System.out.println("开始删除回复");
         System.out.println("tIdArray 长度: "+tIdArray.length);
         repyThemesService.delRepyThemes(delRidArray);
        for (int i = 0;i < tIdArray.length;i++){
            int tId = tIdArray[i];
            System.out.println(tId);
            themesService.minCommentSum(tId);
        }

        return "views/personal";
     }

     //修改回复
    @RequestMapping("/modifyrepycontext")
    public String modifyrepycontext(@RequestParam("rId") int rId,@RequestParam("modifyRepyContext") String modifyRepyContext){
        String moidfyDate = new SimpleDateFormat("yyyy/MM/dd-HH:mm:ss").format(new Date());
        repyThemesService.modifyRepyContext(rId,modifyRepyContext,moidfyDate);
        return "views/personal";
    }

}