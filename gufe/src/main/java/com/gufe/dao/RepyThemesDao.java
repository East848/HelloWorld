package com.gufe.dao;

import com.gufe.pojo.RepyThemes;
import com.gufe.pojo.Themes;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RepyThemesDao {
        int addRepyThemes(RepyThemes repyThemes); //添加回复
        List<RepyThemes> getAllRepyThemes(int tId); //根据主题id获取所以回复
        List<RepyThemes> getOneRepyThemesList(int uId); // 根据用户id获取个人参与的回复
        int delRepyThemes(int[] delRidArray);
        int modifyRepyContext(@Param("rId") int rId, @Param("modifyRepyContext") String modifyRepyContext,@Param("moidfyDate") String moidfyDate);

}
