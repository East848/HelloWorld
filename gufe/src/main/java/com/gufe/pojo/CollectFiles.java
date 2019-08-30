package com.gufe.pojo;

/**
 *  收藏实体类
 */
public class CollectFiles {
    private int cfId; // 收藏表id
    private Files files;
    private User user;
    private String collectDate;

    public int getCfId() {
        return cfId;
    }

    public void setCfId(int cfId) {
        this.cfId = cfId;
    }

    public Files getFiles() {
        return files;
    }

    public void setFiles(Files files) {
        this.files = files;
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
        return "CollectFiles{" +
                "cfId=" + cfId +
                ", collectDate='" + collectDate + '\'' +
                '}';
    }
}
