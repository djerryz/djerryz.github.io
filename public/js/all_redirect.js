//https://www.cnblogs.com/wangdahai/p/6221399.html
//https://stackoverflow.com/questions/12598232/running-jquery-code-before-the-dom-is-ready
//https://www.jianshu.com/p/b9f016e9ee47
function GetUrlRelativePath()
{
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("//");
　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
　　　　if(relUrl.indexOf("?") != -1){
　　　　　　relUrl = relUrl.split("?")[0];
　　　　}
　　　　return relUrl;
}
var a=document.getElementsByTagName('body');
if (a[0]==null){
	window.location.href=('http://'+window.location.host+"/?"+GetUrlRelativePath());//不要用'../?',因为这个是代表上级目录
}//不加协议会变成127.0.0.1:4000/home/127.0.0.1:4000/?/home
