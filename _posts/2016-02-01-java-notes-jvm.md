---
layout: post
title: "Java 从零进阶 - JVM"
excerpt: "《Java 从零进阶》系列将从：Java语言基础，JVM，并发编程三方面从介绍到深入理解Java。本文是该系列的JVM。"
category: "technology"
draft: false
analytics: true
comments: true
tags: [java, notes]
---
{% include JB/setup %}

《Java 从零进阶》系列将从：Java语言基础，JVM，并发编程三方面从介绍到深入理解Java。本文是该系列的JVM。

---

## Java虚拟机JVM

## Java内存模型

[http://www.jcp.org/en/jsr/detail?id=133](http://www.jcp.org/en/jsr/detail?id=133)  
[Java内存模型FAQ](http://ifeve.com/jmm-faq/)  

## Java内存管理，堆和栈

## Java垃圾回收机制

[深入理解java垃圾回收机制](http://www.cnblogs.com/sunniest/p/4575144.html)  
[深入理解JVM(2)——GC算法与内存分配策略](https://crowhawk.github.io/2017/08/10/jvm_2/)  
[深入理解JVM(3)——7种垃圾收集器](https://crowhawk.github.io/2017/08/15/jvm_3/)  

## JVM类加载

[深入理解JVM(5)——虚拟机类加载机制](https://crowhawk.github.io/2017/08/21/jvm_5/)  
[深入理解JVM(6)——类加载器](https://crowhawk.github.io/2017/08/21/jvm_6/)  

## JVM各种参数及调优

## Java工具的使用

jps, jstack, jmap, jconsole, jinfo, jhat, javap, …

[http://kenai.com/projects/btrace](http://kenai.com/projects/btrace)

[http://www.crashub.org/](http://www.crashub.org/)

[https://github.com/taobao/TProfiler](https://github.com/taobao/TProfiler)

[https://github.com/CSUG/HouseMD](https://github.com/CSUG/HouseMD)

[http://wiki.cyclopsgroup.org/jmxterm](http://wiki.cyclopsgroup.org/jmxterm)

[https://github.com/jlusdy/TBJMap](https://github.com/jlusdy/TBJMap)

## Java诊断工具

[http://www.eclipse.org/mat/](http://www.eclipse.org/mat/)

[http://visualvm.java.net/oqlhelp.html](http://visualvm.java.net/oqlhelp.html)

**编写OutOfMemory, StackOverFlow程序**

> Heap OutOfMemory  
> Young OutOfMemory  
> MethodArea OutOfMemory  
> ConstantPool OutOfMemory  
> DirectMemory OutOfMemory  
> Stack OutOfMemory  
> Stack OverFlow  

[https://plumbr.eu/blog/memory-leaks/understanding-java-lang-outofmemoryerror](https://plumbr.eu/blog/memory-leaks/understanding-java-lang-outofmemoryerror)

**使用工具尝试解决以下问题，并写下总结**

当一个Java程序响应很慢时如何查找问题 当一个Java程序频繁FullGC时如何解决问题，如何查看垃圾回收日志 当一个Java应用发生OutOfMemory时该如何解决，年轻代、年老代、永久代解决办法不同，导致原因也不同

## 参考资料

[http://docs.oracle.com/javase/specs/jvms/se7/html/](http://docs.oracle.com/javase/specs/jvms/se7/html/)

[http://www.cs.umd.edu/~pugh/java/memoryModel/](http://www.cs.umd.edu/~pugh/java/memoryModel/)

[http://gee.cs.oswego.edu/dl/jmm/cookbook.html](http://gee.cs.oswego.edu/dl/jmm/cookbook.html)
