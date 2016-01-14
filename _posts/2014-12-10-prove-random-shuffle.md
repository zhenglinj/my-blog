---
layout: post
title: "洗牌算法 Random shuffle 证明"
description: "洗牌算法 Random shuffle 证明"
category: "technology"
draft: false
analytics: true
comments: true
tags: [algorithm]
---
{% include JB/setup %}

洗牌算法 Random shuffle 证明

---

## 问题

洗牌算法，Random shuffle 算法，随机化序列

## 解决简介

可以用一句伪代码表达 `for i:=1 to n do swap(a[i], a[random(1,i)]);`

## 证明

采用数学归纳法证明

1. 当 $$n = 2$$ 时，显然成立，即 `for i:=1 to 2 do swap(a[i], a[random(1,i)]);` 操作，可以得出 $$p_{(i = x)} = \frac{1}{2}$$，对于 $$i$$ 在 $$[1, 2]$$ 内, $$x$$是序列 $$a$$ 的某一元素 成立
2. **假设** $$n = k, (k >= 2)$$ 成立，即 `for i:=1 to k do swap(a[i], a[random(1,i)]);` 操作，可以得出 $$p_{(i = x)} = \frac{1}{k}$$，对于 $$i$$ 在 $$[1, k]$$ 内, $$x$$是序列 $$a$$ 的某一元素 成立；
   **则** $$n = k + 1$$ 时，操作 `for i:=1 to k+1 do swap(a[i], a[random(1,i)]);`
   可分解为 `for i:=1 to k do swap(a[i], a[random(1, i)]); swap(a[k+1], a[random(1, k+1)]);` 两步操作，

    * 第一句伪代码执行得出：前 k 次循环所得序列各个元素出现概率为 $$p^{(k)}_{(i = x)}$$
      其中 $$p^{(k)}_{(i = x)} = \frac{1}{k}$$，对于 $$i$$ 在 $$[1, k]$$ 内, $$x$$是序列 $$a$$ 的某一元素，
    * 第二句伪代码执行得出：经过第 k+1 次循环所得序列各个元素出现概率为 $$p^{(k+1)}_{(i = x)}$$

      * 其中 $$p^{(k+1)}_{(i = x)} = p^{(k)}_{(i = x)} \frac{k}{k+1} = \frac{1}{k+1}$$，对于 $$i$$ 在 $$[1, k]$$ 内；
      * 元素 $$x$$ 在 $$[1, k]$$ 中某个位置 （无论是在 $$i$$ 位置或不是 $$i$$ 位置），只要交换 $$x$$ 所在的位置和 $$k+1$$ 位置即可，故，$$p^{(k+1)}_{(i = x)} = \frac{1}{k+1}$$，对于$$i = k+1$$；

      所以， $$p^{(k+1)}_{(i = x)} = \frac{1}{k+1}$$ ，即，$$p_{(i = x)} = \frac{1}{n}$$ 对于 $$n = k + 1$$ 成立

综上，由1，2问题得到证
