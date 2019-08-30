package com.gufe.pojo;

public class Files {
    private Integer fId; // 文件表id
    private String fIco;  // 文件格式
    private String fTitle; // 文件标题
    private Long fSize;  //文件大小
    private String uploadDate; // 上传时间
    private String fPath;  // 文件路径
    private Integer downloadSum;  //下载量
    private Integer collectSum; //收藏量
    private User user;

    public Integer getfId() {
        return fId;
    }

    public void setfId(Integer fId) {
        this.fId = fId;
    }

    public String getfIco() {
        return fIco;
    }

    public void setfIco(String fIco) {
        this.fIco = fIco;
    }

    public String getfTitle() {
        return fTitle;
    }

    public void setfTitle(String fTitle) {
        this.fTitle = fTitle;
    }

    public Long getfSize() {
        return fSize;
    }

    public void setfSize(Long fSize) {
        this.fSize = fSize;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getfPath() {
        return fPath;
    }

    public void setfPath(String fPath) {
        this.fPath = fPath;
    }

    public Integer getDownloadSum() {
        return downloadSum;
    }

    public void setDownloadSum(Integer downloadSum) {
        this.downloadSum = downloadSum;
    }

    public Integer getCollectSum() {
        return collectSum;
    }

    public void setCollectSum(Integer collectSum) {
        this.collectSum = collectSum;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Files{" +
                "fId=" + fId +
                ", fIco='" + fIco + '\'' +
                ", fTitle='" + fTitle + '\'' +
                ", fSize=" + fSize +
                ", uploadDate='" + uploadDate + '\'' +
                ", fPath='" + fPath + '\'' +
                ", downloadSum=" + downloadSum +
                ", collectSum=" + collectSum +
                '}';
    }

    public Files(){

    }
    public Files(int fId){
        this.fId = fId;
    }
}
