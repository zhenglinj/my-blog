---
layout: post
title: "C++ 栈与堆比较"
description: "C++ 内存管理，本文对比堆栈的区别并得出结论，何时用栈（Stack），何时用堆（Heap）"
category: "technology"
draft: false
analytics: true
comments: true
tags: [C++, 内存管理, 笔记]
---
{% include JB/setup %}

C++ 内存管理，本文对比堆栈的区别并得出结论，何时用栈（Stack），何时用堆（Heap）。

---

## 栈与堆比较

|    | 大小 | 是否可变                 | 生命周期                               | 效率                    |
|----|------|--------------------------|----------------------------------------|-------------------------|
| 栈 | 较小 | 不可变，在编译期就要确定 | 生命周期结束时，会自动调用析构函数     | 更高效                  |
| 堆 | 较大 | 可变                     | 需要手动释放内存，必须警觉内存泄漏问题 | new / malloc() 较慢操作 |

**例子：**

```cpp
class Thingy;

Thingy* foo()
{
  Thingy B; // this thingy lives on the stack and will be deleted when we return from foo
  Thingy *pointerToB = &B; // this points to an address on the stack
  Thingy *pointerToC = new Thingy(); // this makes a Thingy on the heap.
                                     // pointerToC contains its address.

  // this is safe: C lives on the heap and outlives foo().
  // Whoever you pass this to must remember to delete it!
  return pointerToC;

  // this is NOT SAFE: B lives on the stack and will be deleted when foo() returns.
  // whoever uses this returned pointer will probably cause a crash!
  return pointerToB;
}
```

## 结论

> Store it on the stack, if you CAN.
>
> Store it on the heap, if you NEED TO.
>
> Therefore, prefer the stack to the heap. Some possible reasons that you can't store something on the stack are:
>
> - It's too big - on multithreaded programs on 32-bit OS, the stack has a small and fixed (at thread-creation time at least) size (typically just a few megs. This is so that you can create lots of threads without exhausting address space. For 64-bit programs, or single threaded (Linux anyway) programs, this is not a major issue. Under 32-bit Linux, single threaded programs usually use dynamic stacks which can keep growing until they reach the top of the heap.
> - You need to access it outside the scope of the original stack frame - this is really the main reason.
>
> It is possible, with sensible compilers, to allocate non-fixed size objects on the heap (usually arrays whose size is not known at compile time).

如果可以优先考虑将对象存放在栈上，如果由于空间限制（不同平台的栈空间限制不同）则考虑将对象放在堆上。不能将对象放在栈上的可能原因有：

- 对象太大；不同平台有不同的限制；
- 对象在其作用域外被使用。

## 参考

[Proper stack and heap usage in C++](http://stackoverflow.com/questions/599308/proper-stack-and-heap-usage-in-c)
[Stack vs. Heap](http://www.programgo.com/article/9288878764/)
