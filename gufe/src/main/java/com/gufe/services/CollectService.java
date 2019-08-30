package com.gufe.services;

import com.gufe.pojo.CollectFiles;

import java.util.List;

public interface CollectService {
    int addFileCollect(CollectFiles collectFiles);
    List<CollectFiles> getFilesCollectList(int uId);
    int delFileCollect(int cfId);
}
