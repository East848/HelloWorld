package com.gufe.services.impl;

import com.gufe.dao.CollectDao;
import com.gufe.pojo.CollectFiles;
import com.gufe.services.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectServiceImpl implements CollectService {
    @Autowired
    private CollectDao collectDao;
    @Override
    public int addFileCollect(CollectFiles collectFiles) {
        return collectDao.addFileCollect(collectFiles);
    }

    @Override
    public List<CollectFiles> getFilesCollectList(int uId) {
        return collectDao.getFilesCollectList(uId);
    }

    @Override
    public int delFileCollect(int cfId) {
        return collectDao.delFileCollect(cfId);
    }


}
