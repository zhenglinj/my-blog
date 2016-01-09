// 创建一个线程，最简单的方法是创建一个实现 Runnable 接口的类
// 为了实现 Runnable，一个类只需要执行一个方法调用 run()
class NewThread1 implements Runnable {
    Thread t;

    NewThread1() {
        // 类中实例化一个线程对象
        // Thread(Runnable threadOb, String threadName);
        t = new Thread(this, "Demo Thread");
        System.out.println("Child thread: " + t);
        // 新线程创建之后，调用它的 start() 方法它才会运行
        t.start();
    }

    public void run() {
        try {
            for(int i = 5; i > 0; i--) {
                System.out.println("Child Thread: " + i);
                Thread.sleep(50);
            }
        } catch (InterruptedException e) {
            System.out.println("Child interrupted.");
        }
        System.out.println("Exiting child thread.");
    }
}

public class ThreadDemo {
    public static void main(String args[]) {
        NewThread1 nt = new NewThread1();
        System.out.println("NewThread1" + nt);
        try {
            for(int i = 5; i > 0; i--) {
                System.out.println("Main Thread: " + i);
                Thread.sleep(100);
            }
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted.");
        }
        System.out.println("Main thread exiting.");
    }
}