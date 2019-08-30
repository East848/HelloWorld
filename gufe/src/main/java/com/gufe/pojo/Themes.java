package com.gufe.pojo;

public class Themes {
    private int tId; // 主题id
    private String themeTitle;  // 主题标题
    private String themeContext;// 主题内容
    private int commSum;  //评论数
    private String releaseTime;  //发布时间
    private User user; //用户

    public int gettId() {
        return tId;
    }

    public void settId(int tId) {
        this.tId = tId;
    }

    public String getThemeTitle() {
        return themeTitle;
    }

    public void setThemeTitle(String themeTitle) {
        this.themeTitle = themeTitle;
    }

    public String getThemeContext() {
        return themeContext;
    }

    public void setThemeContext(String themeContext) {
        this.themeContext = themeContext;
    }

    public int getCommSum() {
        return commSum;
    }

    public void setCommSum(int commSum) {
        this.commSum = commSum;
    }

    public String getReleaseTime() {
        return releaseTime;
    }

    public void setReleaseTime(String releaseTime) {
        this.releaseTime = releaseTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Themes{" +
                "tId=" + tId +
                ", themeTitle='" + themeTitle + '\'' +
                ", themeContext='" + themeContext + '\'' +
                ", commSum=" + commSum +
                ", releaseTime='" + releaseTime + '\'' +
                '}';
    }

    //构造函数
    public Themes(){

    }
    public Themes(int tId){
        this.tId = tId;
    }
}
