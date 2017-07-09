---
title: Tags
layout: page
---

<div id='tag_cloud'>
  {% for tag in site.tags %}
  <a href="#{{ tag[0] }}" title="{{ tag[0] }}" rel="{{ tag[1].size }}">{{ tag[0] }} ({{ tag[1].size }})</a>
  {% endfor %}
</div>

<ul class="listing">
  {% for tag in site.tags %}
  <li class="listing-seperator" id="{{ tag[0] }}">{{ tag[0] }}</li>
  {% for post in tag[1] %}
  {% unless post.draft %}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
  {% endunless %}
  {% endfor %}
  {% endfor %}
</ul>

{% include tags.html %}