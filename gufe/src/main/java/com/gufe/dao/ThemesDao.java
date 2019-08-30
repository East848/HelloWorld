package com.gufe.dao;

import com.gufe.pojo.Themes;
import org.apache.ibatis.annotations.Param;


import java.util.List;

public interface ThemesDao {
    int addTheme(Themes themes);  //添加主题
    List<Themes> getAllThemes(); //获取所以主题
    Themes getOnethemes(int tId); //根据id获取主题
    int addCommentSum(int tId);  //加评论数
    int minCommentSum(int tId); //减评论数
    List<Themes> getUserThemesList(int uId); //根据用户id获取用户主题
    int delThemes(int[] tIdArray);
    int moidfythemes(@Param("tId") int tId, @Param("modifyTitle") String modifyTitle,@Param("modifyContext") String modifyContext,@Param("moidfyDate") String moidfyDate);
    List<Themes> themesTopTen();
}
