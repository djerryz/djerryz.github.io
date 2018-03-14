---
layout: post
title: hello,Jekyll
readtime: 6
tags: [web development, GitHub, Jekyll]
excerpt: "摘要:这是我的第一篇文章，很高兴使用Jekyll。"
image:
  feature: *image
  original: /images/post/page/hello-jekyll.jpg
  cover-1: /images/post/cover-1/hello-jekyll
  cover-2: /images/post/cover-2/hello-jekyll-bg.jpg
  thumbnail-1: /images/post/thumbnail-1/hello-jekyll.jpg
  thumbnail-2: /images/post/thumbnail-2/hello-jekyll-bg.jpg
  caption: "[Photo by **Instagram**](https://instagram.com/)"
last_modified_at: 2017-08-17
note_title: "第一篇文章"
note_content: "THANKS"
note_time: "8月 16号 --"
---
{% include mind_map.html %}
&emsp;&emsp;GitPage和Jekyll的存在，使得在托管平台上搭建博客变得方便。Jekyll的生成静态网页的方式，让我感觉网站的构造就如同组装一块块零件，而且这些零件是可以复用的，这使得一个较大的网站都能轻松的搭建。git提供了底层的设计，我们只需要关心Jekyll这个服务的配置。相对于搭建一个PHP网站而言，这节省了开支，以及对硬件和系统的配置。但这为我省了非常多的时间，另一方面，我不得不花费更多的时间去了解语法和学习前端技术。

&emsp;&emsp;使用Jekyll，通常都会先去它的模板市场选择一款自己喜欢的样式。我最终选择的是Layon，这些模板大多简朴优雅，但看到了mademistakes和eduardoboucas两位大神的网站，我决定借鉴他们的经验，学着搭建自己的模板。如mindmap所示，便是整个网站的构建思路，接下来是我如何实现它们的。

## 1.Jekyll配置与使用
> &emsp;&emsp;我们开始使用Jekyll，基本上是fork或是clone别人的Jekyll作为模板。我们不可能一直使用在线环境即在GitHub上进行修改编辑。因为添加图片或是某些文件就需要push，而且我们的编辑不是可见即可得，而是要等待github那边的处理。进而搭建本地环境来测试和编辑jekyll变得十分重要

### 1-1.搭建本地环境
&emsp;&emsp;Jekyll的说明:Jekyll is a blog-aware, static site generator in Ruby。无论是Windows还是Linux系统，都需要安装ruby环境，更重要的是安装ruby的包管理工具gems。这儿很好的帮助识别关于ruby的一些名词概念：https://www.jianshu.com/p/4587f91c7dbe
安装完成后，命令：gem install jekyll，即可完成安装。当然如果你的Jekyll需要安装依赖，例如插件jekyll-seo-tag，通过gem install jekyll-seo-tag。更通常的，我们可以通过文件安装依赖：gem install --local your.gem.最后，通过jekyll server启动服务，通过浏览器访问4000端口即可。

### 1-2.Jekyll配置与使用
#### 1-2-1.目录结构
```
├── _config.yml
├── _drafts
|   ├── begin-with-the-crazy-ideas.textile
|   └── on-simplicity-in-technology.markdown
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts
|   ├── default.html
|   └── post.html
├── _posts
|   ├── 2007-10-29-why-every-programmer-should-play-nethack.textile
|   └── 2009-04-26-barcamp-boston-4-roundup.textile
├── _site
├── .jekyll-metadata
└── index.html
```
#### 1-2-2.config.yml配置
* 代码高亮  
[https://jekyllrb.com/news/2015/10/26/jekyll-3-0-released/](https://jekyllrb.com/news/2015/10/26/jekyll-3-0-released/)写到***Default highlighter is now Rouge instead of Pygments。***  
Jekyll3.0之后的版本，在_config.yml中添加“highlighter:rouge”,即可实现代码高亮。

例如高亮pyhton代码:  

	```python  
	def function():  
	    print('Yes')  
	``` 

#### 1-2-3.插件及语法
* 分页


### 2.PJAX使用
> 使用https://github.com/defunkt/jquery-pjax提供的JS插件

#### 2-1.安装（pjax依赖1.8以上的jQuery.）

	npm方式  
	$ npm install jquery-pjax  
	独立的脚本：  
	curl -LO https://raw.github.com/defunkt/jquery-pjax/master/jquery.pjax.js
  
#### 2-2.使用
以index作为主模板，包含了sidebar和音乐播放器。PJAX获取到资源载入到id="replace_here"的div下。  
1. 要搭建好index模板，以及通用的css,js文件
2. 访问index默认加载home.html，因为访问网站默认访问的是index.html
3. 当第一个访问的不是index.html时，在html下判断是否加载了index.html，没有则要先加载index.html再去加载相应资源
4. 在使用浏览器前进后退功能时，由于PJAX配置默认使用pushState方式。比如。访问djerry.xyz/hh.html,这时浏览器地址是hh.html和hh.html，第一个hh.html是在PJAX执行之前的，另一个是之后的，我们只想要之后的。则在第一次访问网站时，我们要$.pjax.defaults.replace = true，使用替换history的方式。这样只保留了在加载index.html后的记录


### 3.staticman使用
#### 3-1.staticman.yml配置
```yml
comments:
  # (*) REQUIRED
  #
  # Names of the fields the form is allowed to submit. If a field that is
  # not here is part of the request, an error will be thrown.
  allowedFields: ["name", "emails", "url", "message","replying_to"]

  # When allowedOrigins is defined, only requests sent from one of the domains
  # listed will be accepted.
  allowedOrigins: ["localhost", "djerry.xyz"]

  # (*) REQUIRED
  #
  # Name of the branch being used. Must match the one sent in the URL of the
  # request.
  branch: "master"

  # List of fields to be populated automatically by Staticman and included in
  # the data file. Keys are the name of the field. The value can be an object
  # with a `type` property, which configures the generated field, or any value
  # to be used directly (e.g. a string, number or array)
  generatedFields:
    date:
      type: date
      options:
        format: "iso8601"

  # The format of the generated data files. Accepted values are "json", "yaml"
  # or "frontmatter"
  format: "yaml"

  # Whether entries need to be appproved before they are published to the main
  # branch. If set to `true`, a pull request will be created for your approval.
  # Otherwise, entries will be published to the main branch automatically.
  moderation: false

  # Name of the site. Used in notification emails.
  #按照mistake的说法，这儿是被要求用mailgun，但是mailgun会被QQmail屏蔽，于是不使用其提供的方法，而是自己发送mail
  name: "Djerry"
  notifications:
    enabled: false
  
  # (*) REQUIRED
  #
  # Destination path (directory) for the data files. Accepts placeholders.
  path: "_data/comments/{options.slug}"

  # (*) REQUIRED
  #
  # Destination path (filename) for the data files. Accepts placeholders.
  filename: "comment-{@timestamp}"

  # Names of required files. If any of these isn't in the request or is empty,
  # an error will be thrown.
  requiredFields: ["name","message"]
```

### 4.mindmap的实现
存在缺陷，以后，需要修正
https://github.com/mindmup/mapjs
### 5.兼容的实现
CSS对不同尺寸屏幕和不同浏览器的兼容
### 6.图片处理与邮件发送
本地python处理图片
git拉取评论数据下的邮箱地址，判断是否勾选在文章更新后通知
### 7.git语法

### 8.公网访问
* godaddy下配置nameserver到cloudflare。cloudflare下配置DNS等，不带www（即Naked Domain）便可访问。通过配置CNAME是无法实现的，ht<span>tps://support.cloudflare.com/hc/en-us/articles/200169886-Can-I-use-a-naked-domain-no-www-with-Cloudflare-。通过在Page Ruler下添加一个djerryz.xyz重定向到https:/<span>/www.djerryz.xyz。方法来自（https:/<span>/au.godaddy.com/community/Managing-Domains/Setting-up-domain-without-the-WWW-naked-domain-help-needed/td-p/50047）
* 优化CDN https://www.jianshu.com/p/31813bb90729

### 9.问题总结
* 图片不滚动
background-attachment:fixed;兼容有问题，且Edge下抖动。
改用jquery实现。
* 在网页加载前的动画：
* http://blog.csdn.net/u010865136/article/details/61914749
http://blog.csdn.net/xiaokui_wingfly/article/details/51502209

### 10.总结博客优点，及学习了什么只是

在Github上搭建网站，
我真的:heart:Jekyll，它帮助我快速地搭建了静态博客。在这儿，我可以如同日记一般，记录发生的事情；可以培养自己的写作，英语以及阅读的习惯，把空余的时间利用起来。
博客可以帮助我总结之前学习的知识。将知识经验归纳总结。像日记一样，记录重要的事情。更重要的是，锻炼写作和英语能力，培养阅读习惯，将空闲的时间更多的投入到这个博客的构建中。
许多时候，我会忘记很多曾经熟记的
记录一点想说的，想写的。许多命令语法，经常会遗忘
