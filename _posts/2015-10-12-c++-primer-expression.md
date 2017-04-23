---
layout: post
title: "C++ Primer 第5版 —— 表达式"
description: "C++ Primer 第5版 第4章表达式的内容补充。本文主要介绍C++11中类型转换，4种显示类型转换。"
category: "technology"
draft: false
analytics: true
comments: true
tags: [C++, notes]
---
{% include JB/setup %}

C++ Primer 第5版 第4章表达式的内容补充。本文主要介绍C++11中类型转换，4种显示类型转换。

---

## 显示类型转换

强制类型转换具有以下形式：

`cast-name<type>(expression);`

| cast-name          | 用处                                             |
|--------------------|--------------------------------------------------|
| `static_cast`      | 任何具有明确定义的类型转换，只要不包含底层 const |
| `const_cast`       | 只能改变运算对象的底层 const                     |
| `reinterpret_cast` | 通常为运算对象的位模式提供较低层次上的重新解释   |
| `dynamic_cast`     |                                                  |


### static_cast

- 把一个较大的算术类型赋值给较小类型时，`static_cast` 非常有用；
- 对于编译器无法自动执行的类型转换也非常有用。

```cpp
// 强制类型转换以便执行浮点除法
double slope = static_cast<double>(j) / i;

// 编译器无法自动类型转换
double d;
void* p = &d;
double* dp = static_cast<double*>(p);
```

### const_cast

- 一般称为“去掉 const 性质（cast away the const）”；
  - 如果对象本身不是一个常量，执行后获取写权限是合法行为；如果对象是一个常量，执行写操作会产生未定义的后果；
- 只能改变表达式的常量属性，不能改变表达式的类型。

```cpp
const char *pc;
char *p = const_cast<char*>(pc);

const char* cp;
// 错误：static_cast 不能去掉 const 性质
char* q = static_cast<char*>(cp);
// 正确：字符串字面值转换成 string 类型
static_cast<string>(cp);
// 错误：const_cast 只能改变常量属性
const_cast<string>(cp);
```

### reinterpret_cast

使用 `reinterpret_cast` 是非常危险的，可以看如下例子：

```cpp
int *ip;
// 必须记住 pc 所指向的真实对象是一个 int 而非字符
char *pc = reinterpret_cast<char*>(ip);
// 错误：把 pc 当成普通字符指针使用可能在运行时发生错误
string str(pc);
```

以上代码中用 pc 初始化 str 语句可能导致异常的运行时行为。其中的关键问题是类型改变了，但编译器没有给出任何警告或者错误的提示信息。

### dynamic_cast



## 旧式的强制类型转换

```nohighlight
type (expr);
(type) expr;
```

旧式的强制类型转换分别具有与 `const_cast`, `static_cast`, `reinterpret_cast` 相似的行为。
