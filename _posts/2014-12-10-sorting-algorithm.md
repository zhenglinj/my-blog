---
layout: post
title: "常用排序算法介绍"
description: "排序算法简单讲解，Python 比较接近伪代码所以采用 Python 简单实现"
category: "technology"
draft: false
analytics: true
comments: true
tags: [sorting, algorithm, 笔记]
---
{% include JB/setup %}

排序算法简单讲解，因为 Python 比较接近伪代码所以采用 Python 简单实现

---

## 图说排序

> [7 种常用的排序算法](http://blog.jobbole.com/11745/)

## 具体介绍常用排序算法

> [冒泡排序 Bubble sort](http://www.cnblogs.com/morewindows/archive/2011/08/06/2129603.html)
> [插入排序 Insertion sort](http://www.cnblogs.com/morewindows/archive/2011/08/06/2129610.html)
> [希尔排序 Shell sort](http://www.cnblogs.com/morewindows/archive/2011/08/08/2130684.html)
> [选择排序 Selection sort](http://www.cnblogs.com/morewindows/archive/2011/08/09/2131953.html)
> [归并排序 Merge sort](http://www.cnblogs.com/morewindows/archive/2011/08/11/2134593.html)
> [快速排序 Quick sort](http://www.cnblogs.com/morewindows/archive/2011/08/13/2137415.html)
> [堆排序   Heap sort](http://www.cnblogs.com/morewindows/archive/2011/08/22/2149612.html)

## 排序算法简单实现

Python 实现：

```python
{% include_relative code/xxx_sort.py %}
```

输出结果：

````nohighlight
Quick sort
Origin: [8, 4, 3, 1, 9, 6, 5, 7, 2, 0]
Devide: [0, 4, 3, 1, 2, 6, 5, 7] 8 [9]
Devide:  0 [4, 3, 1, 2, 6, 5, 7]
   Devide: [2, 3, 1] 4 [6, 5, 7]
   Devide: [1] 2 [3]
   Concat: [1, 2, 3]
               Devide: [5] 6 [7]
               Concat: [5, 6, 7]
   Concat: [1, 2, 3, 4, 5, 6, 7]
Concat: [0, 1, 2, 3, 4, 5, 6, 7]
Concat: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Result: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

Merge sort
Origin: [8, 4, 3, 1, 9, 6, 5, 7, 2, 0]
Devide: [8, 4, 3, 1, 9][6, 5, 7, 2, 0]
:   Devide: [8, 4][3, 1, 9]
:   :   Devide: [8][4]
:   :   Merge:  [4, 8]
:   :   Devide: [3][1, 9]
:   :   :   Devide: [1][9]
:   :   :   Merge:  [1, 9]
:   :   Merge:  [1, 3, 9]
:   Merge:  [1, 3, 4, 8, 9]
:   Devide: [6, 5][7, 2, 0]
:   :   Devide: [6][5]
:   :   Merge:  [5, 6]
:   :   Devide: [7][2, 0]
:   :   :   Devide: [2][0]
:   :   :   Merge:  [0, 2]
:   :   Merge:  [0, 2, 7]
:   Merge:  [0, 2, 5, 6, 7]
Merge:  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Result: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

Selection sort
Origin: [8, 4, 3, 1, 9, 6, 5, 7, 2, 0]
Result: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

Bubble sort
Origin: [8, 4, 3, 1, 9, 6, 5, 7, 2, 0]
Result: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
````

## 延伸问题及解答

排序算法可以延伸解决其他问题，以下是几个例子：

-  Random shuffle 随机化序列（洗牌算法）
   **简介**：可以用一句伪代码表达 `for i:=1 to n do swap(a[i], a[random(1,i)]);`
   **证明**：见[这里](../prove-random-shuffle)
-  序列的逆序数
   **简介**：可以用类似 冒泡排序 或 归并排序 解决
   **证明**：略
-  TODO

代码如下：

````python
{% include_relative code/sorting_extention.py %}
````

输出结果：

````nohighlight
[3, 8, 6, 7, 9, 2, 1, 5, 0, 4]
The number of inversions:  30
The number of inversions:  30
````
