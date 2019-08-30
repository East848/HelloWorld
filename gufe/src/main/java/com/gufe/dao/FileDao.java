package com.gufe.dao;

import com.gufe.pojo.Files;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FileDao {
    int addFile(Files files);
    List<Files> allListFile();


    List<Files> userListFile(int uId);
    List<String> getUserPic(int uId); //返回图片地址 设置头像

    int updateDownloadSum(int fId);
    int updateCollectSum(int fId);

    //文件分类
    List<Files> wordList(String word);
    List<Files> excelList(String excel);
    List<Files> pptList(String ppt);
    List<Files> pdfList(String pdf);
    List<Files> picList(String pic);
    List<Files> otherList(String ohter);

    //搜索
    List<Files> getSearchList(String searchCon);

    //下载量排序
    List<Files> downloadListTopTen();
    String getFilePath(@Param("fId") int fId); //根据f文件id查找文件地址 用于删除文件
    int delFile(@Param("fId") int fId);

    //  更新收藏文件数量  -1
    int SubFileSum(int fId);


    List<Files> SortBDtListFile(); //按下载量排序
    List<Files> SortBCtListFile(); //按收藏量排序


}
