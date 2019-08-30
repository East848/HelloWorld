package com.gufe.controller;

import com.gufe.pojo.Themes;
import com.gufe.pojo.User;
import com.gufe.services.ThemesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/themes")
public class ThemesController {
    @Autowired
    private ThemesService themesService;

    @RequestMapping("/addthemes")
    public String addThemes(HttpServletRequest request,String themetitle, String themecontext){
        HttpSession session = request.getSession();
       int uId =(int) session.getAttribute("userID");
        String releasetime =new SimpleDateFormat("yyyy/MM/dd-HH:mm:ss").format(new Date());
        Themes themes =new Themes();
        themes.setThemeTitle(themetitle);
        themes.setThemeContext(themecontext);
        themes.setCommSum(0);
        themes.setReleaseTime(releasetime);
        themes.setUser(new User(uId));
        themesService.addTheme(themes);

        System.out.println("已添加主题: "+themes);
        return "/views/topic";
    }
    @RequestMapping("/getallthemes")
    public ModelAndView getAllThemes(Map<String,Object> map){
        List<Themes> themesList =themesService.getAllThemes();
        map.put("allthemes",themesList);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    @RequestMapping("/getonethemes")
    public ModelAndView getonethemes(int tId,Map<String,Object> map) {
        System.out.println("需要查询的主题id: "+tId);
        Themes themes = themesService.getOnethemes(tId);
        map.put("onethemes",themes);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    @RequestMapping("/getonethemeslist")
    public ModelAndView getonethemeslist(HttpServletRequest request,Map<String,Object> map){
        List<Themes> onethemeslist = themesService.getUserThemesList((int)request.getSession().getAttribute("userID"));
        map.put("onethemeslist",onethemeslist);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }
    @RequestMapping("/delthemes")
    public String delthemes(@RequestParam("delList[]") int[] tIdArray,HttpServletRequest request){
        //request 用户传递userID校验用户
        themesService.delThemes(tIdArray);
        System.out.println("已删除");
        return  "views/personal";
}

    @RequestMapping("/moidfythemes")
    public String moidfythemes(@RequestParam("tId") int tId,@RequestParam("modifyTitle") String modifyTitle,
                               @RequestParam("modifyContext") String modifyContext ){
        String moidfyDate = new SimpleDateFormat("yyyy/MM/dd-HH:mm:ss").format(new Date());
        int moidfyresult =themesService.moidfythemes(tId,modifyTitle,modifyContext,moidfyDate);
        System.out.println("已修改,结果是: "+moidfyresult);
        return "views/personal";
    }
    @RequestMapping("/themestopten")
    public ModelAndView themestopten(Map<String,Object> map){
        List<Themes> themesTopTenList = themesService.themesTopTen();
        map.put("themesTopTenList",themesTopTenList);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }


}
