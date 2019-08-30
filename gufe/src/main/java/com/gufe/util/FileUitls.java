package com.gufe.util;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class FileUitls {
    public List<File> arrayListFile =new ArrayList(); //存储一个目录下的所有文件
    /**
     * @param path 获取path目录下的所有文件
     */
    public void listFile(String path){
        ArrayList<File> fileArrayList =new ArrayList<>();
        File file =new File(path);
        File[] files =file.listFiles();
        for (int i = 0;i<files.length;i++){
            if (files[i].isFile()){
                arrayListFile.add(files[i]);
            }else if(files[i].isDirectory()){
                listFile(files[i].toString());
            }
        }
    }
    /**
     * @param listFiles 存储所有文件的集合, 根据文件名在此集合中查找  然后储存到另一个集合中并返回
     * @param fileName  文件名参数
     */
    public List<File> queryFile(List<File> listFiles,String fileName){
        List<File> files =new ArrayList<>();
      for (int i = 0; i<listFiles.size();i++){
          String temStr = listFiles.get(i).toString();
          int indexDot =temStr.lastIndexOf(".");
          int indexSeparator =temStr.lastIndexOf(File.separator);
          String subName =temStr.substring(indexSeparator+1,indexDot);
          if (fileName.equals(subName)){
              files.add(listFiles.get(i));
          }
      }
      return files;
    }

    //获取文件中心中用户所有图片  //用数据库实现了
    public List<File> getUserPic(List<File> listAllFiles,String fileName){
        List<File> files =new ArrayList<>();
        for (int j = 0; j<listAllFiles.size();j++){
            String tempstr = listAllFiles.get(j).toString();
            int indexDot =tempstr.lastIndexOf("."); //获取从文件中 . 的位置
            int indexSeparator =tempstr.lastIndexOf(File.separator); //获取文件中最后面的文件分隔符的位置
            String subfilename =tempstr.substring(indexSeparator+1,indexDot); //目录下的文件名称
            String suffix = tempstr.substring(indexDot,tempstr.length());
            if (fileName.equals(subfilename)){
                String suffixList = "jpg,png,jpeg,ioc,gif";
                if (suffixList.contains(suffix.trim().toLowerCase())){  //保留图片格式
                    files.add(listAllFiles.get(j)); // 存储本人上传的所有图片
                }
            }
        }
        return files;
    }

    /**
     *  读取文件
     * @param file
     * @return
     */
    public String readerFile(File file){
        String temp = null;
       try {
           FileInputStream fis = new FileInputStream(file);
           byte[] arrayStr = new byte[fis.available()];
           fis.read(arrayStr);
           if (arrayStr[0] == -17 && arrayStr[1] == -69 && arrayStr[2] == -65){
               System.out.println(file.getName() + "：编码为UTF-8");
               temp = new String(arrayStr, "utf-8");
               System.out.println(temp);
           }
           else {
               System.out.println(file.getName() + "：可能是GBK，也可能是其他编码");
               temp =new String(arrayStr,"gbk");
               System.out.println(temp);
           }
           System.out.println("读取完成");
           fis.close();
       }catch (IOException e){
           e.printStackTrace();
       }
        return temp;
    }

    /**
     *  写文件
     * @param file
     * @param fileContext
     */
    public void writeFile(File file,String fileContext){
       try {
           FileOutputStream fos = new FileOutputStream(file);
           byte[] fileByte = fileContext.getBytes();
           fos.write(fileByte);
           System.out.println("写入成功");
           fos.close();
       }catch (IOException ioe){
           ioe.printStackTrace();
       }
    }

    //格式化

    public static String getFileSize(String filesize) {
        /*1汉字=2字节
		1字节（Byte)＝8字位＝8个二进制数
		1字位(bit)＝1个二进制数
		1B=8b
		1KB=1024B
		1MB=1024KB
		1GB=1024MB
		Byte/KB/MB/GB/TB/PB/EB/ZB/YB/DB/NB
		*/
        //String Strnumber = "1539711220";
        int count = 0;
        String[] array = {"1024", "1048576", "1073741824", "1099511627776", "1125899906842624", "1152921504606846976"};
        double number = Double.parseDouble(filesize);
        String resultFileSize = null;
        for (int i = 0; i < array.length; i++) {
            count++;
            long lon = Long.parseLong(array[i]);
            if (number < lon) {
                long aa = lon / 1024;
                switch (count) {
                    case 1:
                        resultFileSize = number + "B";
                        break;
                    case 2:
                        resultFileSize = cov(number = number / aa) + "KB";

                        break;
                    case 3:
                        resultFileSize = cov(number = number / aa) + "MB";
                        break;
                    case 4:
                        resultFileSize = cov(number = number / aa) + "GB";
                        break;
                    case 5:
                        resultFileSize = cov(number = number / aa) + "TB";
                        break;
                    case 6:
                        resultFileSize = cov(number = number / aa) + "PB";
                        break;
                    default:
                        break;
                }
                break;
            }

        }
        return resultFileSize;
        }
    public static String cov(double dou) {
        return String.format("%.2f", dou) ;
    }

    //删除文件
    public boolean isDelFile(String filepath){
        File file = new File(filepath);
        if (!file.exists()){
            System.out.println("文件不存在");
            return false;
        }else {
            if (file.isFile()){
                file.delete();
            }
            return true;
        }
    }



}


