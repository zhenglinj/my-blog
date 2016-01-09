import java.lang.String;
import java.lang.Integer;
import java.lang.Long;
import java.lang.Enum;
import java.math.BigDecimal;
import java.lang.ThreadLocal;
import java.lang.ClassLoader;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.TreeMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.TreeSet;
import java.io.*;

public class Main {
    public static void main(String[] args) {
/*
        String str = "abc";
        char data[] = {'d', 'e', 'f'};
        str = new String(data);
        String substr = str.substring(1, 2);
        System.out.println(str);
        System.out.println(substr);

        Integer i;
        Long l;
        Enum<int> enumrate;
*/

        String s = "";
        System.out.println("s=" + s);

        Thread t = new Thread() {
            public void run() {
                System.out.println("pong");
            }
        };

        // t.run();
        t.start();
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("ping");
    }
}
