package com.gufe.controller;

import com.gufe.pojo.Files;
import com.gufe.pojo.User;
import com.gufe.services.FileService;
import com.gufe.util.FileUitls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/file")
@SessionAttributes(value = "userID",types = {Integer.class})
public class FileController {
    private static String FILEPATH = "C:"+ File.separator+"gufe"+File.separator+"file";
    @Autowired
    private FileService fileService;
    //上传文件
    @RequestMapping("/upload")
    public String uploadFile(@RequestParam("uploadfile")MultipartFile file, HttpServletRequest request){
        if (file.isEmpty()){
            System.out.println("文件为空");
            request.setAttribute("nullFile","文件为空");
            return "/views/error/fileError";
        }else {
            String fileName = file.getOriginalFilename(); //test.txt 文件名
            HttpSession session =request.getSession();
            int uId =(int) session.getAttribute("userID");
            String userFileName = uId+"_"+fileName;
            System.out.println("接收到文件:      "+userFileName);
            // 系统文件目录下的所有文件,用户不能重复上传文件
            File file1 = new File(FILEPATH);
            if (!file1.exists()){
                file1.mkdirs();
            }
            //System.out.println(FILEPATH+"目录下的文件:"+Arrays.asList(file1.list()));
            String[] filelist = file1.list();
            //for (String filename:filelist){
                System.out.println("a");
                if(Arrays.asList(file1.list()).contains(userFileName)){
                    System.out.println("重复上传文件");
                    request.setAttribute("filerepeatmsg","文件上传重复");
                    return  "/views/error/fileError";
                }else {
                    //把文件上传到指定路径
                    File localFile =new File(FILEPATH,userFileName);
                    System.out.println(localFile);
                    if(!localFile.getParentFile().exists()){
                        localFile.getParentFile().mkdirs();
                    }
                    try {
                        file.transferTo(localFile);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    int indexdot =fileName.lastIndexOf(".");
                    //实例化对象
                    Files files =new Files();
                    files.setfIco(fileName.substring(indexdot+1,fileName.length()));
                    files.setfTitle(fileName.substring(0,indexdot));
                    files.setfSize( file.getSize());
                    files.setUploadDate(new SimpleDateFormat("yyyy/MM/dd-HH:mm:ss").format(new Date()));
                    files.setfPath(localFile.toString());
                    files.setDownloadSum(0);
                    files.setCollectSum(0);
                    files.setUser(new User((int)request.getSession().getAttribute("userID")));
                    fileService.addFile(files);
                    System.out.println("已添加文件"+files);
                    return  "/views/personal";
                }


            //return "views/personal";
    }
    }

    //查看用户上传的文件
    @RequestMapping("/getUserFiles")
    public ModelAndView getUserFiles(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
        response.setCharacterEncoding("UTF-8");
        int uId = (int) request.getSession().getAttribute("userID");
        List<Files> files = fileService.userListFile(uId);
        map.put("authorFiles",files);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    //读取系统目录中的所有文件
    @RequestMapping("/readAllFile")
    public ModelAndView readAllFile(HttpServletResponse response,Map<String,Object> map){
      /* //读取本地所有文件
        FileUitls fileUitls = new FileUitls();
        fileUitls.listFile(FILEPATH);
        List<File> files = fileUitls.arrayListFile;
        for (int i=0;i<files.size();i++){
            map.put("allfiles",files.get(i).getName().substring(14));
        }*/
        response.setCharacterEncoding("UTF-8");
        List<Files> files =fileService.allListFile();
        map.put("filesall",files);
        new ModelAndView().setViewName("/wisdombase");
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    //更新下载数量
    @RequestMapping("/updatedownloadsum")
    public String updatedownloadsum(int fId){
        fileService.updateDownloadSum(fId);
        return "views/wisdombase";
    }
    //更新收藏数量
    @RequestMapping("/updatecollectsum")
    public String updatecollectsum(int fId){
        fileService.updateCollectSum(fId);
        return "views/wisdombase";
    }

    /**
     *  用户名称 用于在数据库中查找用户上传的图片
     */
    @RequestMapping("/userpicList")
   public ModelAndView getuserpic(Map<String,Object> map,HttpServletRequest request){
        int uId = (int)request.getSession().getAttribute("userID");
        System.out.println("用户ID: "+uId +" 正在获取上传图片");
        List<String> userpicList = fileService.getUserPic(uId);
        System.out.println("获取用户上传的图片有: "+userpicList.size()+" 张");
        map.put("userpicList",userpicList);
        return new ModelAndView(new MappingJackson2JsonView(),map);
   }

   //文件分类
    @RequestMapping("fileclassify")
    public ModelAndView fileclassify(String fIco,Map<String,Object> map){
        if (fIco.equals("word")){
            map.put("wordList",fileService.wordList(fIco));
        }else if(fIco.equals("excel")){
            map.put("excelList",fileService.excelList(fIco));
        }else if(fIco.equals("ppt")){
            map.put("pptList",fileService.pptList(fIco));
        }else if(fIco.equals("pdf")){
            map.put("pdfList",fileService.pdfList(fIco));
        }else if(fIco.equals("pic")){
            map.put("picList",fileService.picList(fIco));
        }else if(fIco.equals("other")){
            map.put("otherList",fileService.otherList(fIco));
        }
       return  new ModelAndView(new MappingJackson2JsonView(),map);
    }

    //文件搜索
    @RequestMapping("/getsearchlist")
    public ModelAndView getSearchList(String searchCon,Map<String,Object> map){
        System.out.println("文件中心中查询条件为:  "+searchCon);
        map.put("searchList",fileService.getSearchList(searchCon));
        System.out.println("查询到:  "+map.size()+" 条数据");
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }

    //文件下载排序
    @RequestMapping("downloadlisttopten")
    public ModelAndView downloadListTopTen(Map<String,Object> map){
        map.put("downloadlisttopten",fileService.downloadListTopTen());
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }


    //移除文件
    @RequestMapping("/delfile")
    public String delfile(@ModelAttribute("userID") int userID,@RequestParam("fId") int fId ){

        //String filepath = "E:\\test\\aaa\\1000_test_黑洞.jpg";
        System.out.println("用户ID: "+ userID +" 进行删除文件");
        String filepath = fileService.getFilePath(fId);
        int indexA = filepath.lastIndexOf("\\");
        int indexB = filepath.indexOf("_");
        String uID =filepath.substring(indexA+1,indexB);
        if (userID == Integer.parseInt(uID)){
            if (new FileUitls().isDelFile(filepath)){
                fileService.delFile(fId);
            }
        }
        return "views/personal";
    }

    //按下载量排序
    @RequestMapping("/sortbydownload")
    public ModelAndView sortbydownload(Map<String,Object> map){
        List<Files> files =fileService.SortBDtListFile();
        map.put("sortbydownload",files);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }
    //按收藏量排序
    @RequestMapping("/sortbycollect")
    public ModelAndView sortbycollect(Map<String,Object> map){
        List<Files> files =fileService.SortBCtListFile();
        map.put("sortbycollect",files);
        return new ModelAndView(new MappingJackson2JsonView(),map);
    }



}
