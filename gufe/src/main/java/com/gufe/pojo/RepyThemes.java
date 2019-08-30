package com.gufe.pojo;

public class RepyThemes {
    private int rId;  // 回复id
    private String repyContext;  // 回复内容
    private String repyTime; //回复时间
    private User  user;  // user
    private Themes themes; //themes

    public int getrId() {
        return rId;
    }

    public void setrId(int rId) {
        this.rId = rId;
    }

    public String getRepyContext() {
        return repyContext;
    }

    public void setRepyContext(String repyContext) {
        this.repyContext = repyContext;
    }

    public String getRepyTime() {
        return repyTime;
    }

    public void setRepyTime(String repyTime) {
        this.repyTime = repyTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Themes getThemes() {
        return themes;
    }

    public void setThemes(Themes themes) {
        this.themes = themes;
    }

    @Override
    public String toString() {
        return "RepyThemes{" +
                "rId=" + rId +
                ", repyContext='" + repyContext + '\'' +
                ", repyTime='" + repyTime + '\'' +
                '}';
    }
}

