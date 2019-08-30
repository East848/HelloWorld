package com.gufe.services;

import com.gufe.pojo.Files;
import com.gufe.pojo.User;

import java.util.List;

public interface UserService {
    String getTelephone(String telephone);
    String loginUser(String telephone,String password);
    int regUser(User user);
    List<User> allUser();
    List<User> oneUser(String telephone);
    int updateLogoffDate(String telephone,String logoffDate);

    int updateHeadPic(String telephone,String headPicPath);
    String getHeadPicPath(String telephone);
    String forgetPassword(String telephone,String userName);
    User getUser(int uId);
    int modifyUser(User user);

    List<User> hotAuthor();

    int delUser(int uId);

}
