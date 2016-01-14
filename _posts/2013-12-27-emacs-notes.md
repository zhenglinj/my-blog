---
layout: post
title: "Emacs 开箱即用 —— 简易说明书"
description: "Emacs 常用操作的一些笔记，以及在使用 Emacs 过程遇上的问题会不断更新在这里。"
category: "technology"
tags: [emacs, 笔记]
---
{% include JB/setup %}

本文主要介绍Emacs基本操作及某些插件操作，不会介绍Emacs如何配置。同时，记录使用Emacs过程遇上的问题。

---

## 前言

**EMACS = ?**

EMACS = Editor MACroS (Offical) 宏编辑器

简介：[Emacs - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Emacs)

**符号约定**

`C` 代表 Ctrl，示例 `C-h 其他键` => Ctrl+h 其他键；`M` 代表 Alt，示例 `M-x 命令` => Alt+x 命令。其中 `C-h`, `C-x`, `C-c`, `C-u` 一般作为前缀操作 (Prefix Command)。

官方资料 [GNU Emacs Manual](http://www.gnu.org/software/emacs/manual/html_node/emacs/index.html#Top )

## 帮助

Emacs 的帮助系统很强大

+ `F1 其他键` 或 `C-h 其他键`，`C-h h` 查看所有其他键选项；
+ `M-x info` 可以查看各个插件的内置帮助文档；

## 基本操作

内置帮助文档 Tutorial 介绍到基本操作还是不错的。`C-h t` 则默认英文显示 Tutorial，或者 `C-u C-h t` 输入指定语言及编码的 Tutorial。

<!-- TODO -->
基本操作见相关资料：[Mastering Emacs](https://www.masteringemacs.org/)

---

## 常用的 Major Mode

`C-h m` 可以查看当前 buffer 的 Major Mode, Minor Mode 等信息，并且可以看 Major Mode 的相关快捷键。

### info-mode

### org-mode

Org Mode 可以编辑 `*.org` 文件, org 文件可以转换成 `HTML`, `Markdown`, `LATEX`, `ODT` 等等，所以可以用来写博客，写作，写计划TODO等等。
官方网站（含文档）：[Org mode for Emacs](http://orgmode.org/)

### ediff-mode

官方文档：[Ediff User's Manual](http://www.chemie.fu-berlin.de/chemnet/use/info/ediff/ediff.html )

---

## 常用的插件

### Magit

官方介绍：[Magit! A Git Porcelain inside Emacs](http://magit.vc/)
快捷键：[Magit Cheatsheet](http://daemianmack.com/magit-cheatsheet.html)

### TODO

待续……
