package com.gufe.pojo;

import java.util.Date;

public class User {
    private Integer uId; //编号
    private String userName; //姓名
    private String password; //密码
    private String telephone; //电话
    private String email;  //邮件
    private String sex;  //性别
    private String brithday; // 生日
    private String address; //居住地址
    private String profile; //简介
    private String headPicPath; //头像路径
    private String logoffDate; //退出时间
    private String regDate; //注册时间

    public Integer getuId() {
        return uId;
    }

    public void setuId(Integer uId) {
        this.uId = uId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBrithday() {
        return brithday;
    }

    public void setBrithday(String brithday) {
        this.brithday = brithday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getHeadPicPath() {
        return headPicPath;
    }

    public void setHeadPicPath(String headPicPath) {
        this.headPicPath = headPicPath;
    }

    public String getLogoffDate() {
        return logoffDate;
    }

    public void setLogoffDate(String logoffDate) {
        this.logoffDate = logoffDate;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    @Override
    public String toString() {
        return "User{" +
                "uId=" + uId +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", telephone='" + telephone + '\'' +
                ", email='" + email + '\'' +
                ", sex='" + sex + '\'' +
                ", brithday=" + brithday +
                ", address='" + address + '\'' +
                ", profile='" + profile + '\'' +
                ", headPicPath='" + headPicPath + '\'' +
                ", logoffDate='" + logoffDate + '\'' +
                ", regDate='" + regDate + '\'' +
                '}';
    }
    public User(){

    }
    public User(int uId){
        this.uId = uId;
    }
}