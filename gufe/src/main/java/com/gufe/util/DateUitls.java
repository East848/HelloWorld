package com.gufe.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUitls {
    public Date StrTodate(String str){
        Date date, dateDB = null;
        try {
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            date = dateFormat.parse(str);
            dateDB =new java.sql.Date(date.getTime());
            return  dateDB;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return  dateDB;
    }
    public Date dateToDate(Date date){

        return null;
    }
}
