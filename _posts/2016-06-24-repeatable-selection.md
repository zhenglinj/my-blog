---
layout: post
title: "可重复选择问题解答"
description: "K 个不同元素可重复选择 N 次（其中 N >= K），且 K 个元素全出现，该选择组合总数。这里用较复杂的方法解答了这个问题，若有简单的解法欢迎分享。"
category: "mathematic"
draft: false
analytics: true
comments: true
tags: [mathematic]
---
{% include JB/setup %}

K 个不同元素可重复选择 N 次（其中 N >= K），且 K 个元素全出现，该选择组合总数。这里用较复杂的方法解答了这个问题，若有简单的解法欢迎分享。

---

## 问题描述

K 个不同元素标记为 $${ 1, 2, ..., k }$$ ，可重复选择 N 次其中 $$(N >= K)$$，且 K 个元素全出现，该选择组合总数。

## 问题解答

首先，考虑“可重复选择”简单问题，K 个不同元素，可重复选择 N 次，显然选择总数为 $$K^N$$

再，考虑“可重复遍历选择”（暂时这样称呼该问题），假设这样 k 个元素 n $$(n >= k)$$ 次“可重复遍历选择”总数为 $$a(n, k)$$，稍微计算可得：

$$a(1, 1) = 1$$ $$$$ $$$$

$$a(2, 1) = 1$$, $$a(2, 2) = 2$$ $$$$

$$a(3, 1) = 1$$, $$a(3, 2) = 6$$, $$a(3, 3) = 6$$

$$...$$ $$$$ $$$$

对 $$n = 3$$ 举例发现有以下线性方程组：

$$a(3, 1) = 1^3$$, $$$$

$$C_2^1 a(3, 1) + C_2^2 a(3, 2) = 2^3$$, $$$$

$$C_3^1 a(3, 1) + C_3^2 a(3, 2) + C_3^3 a(3, 3) = 3^3$$ $$$$

则可以将这个问题转化为：k 个元素先选择出 i 个元素 $$(i = 1, 2, ..., k)$$，再在对 i 个元素“可重复遍历选择”得 $$a(n, i)$$，对 i 求和便是“可重复选择”总数，即，$$\sum\limits_{i=1}^k C_k^i a(n, i) = k^n, k = 1, 2, ..., n$$

矩阵表示该线性方程组：

$$
\begin{equation*}
\left[
\begin{matrix}
 1           & 0          & 0          & 0          & \cdots     & 0          & 0      \\
 2           & 1          & 0          & 0          & \cdots     & 0          & 0      \\
 3           & 3          & 1          & 0          & \cdots     & 0          & 0      \\
 4           & 6          & 4          & 1          & \cdots     & 0          & 0      \\
 \vdots      & \vdots     & \ddots     & \vdots     & \vdots     & \vdots     & \vdots \\
 C_{n-1}^1   & C_{n-1}^2  & C_{n-1}^3  & C_{n-1}^4  & \cdots     & 0          & 0      \\
 C_{n}^1     & C_{n}^2    & C_{n}^3    & C_{n}^4    & \cdots     & 0          & 0      \\
\end{matrix}
\right]

*

\left[
\begin{matrix}
 a(n, 1)     \\
 a(n, 2)     \\
 a(n, 3)     \\
 a(n, 4)     \\
 \vdots      \\
 a(n, n-1)   \\
 a(n, n)     \\
\end{matrix}
\right]

=

\left[
\begin{matrix}
 1^n         \\
 2^n         \\
 3^n         \\
 4^n         \\
 \vdots      \\
 (n-1)^n         \\
 (n)^n         \\
\end{matrix}
\right]

\end{equation*} \tag{1}
$$

暂时没找到解析解答，用 Python Numpy 解该方程组，n 较大时因为计算误差会有问题以下对 n = 10 计算

```python
{% include_relative code/repeatable-selection.py %}
```

结果如下：

```nohighlight
>>> K items repeatable all selection N times (N >= k, N = 10):
a(10, 1) = 1,
a(10, 2) = 1022,
a(10, 3) = 55980,
a(10, 4) = 818520,
a(10, 5) = 5103000,
a(10, 6) = 16435440,
a(10, 7) = 29635200,
a(10, 8) = 30240000,
a(10, 9) = 16329600,
a(10, 10) = 3628800,
```