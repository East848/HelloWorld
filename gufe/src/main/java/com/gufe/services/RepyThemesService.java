package com.gufe.services;

import com.gufe.pojo.RepyThemes;
import java.util.List;

public interface RepyThemesService {
    int addRepyThemes(RepyThemes repyThemes);
    List<RepyThemes> getAllRepyThemes(int tId);
    List<RepyThemes> getOneRepyThemesList(int uId);
    int delRepyThemes(int[] delRidArray);
    int modifyRepyContext(int rId, String modifyRepyContext,String moidfyDate);
}
