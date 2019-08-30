package com.gufe.services.impl;

import com.gufe.dao.RepyThemesDao;
import com.gufe.pojo.RepyThemes;
import com.gufe.services.RepyThemesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RepyThemesServiceImpl implements RepyThemesService {

    @Autowired
    private RepyThemesDao repyThemesDao;


    @Override
    public int addRepyThemes(RepyThemes repyThemes) {
        return repyThemesDao.addRepyThemes(repyThemes);
    }

    @Override
    public List<RepyThemes> getAllRepyThemes(int tId) {
        return repyThemesDao.getAllRepyThemes(tId);
    }

    @Override
    public List<RepyThemes> getOneRepyThemesList(int uId) {
        return repyThemesDao.getOneRepyThemesList(uId);
    }

    @Override
    public int delRepyThemes(int[] delRidArray) {
        return repyThemesDao.delRepyThemes(delRidArray);
    }

    @Override
    public int modifyRepyContext(int rId, String modifyRepyContext,String moidfyDate) {
        return repyThemesDao.modifyRepyContext(rId,modifyRepyContext,moidfyDate);
    }
}
