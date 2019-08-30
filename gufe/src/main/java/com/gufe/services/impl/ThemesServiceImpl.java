package com.gufe.services.impl;

import com.gufe.dao.ThemesDao;
import com.gufe.pojo.Themes;
import com.gufe.services.ThemesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThemesServiceImpl implements ThemesService{
    @Autowired
    private ThemesDao themesDao;


    @Override
    public int addTheme(Themes themes) {
        return themesDao.addTheme(themes);
    }

    @Override
    public List<Themes> getAllThemes() {
        return themesDao.getAllThemes();
    }

    @Override
    public Themes getOnethemes(int tId) {
        return themesDao.getOnethemes(tId);
    }

    @Override
    public int addCommentSum(int tId) {
        return themesDao.addCommentSum(tId);
    }

    @Override
    public List<Themes> getUserThemesList(int uId) {
        return themesDao.getUserThemesList(uId);
    }

    @Override
    public int delThemes(int[] tIdArray) {
        return themesDao.delThemes(tIdArray);
    }

    @Override
    public int minCommentSum(int tId) {
        return themesDao.minCommentSum(tId);
    }

    @Override
    public int moidfythemes(int tId, String modifyTitle, String modifyContext,String moidfyDate) {
        return themesDao.moidfythemes(tId,modifyTitle,modifyContext,moidfyDate);
    }

    @Override
    public List<Themes> themesTopTen() {
        return themesDao.themesTopTen();
    }
}
