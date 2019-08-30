package com.gufe.dao;

import com.gufe.pojo.CollectFiles;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CollectDao {
    int addFileCollect(CollectFiles collectFiles);
    List<CollectFiles> getFilesCollectList(int uId);
    int delFileCollect(@Param("cfId") int cfId);

}
