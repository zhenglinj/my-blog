---
layout: post
title: "Java 之禅 基础"
description: "Java 学习笔记之基础篇"
category: "technology"
draft: false
analytics: true
comments: true
tags: [java, 笔记]
---
{% include JB/setup %}

Java 学习笔记之基础篇

---

## Java基础知识

Java入门教程：[Java教程](http://www.runoob.com/java/java-tutorial.html) 教程中内容有些小错误 <!-- TODO -->
开发环境教程：[IntelliJ IDEA 使用教程](http://wiki.jikexueyuan.com/project/intellij-idea-tutorial/) [Eclipse 使用教程]()

```java
class HelloA {

    public HelloA() {
        System.out.println("HelloA");
    }

    { System.out.println("I'm A class"); }

    static { System.out.println("static A"); }

}

public class HelloB extends HelloA {
    public HelloB() {
        System.out.println("HelloB");
    }

    { System.out.println("I'm B class"); }

    static { System.out.println("static B"); }

    public static void main(String[] args) {
        System.out.println("---- main start ----");
        new HelloB();
        System.out.println("---- main end   ----");
    }
}
```

执行 `java HelloB` 结果：

```nohighlight
static A
static B
---- main start ----
I'm A class
HelloA
I'm B class
HelloB
---- main end   ----
```

静态语句块、构造语句块（就是只有大括号的那块）以及构造函数的执行顺序。对象的初始化顺序：

1. 类加载之后，按从上到下（从父类到子类）执行被static修饰的语句；
2. 当static语句执行完之后,再执行main方法；
3. 如果有语句new了自身的对象，将从上到下执行构造代码块、构造器（两者可以说绑定在一起）。

**重点熟悉：**

- Java关键字
- [Java基本数据类型](http://www.runoob.com/java/java-basic-datatypes.html)
- [Java String的使用](http://www.runoob.com/java/java-string.html)

## Java集合框架

[**Java集合框架**](http://sparkandshine.net/java-collections-framework-overview-collection-list-set-queue-map/)用来表示和操作集合的统一框架，它包含接口，实现类以及一些编程辅助算法，具体位于`java.util`包下。

> `java.util.ArrayList` `java.util.LinkedList` `java.util.HashMap` `java.util.LinkedHashMap` `java.util.TreeMap` `java.util.HashSet` `java.util.LinkedHashSet` `java.util.TreeSet` `...`

Java集合框架(Java collections framework, JCF)是一组实现集合数据结构的类和接口。集合框架示意图如下(实际远比下图复杂)，图片来源于[这里](http://www.codejava.net/images/articles/javacore/collections/collections%20framework%20overview.png)
![Alt Text](/assets/images/collections-framework-overview_thumb.png )

### Java基础包源代码

> `java.lang.String` `java.lang.Integer` `java.lang.Long` `java.lang.Enum` `java.lang.ThreadLocal` `java.lang.ClassLoader` `java.net.URLClassLoader` `java.math.BigDecimal`

### Java IO 和 Java NIO

Java的IO操作中有面向字节(Byte)和面向字符(Character)两种方式。

- 面向字节的操作为以8位为单位对二进制的数据进行操作，对数据不进行转换，这些类都是InputStream和OutputStream的子类。
- 面向字符的操作为以字符为单位对数据进行操作，在读的时候将二进制数据转为字符，在写的时候将字符转为二进制数据，这些类都是Reader和Writer的子类。

总结：以InputStream（输入）/OutputStream（输出）为后缀的是字节流；以Reader（输入）/Writer（输出）为后缀的是字符流。Java流类图结构如下：

![Alt Text](/assets/images/java_io_stream.jpg )

#### Java NIO和IO的主要区别

| `java.io.*`    | `java.nio.*`         |
| :------------: | :------------------: |
| 面向流         | 面向缓冲             |
| 阻塞IO         | 非阻塞IO             |
| 无             | 选择器(Selectors)    |

参考 [Java NIO 入门](http://www.ibm.com/developerworks/cn/education/java/j-nio/j-nio.html) [Java NIO与IO](http://ifeve.com/java-nio-vs-io/) 总结整理使用方法如下。

#### NIO程序设计

读和写是 I/O 的基本过程。从一个通道中读取很简单：只需创建一个缓冲区，然后让通道将数据读到这个缓冲区中。写入也相当简单：创建一个缓冲区，用数据填充它，然后让通道用这些数据来执行写入操作。

- 读取文件涉及三个步骤：(1) 从 FileInputStream 获取 Channel，(2) 创建 Buffer，(3) 将数据从 Channel 读到 Buffer 中；
- 写入文件涉及三个步骤：(1) 从 FileOutputStream 获取 Channel，(2) 创建 Buffer，(3) 将数据放到 Buffer 中再写入 Channel 中。

现在，通过 `CopyFile` 例子让我们看一下这个过程。

```java
{% include_relative code/JavaNIO/CopyFile.java %}
```

#### 缓冲区内部细节

#### 连网和异步 I/O

通常，在代码进行 read() 调用时，代码会阻塞直至有可供读取的数据。同样， write() 调用将会阻塞直至数据能够写入。
异步 I/O 是一种__没有阻塞地__读写数据的方法。相反，您将注册对特定 I/O 事件的兴趣可读的数据的到达、新的套接字连接等等，而在发生这样的事件时，系统将会告诉您。

我们将通过研究一个名为 EchoServer.java 的例子程序来查看异步 I/O 的实际应用。这个程序就像传统的 echo server，它接受网络连接并向它们回响它们可能发送的数据。

```java
{% include_relative code/JavaNIO/EchoServer.java %}
```

执行 `java EchoServer`

```nohighlight
Start listening on 12345
Accepted connection from 127.0.0.1 java.nio.channels.SocketChannel[connected local=/127.0.0.1:12345 remote=/127.0.0.1:22665].
Accepted connection from 127.0.0.1 java.nio.channels.SocketChannel[connected local=/127.0.0.1:12345 remote=/127.0.0.1:22672].
127.0.0.1 disconnected java.nio.channels.SocketChannel[connected local=/127.0.0.1:12345 remote=/127.0.0.1:22672].
127.0.0.1 disconnected java.nio.channels.SocketChannel[connected local=/127.0.0.1:12345 remote=/127.0.0.1:22665].
```

#### 字符集

根据 Sun 的文档，一个 Charset 是“十六位 Unicode 字符序列与字节序列之间的一个命名的映射”。实际上，一个 Charset 允许您以尽可能最具可移植性的方式读写字符序列。

**编码/解码**

要读和写文本，我们要分别使用 `CharsetDecoder` 和 `CharsetEncoder`。将它们称为 _编码器_ 和 _解码器_ 是有道理的。一个 字符 不再表示一个特定的位模式，而是表示字符系统中的一个实体。因此，由某个实际的位模式表示的字符必须以某种特定的 编码 来表示。
CharsetDecoder 用于将逐位表示的一串字符转换为具体的 char 值。同样，一个 CharsetEncoder 用于将字符转换回位。

**处理文本的正确方式**

现在我们将分析这个例子程序 `UseCharsets.java`。这个程序非常简单它从一个文件中读取一些文本，并将该文本写入另一个文件。但是它把该数据当作文本数据，并使用 CharBuffer 来将该数句读入一个 CharsetDecoder 中。同样，它使用 CharsetEncoder 来写回该数据。
我们将假设字符以 ISO-8859-1(Latin1) 字符集（这是 ASCII 的标准扩展）的形式储存在磁盘上。尽管我们必须为使用 Unicode 做好准备，但是也必须认识到不同的文件是以不同的格式储存的，而 ASCII 无疑是非常普遍的一种格式。事实上，每种 Java 实现都要求对以下字符编码提供完全的支持： US-ASCII, ISO-8859-1, UTF-8, UTF-16BE, UTF-16LE, UTF-16

**示例程序**

```java
{% include_relative code/JavaNIO/UseCharsets.java %}
```

#### Reactor模式

IO并发设计：Reactor模式与Proactor模式

### Java反射与javassist

反射与工厂模式 `java.lang.reflect.*`

### Java序列化

什么是序列化，为什么序列化 序列化与单例模式 `java.io.Serializable`

定义了如下的Employee类，该类实现了 Serializable 接口

```java
{% include_relative code/JavaSerializableDemo/src/Employee.java %}
```

一个类的对象要想序列化必须满足两个条件：

- 该类必须实现 java.io.Serializable 对象。
- 该类的所有属性必须是可序列化的。如果有一个属性不是可序列化的，则该属性必须注明是短暂的。
  如果你想知道一个Java标准类是否是可序列化的，请查看该类的文档。检验一个类的实例是否能序列化十分简单， 只需要查看该类有没有实现java.io.Serializable接口。

**序列化和反序列化**

```java
{% include_relative code/JavaSerializableDemo/src/Main.java %}
```

输出结果：

```nohighlight
Serialized data is saved in ./employee.ser
Deserialized Employee from ./employee.ser ...
Name: Reyan Ali
Address: Phokka Kuan, Ambehta Peer
SSN: 0
Number: 101
Mailing a check to Reyan Ali Phokka Kuan, Ambehta Peer
```

### 虚引用，弱引用，软引用

`java.lang.ref.*` 实验这些引用的回收

### Java系统属性

`java.util.Properties`

### Annotation用法

`java.lang.annotation.*`

### JMS

`javax.jms.*`

### JMX

`java.lang.management.*` `javax.management.*`

### 泛型和继承，泛型和擦除

### 自动拆箱装箱与字节码

### 实现Callback

### java.lang.Void类使用

### Java Agent，premain函数

`java.lang.instrument`

### 单元测试

[Junit](http://junit.org/)

[Jmockit](https://code.google.com/p/jmockit/)

[djUnit](http://works.dgic.co.jp/djunit/)

### Java正则表达式

Java实现通过正则表达式提取一段文本中的电子邮件，并将@替换为#输出

`java.lang.util.regex.*`

### 常用的Java工具库

`commons.lang` `commons.*...` `guava-libraries` `netty`

### API & SPI

[http://en.wikipedia.org/wiki/Application_programming_interface](http://en.wikipedia.org/wiki/Application_programming_interface)

[http://en.wikipedia.org/wiki/Service_provider_interface](http://en.wikipedia.org/wiki/Service_provider_interface)

### Apache Maven

[Apache Maven Project](http://maven.apache.org/index.html)
[IntelliJ IDEA中Maven功能](http://www.youmeek.com/intellij-idea-part-xviii-maven/)

### 参考资料

JDK src.zip 源代码

[http://openjdk.java.net/](http://openjdk.java.net/)

[http://commons.apache.org/](http://commons.apache.org/)

[https://code.google.com/p/guava-libraries/](https://code.google.com/p/guava-libraries/)

[http://netty.io/](http://netty.io/)

[http://stackoverflow.com/questions/2954372/difference-between-spi-and-api](http://stackoverflow.com/questions/2954372/difference-between-spi-and-api)

[http://stackoverflow.com/questions/11404230/how-to-implement-the-api-spi-pattern-in-java](http://stackoverflow.com/questions/11404230/how-to-implement-the-api-spi-pattern-in-java)



## Java虚拟机JVM

### Java内存模型，Java内存管理，Java堆和栈

[http://www.jcp.org/en/jsr/detail?id=133](http://www.jcp.org/en/jsr/detail?id=133)

[Java内存模型FAQ](http://ifeve.com/jmm-faq/)

### Java垃圾回收机制

[深入理解java垃圾回收机制](http://www.cnblogs.com/sunniest/p/4575144.html)

### JVM各种参数及调优


### Java工具的使用

jps, jstack, jmap, jconsole, jinfo, jhat, javap, …

[http://kenai.com/projects/btrace](http://kenai.com/projects/btrace)

[http://www.crashub.org/](http://www.crashub.org/)

[https://github.com/taobao/TProfiler](https://github.com/taobao/TProfiler)

[https://github.com/CSUG/HouseMD](https://github.com/CSUG/HouseMD)

[http://wiki.cyclopsgroup.org/jmxterm](http://wiki.cyclopsgroup.org/jmxterm)

[https://github.com/jlusdy/TBJMap](https://github.com/jlusdy/TBJMap)

### Java诊断工具

[http://www.eclipse.org/mat/](http://www.eclipse.org/mat/)

[http://visualvm.java.net/oqlhelp.html](http://visualvm.java.net/oqlhelp.html)

**编写outofmemory, stackoverflow程序**

> HeapOutOfMemory  
> Young OutOfMemory  
> MethodArea OutOfMemory  
> ConstantPool OutOfMemory  
> DirectMemory OutOfMemory  
> Stack OutOfMemory Stack OverFlow  

**使用工具尝试解决以下问题，并写下总结**

当一个Java程序响应很慢时如何查找问题 当一个Java程序频繁FullGC时如何解决问题，如何查看垃圾回收日志 当一个Java应用发生OutOfMemory时该如何解决，年轻代、年老代、永久代解决办法不同，导致原因也不同

### 参考资料

[http://docs.oracle.com/javase/specs/jvms/se7/html/](http://docs.oracle.com/javase/specs/jvms/se7/html/)

[http://www.cs.umd.edu/~pugh/java/memoryModel/](http://www.cs.umd.edu/~pugh/java/memoryModel/)

[http://gee.cs.oswego.edu/dl/jmm/cookbook.html](http://gee.cs.oswego.edu/dl/jmm/cookbook.html)

## Java并发编程

### 阅读源代码

> `java.lang.Thread`
> `java.lang.Runnable`
> `java.util.concurrent.Callable` `java.util.concurrent.locks.ReentrantLock` `java.util.concurrent.locks.ReentrantReadWriteLock` `java.util.concurrent.atomic.Atomic*` `java.util.concurrent.Semaphore` `java.util.concurrent.CountDownLatch` `java.util.concurrent.CyclicBarrier` `java.util.concurrent.ConcurrentHashMap` `java.util.concurrent.Executors`

**线程的生命周期**

线程经过其生命周期的各个阶段。下图显示了一个线程完整的生命周期。

![Alt Text](/assets/images/java_thread.jpg)

- 新状态：一个新产生的线程从新状态开始了它的生命周期。它保持这个状态知道程序start这个线程。
- 运行状态：当一个新状态的线程被start以后，线程就变成可运行状态，一个线程在此状态下被认为是开始执行其任务
- 就绪状态：当一个线程等待另外一个线程执行一个任务的时候，该线程就进入就绪状态。当另一个线程给就绪状态的线程发送信号时，该线程才重新切换到运行状态。
- 休眠状态：由于一个线程的时间片用完了，该线程从运行状态进入休眠状态。当时间间隔到期或者等待的时间发生了，该状态的线程切换到运行状态。
- 终止状态：一个运行状态的线程完成任务或者其他终止条件发生，该线程就切换到终止状态。

### 创建一个线程

Java提供了两种创建线程方法：

- 通过实现Runable接口；
- 通过继承Thread类本身。

#### 通过实现Runnable接口来创建线程

```java
{% include_relative code/JavaThread/ThreadDemo.java %}
```

执行 `java ThreadDemo`

```nohighlight
Child thread: Thread[Demo Thread,5,main]
Main Thread: 5
Child Thread: 5
Child Thread: 4
Main Thread: 4
Child Thread: 3
Child Thread: 2
Child Thread: 1
Main Thread: 3
Exiting child thread.
Main Thread: 2
Main Thread: 1
Main thread exiting.
```

#### 通过继承Thread来创建线程

```java
{% include_relative code/JavaThread/ExtendThread.java %}
```

执行 `java ExtendThread`

```java
Child thread: Thread[Demo Thread,5,main]
Main Thread: 5
Child Thread: 5
Child Thread: 4
Main Thread: 4
Child Thread: 3
Child Thread: 2
Main Thread: 3
Child Thread: 1
Exiting child thread.
Main Thread: 2
Main Thread: 1
Main thread exiting.
```

### 线程安全

多线程的工作原理，jvm有一个 main memory，而每个线程有自己的 working memory，一个线程对一个变量进行操作时，都要在自己的 working memory 里面建立一个拷贝，操作完之后再写入 main memory。多个线程同时操作同一个变量，就可能会出现不可预知的结果。根据上面的解释，很容易想出相应的场景。

而用synchronized的关键是建立一个monitor，这个monitor可以是要修改的变量也可以其他你认为合适的object比如method，然后通过给这个monitor加锁来实现线程安全，每个线程在获得这个锁之后，要执行完 load到workingmemory -> use&assign -> store到mainmemory 的过程，才会释放它得到的锁。这样就实现了所谓的线程安全。

如果你的代码所在的进程中有多个线程在同时运行，而这些线程可能会同时运行这段代码。如果每次运行结果和单线程运行的结果是一样的，而且其他的变量的值也和预期的是一样的，就是线程安全的。

举例 比如一个 ArrayList 类，在添加一个元素的时候，它可能会有两步来完成：1. 在 Items[Size] 的位置存放此元素；2. 增大 Size 的值。

在单线程运行的情况下，如果 Size = 0，添加一个元素后，此元素在位置 0，而且 Size=1； 而如果是在多线程情况下，比如有两个线程，线程 A 先将元素存放在位置 0。但是此时 CPU 调度线程A暂停，线程 B 得到运行的机会。线程B也向此 ArrayList 添加元素，因为此时 Size 仍然等于 0 （注意哦，我们假设的是添加一个元素是要两个步骤哦，而线程A仅仅完成了步骤1），所以线程B也将元素存放在位置0。然后线程A和线程B都继续运行，都增加 Size 的值。 那好，现在我们来看看 ArrayList 的情况，元素实际上只有一个，存放在位置 0，而 Size 却等于 2。这就是线程不安全。

### 学习使用线程池，自己设计线程池需要注意什么

### 锁

什么是锁，锁的种类有哪些，每种锁有什么特点，适用场景是什么 在并发编程中锁的意义是什么

### synchronized的作用是什么，synchronized和lock

### sleep和wait

### wait和notify

### 什么是守护线程，守护线程和非守护线程的区别以及用法

### volatile关键字的理解

C++ volatile关键字和Java volatile关键字 happens-before语义 编译器指令重排和CPU指令重排

[http://en.wikipedia.org/wiki/Memory_ordering](http://en.wikipedia.org/wiki/Memory_ordering)

[http://en.wikipedia.org/wiki/Volatile_variable](http://en.wikipedia.org/wiki/Volatile_variable)

[http://preshing.com/20130702/the-happens-before-relation/](http://preshing.com/20130702/the-happens-before-relation/)

### 线程安全

如果为count加上volatile修饰是否能够做到线程安全？你觉得该怎么做是线程安全的？

```java
public class Sample {
  private static int count = 0;
  public static void increment() {
    count++;
  }
}
```

解释一下下面两段代码的差别

```java
// 代码1
public class Sample {
  private static int count = 0;
  synchronized public static void increment() {
    count++;
  }
}
// 代码2
public class Sample {
  private static AtomicInteger count = new AtomicInteger(0);
  public static void increment() {
    count.getAndIncrement();
  }
}
```

### 参考资料

[http://book.douban.com/subject/10484692/](http://book.douban.com/subject/10484692/)

[http://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html](http://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html)
