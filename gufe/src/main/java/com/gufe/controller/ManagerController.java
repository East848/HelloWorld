package com.gufe.controller;

import com.gufe.dao.UserDao;
import com.gufe.manager.Messages;
import com.gufe.pojo.User;
import com.gufe.services.FileService;
import com.gufe.services.ThemesService;
import com.gufe.services.UserService;
import com.gufe.util.FileUitls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Controller
@RequestMapping("/Manager")
public class ManagerController {
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;
    @Autowired
    private ThemesService themesService;


    private int count = 0;
    /**
     *  index
     */
    @RequestMapping("/index")
    public String Index(){
        count++;
        System.out.println("访问 "+count+" 次");
        return "/Manager/index";
    }
    /**
     *   获取所以用户
     */
    @RequestMapping("/getalluser")
    public ModelAndView GetAllUser(HttpServletResponse response,Map<String,Object> usersmap){
        response.setCharacterEncoding("UTF-8");
        ModelAndView mav = new ModelAndView();
        List<User> userList =userService.allUser();
        usersmap.put("users",userList);
        mav.setViewName("/Manager/index");
        return new ModelAndView(new MappingJackson2JsonView(),usersmap);
    }

    /**
     *  获取单个用户
     */
    @RequestMapping(value = "getoneuser",method = RequestMethod.GET)
    public ModelAndView GetOneUser(Map<String ,Object> map,@RequestParam("telephone") String telephone){
        List<User> oneuserList =userService.oneUser(telephone);
        List<User> listOneUser =new ArrayList<>();
        map.put("users",oneuserList);
        new ModelAndView().setViewName("/Manager/index");
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    //删除用户
    @RequestMapping(value = "/deluser",produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String deluser(@RequestParam("uId") int uId ){
        int result = userService.delUser(uId);
        if (result == 1)
            return new Messages().JsonMsg("删除成功");
        else
            return new Messages().JsonMsg("删除失败");
    }

    //管理员强行删除文件  一般只能自己删除自己所上传的文件
    //移除文件
    @RequestMapping(value = "/Managerdelfiles",produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String delfile(@RequestParam("fId") int fId ){
        String filepath = fileService.getFilePath(fId);
        if (new FileUitls().isDelFile(filepath)){
            int delResult = fileService.delFile(fId);
            if (delResult == 1){
                return new Messages().JsonMsg("删除成功");
            }else{
                return new Messages().JsonMsg("删除失败");
            }
        }else {
            return new Messages().JsonMsg("找不到文件");
        }

    }



}
