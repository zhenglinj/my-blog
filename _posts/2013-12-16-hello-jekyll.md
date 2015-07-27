---
layout: post
title: "Hello Jekyll"
description: "这是测试页面，测试显示的效果，以及一些插件、配置是否成功。内容主要介绍Jekyll在Github上建博客，用Emacs编辑Markdown写博文，和一些实用的插件。同时以下是简介及实例作为笔记备忘。"
category: "technology"
tags: [jekyll, markdown, notes]
---
{% include JB/setup %}

这是测试页面，测试显示的效果，以及一些插件、配置是否成功。内容主要介绍Jekyll在Github上建博客，用Markdown写博文，和一些实用的插件。同时以下是简介及实例作为笔记备忘。

---

## 用Jekyll在Github上建博客

经过几个星期的纠结，决定在Github上建博客。陆陆续续看了一些关于Jekyll建博客的官方文档、个人博文，算是对Jekyll有点了解，写下这篇文章以备忘。关于Jekyll建博客的英文中文文章已经很多，这里不再重复具体的建博过程，介绍一些资料。

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

---

## 第三方插件演示

写文章用到的第三方插件的使用方法，主要是代码高亮、数学公式美化的功能。

### Google Code prettify

完成代码高亮

**示例：**

<!-- ``` cpp -->
<!-- class Voila { -->
<!-- public: -->
<!-- 	// Voila -->
<!-- 	static const string VOILA = "Voila"; -->
<!-- 	// will not interfere with embedded tags. -->
<!-- } -->
<!-- ``` -->

	<pre class="prettyprint lang-cpp linenums=true">
	class Voila {
	public:
	  // Voila
	  static const string VOILA = "Voila";

      // will not interfere with embedded tags.
	}
	</pre>
	
**效果：**

<!-- ``` cpp -->
<!-- class Voila { -->
<!-- public: -->
<!-- 	// Voila -->
<!-- 	static const string VOILA = "Voila"; -->
<!-- 	// will not interfere with embedded tags. -->
<!-- } -->
<!-- ``` -->

<pre class="prettyprint lang-cpp linenums=true">
class Voila {
public:
  // Voila
  static const string VOILA = "Voila";
  
  // will not interfere with embedded tags.
}
</pre>


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

**最后**就是保持现在的这种激情写博文了！