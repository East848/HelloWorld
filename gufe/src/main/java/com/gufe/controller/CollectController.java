package com.gufe.controller;

import com.gufe.pojo.CollectFiles;
import com.gufe.pojo.Files;
import com.gufe.pojo.User;
import com.gufe.services.CollectService;
import com.gufe.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/collect")
public class CollectController {
    @Autowired
    private CollectService collectService;
    @Autowired
    private FileService fileService;

    //文件收藏
    @RequestMapping("/addfilecollect")
    public String addFileCollect(int fId, HttpServletRequest request){
        System.out.println("添加收藏文件ID为 : "+fId);
        int userID =(int) request.getSession().getAttribute("userID");
        CollectFiles cf =new CollectFiles();
        cf.setFiles(new Files(fId));
        cf.setUser(new User(userID));
        cf.setCollectDate(new SimpleDateFormat("yyyy/MM/dd-HH:mm:ss").format(new Date()));
        System.out.println("添加文件收藏: "+cf);

        collectService.addFileCollect(cf);
        System.out.println("添加成功！");
        return "views/wisdombase";
    }

    //获取用户收藏文件列表
    @RequestMapping("/getcollectfileslist")
    public ModelAndView getcollectFilesList(HttpServletRequest request,Map<String,Object> map){
        int uId =(int) request.getSession().getAttribute("userID");
        List<CollectFiles> collectFilesList =collectService.getFilesCollectList(uId);
        System.out.println("查询结果我的收藏有: "+collectFilesList.size()+" 条");
        map.put("collectFilesList",collectFilesList);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    //移除文件收藏
    @RequestMapping("/delfilecollect")
    public String delfilecollect(@RequestParam("cfId") int cfId,@RequestParam("fId") int fId){
        System.out.println("cfId: "+cfId+"进行移除收藏");
        collectService.delFileCollect(cfId);
        fileService.SubFileSum(fId);
        return "views/personal";
    }



    //话题收藏
}
