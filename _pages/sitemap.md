---
layout: null
permalink: /sitemap/
title: "Sitemap"
excerpt: djerry网站下所有文章的索引
---

本站点上所有部分和页面的分层结构。jekyll-sitemap自动在根目录生成XML文件，使搜索引擎的robots能更轻松获知更新情况。
百度要实名，算了。就用Google。
<h2>Pages</h2>
<ul>
  <li><a href="/about/">博客</a></li>
  <li><a href="/contact/">HACK</a></li>
  <li><a href="/faqs/">音乐</a></li>
  <li><a href="/support/">Secret</a></li>
  <li><a href="/tag/">Rss</a></li>
</ul>
<h2><a href="/til/">知识补充</a></h2>
<ul>
  {% for post in site.categories.post-study %}
    {% include post-list.html %}
  {% endfor %}
</ul>

<h2><a href="/mastering-paper/">大学</a></h2>
<ul>
  {% for post in site.categories.post-university %}
    {% include post-list.html %}
  {% endfor %}
</ul>
