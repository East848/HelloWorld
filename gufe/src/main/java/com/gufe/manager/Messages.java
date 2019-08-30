package com.gufe.manager;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

public class Messages {
        //json返回到前端
        public String JsonMsg(String msg){
            String temmsg = "{"+"\"msg\""+":"+"\""+msg+"\""+"}";
            JSONObject json = JSON.parseObject(temmsg);
            return json.toString();
        }
}
