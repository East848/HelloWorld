package com.gufe.test;


import com.gufe.dao.UserDao;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;

public class TestJ {

   @Test
    public void TestDelFile() {
       String filepath = "E:\\test\\aaa\\1000_test_黑洞.jpg";

    }


    @Test
    public void TestJson(){
      String path ="E:\\test\\aaa\\A_背影.png";
      int index = path.indexOf("A_");
      int dot =path.lastIndexOf(".");
      String name = path.substring(index+2,dot);
        System.out.println(name);
    }


}
