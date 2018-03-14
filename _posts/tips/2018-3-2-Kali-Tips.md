---
layout: post
title: Kali使用技巧
readtime: 10
tags: [Kali, Linux,Troubleshooting]
excerpt: 摘要:Kali下，对报错的处理，安装常用工具,和参数使用技巧的归纳
image:
  feature: *image
  original: /images/post/page/Kali-Tips.jpg
  cover-1: /images/post/cover-1/Kali-Tips
  cover-2: /images/post/cover-2/Kali-Tips-bg.jpg
  thumbnail-1: /images/post/thumbnail-1/Kali-Tips.jpg
  thumbnail-2: /images/post/thumbnail-2/Kali-Tips-bg.jpg
  caption: "[Photo by **Instagram**](https://www.instagram.com/p/BgSuV5Vgpd1/)"
last_modified_at: 2018-03-14
note_title: "实习工资好低~"
note_content: "天气：晴天"
note_time: "3月 14号 2018年"
---
## 1.在vncserver下,无法启动WireShark
> 在vncserver终端下启动wireshark，出现:  
> ![](/images/post/posts/tips/2018-3-2-Kali-Tips/1.png)

### 解决方法

```
终端下：
apt install wireshark-gtk
wireshark-gtk
```

若还是不行，则：
1. 配置wireshark：
dpkg-reconfigure wireshark-common
2. 添加root到wireshark组：
gpasswd -a $USER wireshark

## 2. 安装pip3
> 记住就完事了嗷，铁子~

```
apt install python3-pip
```

## 3. pip安装依赖时，爆出timeout错误
> 爆出timeout错误

使用参数：--default-timeout
```
pip install xx --default-timeout=30000
```