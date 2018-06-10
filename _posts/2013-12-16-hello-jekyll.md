---
layout: post
title: "Hello Jekyll"
excerpt: "这是测试页面，测试显示的效果，以及一些插件、配置是否成功。内容主要介绍Jekyll在Github上建博客，用Markdown写博文，和一些实用的插件。同时以下是简介及实例作为笔记备忘。"
category: "technology"
draft: false
analytics: true
comments: true
tags: [jekyll, markdown, notes]
---
{% include JB/setup %}

这是测试页面，测试显示的效果，以及一些插件、配置是否成功。内容主要介绍Jekyll在Github上建博客，用Markdown写博文，和一些实用的插件。同时以下是简介及实例作为笔记备忘。

---

## 用Jekyll在Github上建博客

经过几个星期的纠结，决定在Github上建博客。陆陆续续看了一些关于Jekyll建博客的官方文档、个人博文，算是对Jekyll有点了解，写下这篇文章以备忘。关于Jekyll建博客的英文中文文章已经很多，这里不再重复具体的建博过程，介绍一些资料。

**官方文档：**

总体介绍： 英文 [Jekyll • Simple, blog-aware, static sites](http://jekyllrb.com/)  中文 [Jekyll 简单静态博客网站生成器](http://jekyllcn.com/)  
快速入门文档： [Jekyll Quick Start](http://jekyllbootstrap.com/usage/jekyll-quick-start.html)  
详细用法的文档： [Jekyll Bootstrap](http://jekyllbootstrap.com)  

**例子**

本博客主题：[jekyll-theme-basically-basic](https://mmistakes.github.io/jekyll-theme-basically-basic/)

以上只是几个例子，更多见Baidu, Google.  

---

## Markdown 语法简介

现在用Markdown写博文很流行也确实很方便，很多网站的评论也开始支持Markdown语言。这种轻度标记语言挺简单，并且可以很轻松写出一些排版清楚的文字。同时Jekyll建博客后也是用这种语言发文章的，所以还是值得一学。  
[Markdown 语法简介](http://wowubuntu.com/markdown/ )  
[讲解 Markdown](http://alfred-sun.github.io/blog/2015/01/10/markdown-syntax-documentation/)  

### 语法文档

![markdownsheet](/posts/images/markdownsheet.png ){: .align-center}

### 列表

无序号列表：

* kram
+ down
- now

嵌套的列表：

Create nested lists by indenting list items by two spaces.

1. Item 1
  1. A corollary to the above item.
  2. Yet another point to consider.
2. Item 2
  -  A corollary that does not need to be ordered.
  -  This is indented four spaces, because it's two spaces further than the item above.
  -  You might want to consider making a new list.
3. Item 3

### 引用

Markdown 标记区块引用是使用类似 email 中用 `>` 的引用方式：

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

### 表格

建表格使用连字符 `` - `` 和竖线 `` | `` ，区分开表头和单元格：

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

想好看一些的话，也可以在开头和结尾加竖线：

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

顶部的连字符无需一定匹配表头文本的长度（但必须保证至少3个连字符）；也可以添加行内的Markdown语法文本，如链接、加粗、删除线等：

| Name          | Description                  |
| ------------- | ---------------------------- |
| Help          | ~~Display the~~ help window. |
| Close         | _Closes_ a window            |

表头行使用冒号:实现表格内列的文本对齐方式：

| Left-Aligned  | Center Aligned    | Right Aligned |
| :------------ | :---------------: | ------------: |
| col 3 is      | some wordy text   | $1600         |
| col 2 is      | centered          | $12           |
| zebra stripes | are neat          | $1            |
| col 3 is      | some wordy text   | $1600         |
| col 2 is      | centered          | $12           |
| zebra stripes | are neat          | $1            |

冒号在最左边表示该列文本左对齐，最右边表示文本右对齐，两边都加冒号表示居中对齐文本。

---

## Kramdown 语法简介  {#intro-kramdown}

Jekyll 可以采用不同的 Markdown 解释器，如：Maruku, Redcarpet和Kramdown等。其中kramdown是最接近pandoc功能的解释器。[kramdown 语法简介](http://yufree.cn/blogcn/2014/10/25/kramdown.html)，这里介绍kramdown特有的一些功能。

### 表格扩展

````markdown
|-----------------|------------|-----------------|----------------|
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            |
|-----------------|------------|-----------------|----------------|
| Second body     |            |                 |                |
| 2 line          |            |                 |                |
| Second body     |            |                 |                |
|=================+============+=================+================|
| Footer row      |            |                 |                |
|-----------------|------------|-----------------|----------------|
````

|-----------------|------------|-----------------|----------------|
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            |
|-----------------|------------|-----------------|----------------|
| Second body     |            |                 |                |
| 2 line          |            |                 |                |
| Second body     |            |                 |                |
|=================+============+=================+================|
| Footer row      |            |                 |                |
|-----------------|------------|-----------------|----------------|

### 脚注

扩展功能，其实就是加了上标的链接。

That\'s some text with a footnote.[^1]

[^1]: And that\'s the footnote.

That\'s the second paragraph.

### Header ID

扩展功能，使用ID为你的标题提供页面内引用地址，可以像超链接一样跳转。

```markdown
## Kramdown 语法简介  {#intro-kramdown}

[Goto introduce kramdown](#intro-kramdown)
```

[Goto introduce kramdown](#intro-kramdown)

---

## 插件演示

写文章/代码用到的第三方插件的使用方法，主要是代码高亮、数学公式美化的功能。

### CSS额外定义

**按钮的效果：**

**示例：**

`<kbd>M-x package-list-packages</kbd> , then <kbd>U</kbd> followed by <kbd>x</kbd>.`

**效果：**

<kbd>M-x package-list-packages</kbd> , then <kbd>U</kbd> followed by <kbd>x</kbd>.

### 代码高亮 Highlightjs

使用 [highlightjs](https://highlightjs.org/ ) 代码高亮。在 Jekyll 根目录**`_config.yml`做相应配置** 如果采用kramdown解析markdown，那么修改如下：

```yml
markdown: kramdown  # [ maruku | rdiscount | kramdown | redcarpet ]
kramdown:
  input:          GFM
  auto_ids:       true
  auto_id_prefix: 'id-'
```

同时，在 Jekyll 根目录**`_layouts/default.html`文件中添加`highlight.js`**，如下代码：

```html
<!-- highlight -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/monokai_sublime.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
<script type="text/javascript"> hljs.initHighlightingOnLoad(); </script>
```

类似markdown的语法将代码块包括在两个 ```` ``` ```` 中，就可以实现代码高亮

**示例：**

````markdown
```cpp
class Voila {
public:
    // Voila
    static const string VOILA = "Voila";
    // will not interfere with embedded tags.
}
```
````

**效果：**

```cpp
class Voila {
public:
    // Voila
    static const string VOILA = "Voila";
    // will not interfere with embedded tags.
}
```

[代码]({{ site.postsurl }}/code/hello-jekyll_demo.cpp )

### LATEX显示数学公式 MathJax

使用[MathJax](https://www.mathjax.org/ ) 漂亮地显示数学公式，使网页支持$$L^AT_EX$$。**`_layouts/default.html`中添加`MathJax.js`**，如下代码：

```html
<!-- MathJax for LaTeX -->
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
  TeX: { equationNumbers: { autoNumber: "AMS" } }
  });
</script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
  tex2jax: {
  inlineMath: [ ['$','$'], ['$$$','$$$'], ["\\(","\\)"] ],
  processEscapes: true
  }
  });
</script>
```

**示例：**

```markdown
$$(a_1,b_1,a_2,b_2,\cdots,an,bn)$$

$$(O(1))$$
$$(a1,a2,\cdots,a_n,b_1,\cdots,b_n)$$
$$a^2 + b^2 = c^2$$
$$\frac{fenzi}{fenmu}$$
数学公式 $$(a1,a2,\cdots,a_n,b_1,\cdots,b_n)$$ 和文字
```

**效果：**

$$(a_1,b_1,a_2,b_2,\cdots,an,bn)$$

$$(O(1))$$
$$(a1,a2,\cdots,a_n,b_1,\cdots,b_n)$$
$$a^2 + b^2 = c^2$$
$$\frac{f(x)}{g(x)}$$

数学公式 $$(a1,a2,\cdots,a_n,b_1,\cdots,b_n)$$ 和文字

<!-- ### Mermaid flowchart 流程图 -->

<!-- 文档： [mermaid docs](http://knsv.github.io/mermaid/index.html#mermaid) -->

<!-- <div class="mermaid"> -->
<!-- graph TD; -->
<!--     A-\->B; -->
<!--     A-\->C; -->
<!--     B-\->D; -->
<!--     C-\->D; -->
<!-- </div> -->

<!-- <div class="mermaid"> -->
<!-- sequenceDiagram -->
<!--     participant Alice -->
<!--     participant Bob -->
<!--     Alice->John: Hello John, how are you? -->
<!--     loop Healthcheck -->
<!--         John->John: Fight against hypochondria -->
<!--     end -->
<!--     Note right of John: Rational thoughts <br/>prevail... -->
<!--     John-\->Alice: Great! -->
<!--     John->Bob: How about you? -->
<!--     Bob-\->John: Jolly good! -->
<!-- </div> -->

**最后**就是保持现在的这种激情写博文了！
