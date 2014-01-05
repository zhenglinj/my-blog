---
layout: post
title: "Hello Jekyll"
description: "这是测试页面，测试显示的效果，以及一些插件、配置是否成功。内容主要介绍Jekyll在Github上建博客，用Emacs编辑Markdown写博文，和一些实用的插件。同时以下是简介及实例作为笔记备忘。"
category: "technology"
tags: [jekyll, markdown, emacs, notes]
---
{% include JB/setup %}

这是测试页面，测试显示的效果，以及一些插件、配置是否成功。内容主要介绍Jekyll在Github上建博客，用Emacs编辑Markdown写博文，和一些实用的插件。同时以下是简介及实例作为笔记备忘。

---

## 用Jekyll在Github上建博客

曾经在cnblog建过博客，但是由于毅力不佳，写过寥寥几篇就半途而废。现在经过几个星期的纠结，决定在Github上建博客。陆陆续续看了一些关于Jekyll建博客的官方文档、个人博文，算是对Jekyll有点了解，写下这篇文章以备忘。关于Jekyll建博客的英文中文文章已经很多，这里不再重复具体的建博过程，介绍一些资料。

**官方文档：**

总体介绍： [Jekyll • Simple, blog-aware, static sites](http://jekyllrb.com/)  
快速入门文档： [Jekyll Quick Start](http://jekyllbootstrap.com/usage/jekyll-quick-start.html)  
详细用法的文档： [Jekyll Bootstrap](http://jekyllbootstrap.com)  

**中文教程**

主要是一些博文：
[基于jekyll的github建站指南](http://jiyeqian.github.io/2012/07/host-your-pages-at-github-using-jekyll/#outline_0 )  
[使用Github Pages建独立博客](http://beiyuu.com/github-pages/ )  
[在Octopress中使用LaTeX](http://yanping.me/cn/blog/2012/03/10/octopress-with-latex/ )  

以上只是几个例子，更多见Baidu, Google.  

## Markdown语法说明

现在用Markdown写博文很流行也确实很方便，很多网站的评论也开始支持Markdown语言。这种轻度标记语言挺简单，并且可以很轻松写出一些排版清楚的文字。同时Jekyll建博客后也是用这种语言发文章的，所以还是值得一学。  
Markdown语法说明：[Markdown语法说明](http://wowubuntu.com/markdown/ )   

## Emacs的配置

神之编辑器Emacs写Markdown当然不在话下，做一些合适的配置会可以更轻松地用Markdown写文章。先是配置好markdown-mode，只要在网上下载`markdown-mode.el`并添加到配置文件即可。

### Ubuntu下Emacs中文输入法

Linux(Ubuntu)下一直没有较好的中文输入法，相对来说 `ibus-pinyin` 和 `ibus-googlepinyin` 算是比较好的。  
Ubuntu下可以用两条指令装输入法 `sudo apt-get install ibus-googlepinyin` `sudo apt-get install ibus-pinyin`  
但是在Emacs里有些键盘会有冲突，可以通过装 `ibus.el` 来解决  
1. Emacs24自带有中文输入法(`Ctrl - \`切换)不是很好用（不推荐）  
2. 换ibus的GooglePinyin／Pinyin同时添加ibus.el ibus-el等插件可以解决中文输入法的问题（推荐）  

### 中文输入法时切换到半角符号有点麻烦

目前想到方法，是在Emacs的YASnippet配置文件增加一些配置。

- 找到类似snippet的文件夹，在其子目录找到markdown文件夹，仿照里面已经有的配置增加一些自己想要的配置（[dotemacs](https://github.com/zhenglinj/dotemacs )是我托管在github上的配置）在 .emacs.d/dotemacs/snippet/text-mode/markdown-mode/下加一些文件。  

---

## 第三方插件演示

写文章用到的第三方插件的使用方法，主要是代码高亮、数学公式美化的功能。

### Google Code prettify

完成代码高亮

**示例：**

	<pre class="prettyprint lang-cpp linenums=true">
	class Voila {
	public:
	  // Voila
	  static const string VOILA = "Voila";

	  // will not interfere with embedded tags.
	}
	</pre>
	
**效果：**

<pre class="prettyprint lang-cpp linenums=true">
class Voila {
public:
  // Voila
  static const string VOILA = "Voila";
  
  // will not interfere with embedded tags.
}
</pre>

Emacs通过写YASnippet配置文件可以完成代码框架，Markdown模式下输入pretty，再TAB即可出现代码框架。

### MathJax

数学公式的插件，使网页支持$$L^AT_EX$$

**示例：**

	$$(a_1,b_1,a_2,b_2,\cdots,an,bn)$$
	
	$$(O(1))$$
	$$(a1,a2,\cdots,a_n,b_1,\cdots,b_n)$$
	$$a^2 + b^2 = c^2$$
	
**效果：**

$$(a_1,b_1,a_2,b_2,\cdots,an,bn)$$

$$(O(1))$$
$$(a1,a2,\cdots,a_n,b_1,\cdots,b_n)$$
$$a^2 + b^2 = c^2$$

数学公式 $$(a1,a2,\cdots,a_n,b_1,\cdots,b_n)$$ 和文字

 <!-- \(a_1,b_1,a_2,b_2,\cdots,an,bn\) -->
 <!-- \(O(1)\) -->
 <!-- \(a1,a2,\cdots,a_n,b_1,\cdots,b_n\) -->
 <!-- \[a^2 + b^2 = c^2\] -->

<!-- 数学公式 \(a1,a2,\cdots,a_n,b_1,\cdots,b_n\) 和文字 -->

## Makefile自动完成

这里开始有点Blogging like a hacker的感觉！通过写makefile实现快速预览／自动推入GitHub仓库。  
写博文步骤（以下所说的执行是在终端中执行命令）：  
1. 创建文件，执行 `rake post title="post name"` `rake post title="post-name.md"`  
2. 写文章，打开编辑器开始用markdown写文章  
3. 预览，在根目录下执行 `jekyll server`  
4. 发表，在根目录下执行 `make commit` 或 `make amend` 和 `make push`  
   - `make commit` 完成提交本地管理库，主要 `git commit -a -m "post blog"`；`make amend` 完成提交本地管理库但是不添加新的提交  
   - `make push` 推入到GitHub仓库  

**最后**就是保持现在的这种激情写博文了！