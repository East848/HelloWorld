package com.gufe.services.impl;

import com.gufe.dao.FileDao;

import com.gufe.pojo.Files;
import com.gufe.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileServiceImpl implements FileService {
    @Autowired
    private FileDao fileDao;


    @Override
    public int addFile(Files files) {
        return fileDao.addFile(files);
    }

    @Override
    public List<Files> allListFile() {
        return fileDao.allListFile();
    }

    @Override
    public List<Files> userListFile(int uId) {
        return fileDao.userListFile(uId);
    }

    @Override
    public List<String> getUserPic(int uId) {
        return fileDao.getUserPic(uId);
    }

    @Override
    public int updateDownloadSum(int fId) {
        return fileDao.updateDownloadSum(fId);
    }

    @Override
    public int updateCollectSum(int fId) {
        return fileDao.updateCollectSum(fId);
    }

    @Override
    public List<Files> wordList(String word) {
        return fileDao.wordList(word);
    }

    @Override
    public List<Files> excelList(String excel) {
        return fileDao.excelList(excel);
    }

    @Override
    public List<Files> pptList(String ppt) {
        return fileDao.pptList(ppt);
    }

    @Override
    public List<Files> pdfList(String pdf) {
        return fileDao.pdfList(pdf);
    }

    @Override
    public List<Files> picList(String pic) {
        return fileDao.picList(pic);
    }

    @Override
    public List<Files> otherList(String ohter) {
        return fileDao.otherList(ohter);
    }

    @Override
    public List<Files> getSearchList(String searchCon) {
        return fileDao.getSearchList(searchCon);
    }

    @Override
    public List<Files> downloadListTopTen() {
        return fileDao.downloadListTopTen();
    }

    @Override
    public String getFilePath(int fId) {
        return fileDao.getFilePath(fId);
    }

    @Override
    public int delFile(int fId) {
        return fileDao.delFile(fId);
    }

    @Override
    public int SubFileSum(int fId) {
        return fileDao.SubFileSum(fId);
    }

    @Override
    public List<Files> SortBDtListFile() {
        return fileDao.SortBDtListFile();
    }

    @Override
    public List<Files> SortBCtListFile() {
        return fileDao.SortBCtListFile();
    }
}
