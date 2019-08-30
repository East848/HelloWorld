package com.gufe.services;

import com.gufe.pojo.Themes;

import java.util.List;

public interface ThemesService {
    int addTheme(Themes themes);
    List<Themes> getAllThemes();
    Themes getOnethemes(int tId);
    int addCommentSum(int tId);
    List<Themes> getUserThemesList(int uId);
    int delThemes(int[] tIdArray);
    int minCommentSum( int tId);
    int moidfythemes(int tId, String modifyTitle,String modifyContext,String moidfyDate);
    List<Themes> themesTopTen();
}
