package com.gufe.services.impl;

import com.gufe.dao.UserDao;
import com.gufe.pojo.User;
import com.gufe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public String getTelephone(String telephone) {
        return userDao.getTelephone(telephone);
    }

    @Override
    public String loginUser(String telephone, String password) {
        return userDao.loginUser(telephone,password);
    }

    @Override
    public int regUser(User user) {
        return userDao.regUser(user);
    }

    @Override
    public List<User> allUser() {
        return userDao.allUser();
    }
    @Override
    public List<User> oneUser(String telephone) {
        return userDao.oneUser(telephone);
    }

    @Override
    public int updateLogoffDate(String telephone, String logoffDate) {
        return userDao.updateLogoffDate(telephone,logoffDate);
    }


    @Override
    public int updateHeadPic(String telephone, String headPicPath) {
        return userDao.updateHeadPic(telephone,headPicPath);
    }

    @Override
    public String getHeadPicPath(String telephone) {
        return userDao.getHeadPicPath(telephone);
    }

    @Override
    public String forgetPassword(String telephone, String userName) {
        return userDao.forgetPassword(telephone,userName);
    }

    @Override
    public User getUser(int uId) {
        return  userDao.getUser(uId);
    }

    @Override
    public int modifyUser(User user) {
        return userDao.modifyUser(user);
    }

    @Override
    public List<User> hotAuthor() {
        return userDao.hotAuthor();
    }

    @Override
    public int delUser(int uId) {
        return userDao.delUser(uId);
    }
}
