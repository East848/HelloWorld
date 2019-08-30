package com.gufe.pojo;

public class CollectThemes {
    private int ctID;
    private Themes themes;
    private User user;
    private String collectDate;

    public int getCtID() {
        return ctID;
    }

    public void setCtID(int ctID) {
        this.ctID = ctID;
    }

    public Themes getThemes() {
        return themes;
    }

    public void setThemes(Themes themes) {
        this.themes = themes;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCollectDate() {
        return collectDate;
    }

    public void setCollectDate(String collectDate) {
        this.collectDate = collectDate;
    }

    @Override
    public String toString() {
        return "CollectThemes{" +
                "ctID=" + ctID +
                ", collectDate='" + collectDate + '\'' +
                '}';
    }
}
