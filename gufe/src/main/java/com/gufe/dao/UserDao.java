package com.gufe.dao;

import com.gufe.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface UserDao {
    //判断数据库中是否有该手机号
    String getTelephone(String telephone);

    //根据也有的手机号和密码查询用户
    String loginUser(@Param("telephone") String telephone, @Param("password") String password);

    //注册用户
    int regUser(User user);

    //获取所以用户
    List<User> allUser();

    //查询单个用户
    List<User> oneUser(String telephone);

    //更新退出时间
    int updateLogoffDate(@Param("telephone") String telephone,@Param("logoffDate") String logoffDate);

    //更新头像
    int updateHeadPic(@Param("telephone") String telephone,@Param("headPicPath") String headPicPath);

    //获取头像地址
    String getHeadPicPath(String telephone);

    //找回密码
    String forgetPassword(@Param("telephone")String telephone,@Param("userName")String userName);

    //根据id返回用户
    User getUser(int uId);

    //更新用户
    int modifyUser(User user);

    //热门作者 前三用户
    List<User> hotAuthor();

    //删除用户
    int delUser(int uId);
}
