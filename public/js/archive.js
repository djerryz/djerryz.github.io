$(window).on("load",function(){
var i=1;
a=".jj-"+i;
if ($(a)!=null){
	loadpic(($(a+' p')).html().split(',')[0],$(a+' p').html().split(',')[1],a);
	i++;
	a=".jj-"+i;
}
$(window).on('scroll', function () {
	if($(a).length>0){//判断终点
		if($(a).offset().top <= $(window).scrollTop() + $(window).height() * 0.8){
			k1=$(a+' p').html().split(',')[0];
			k2=$(a+' p').html().split(',')[1];
			if(k1!=""&&k2!=""){
				loadpic(k1,k2,a);
			}
			i++;
			a=".jj-"+i;
		}
	}
});
function loadpic(pic1,pic2,wh){
	cover1 = new Image();
	cover2 = new Image();
	cover1.src = pic1;//"/images/post/cover-1/the-first-page.jpg";//https://mademistakes.com/assets/images/about-michael-collage-2016.jpg
	cover2.src = pic2;//"/images/post/cover-1/the-first-page.jpg";//https://mademistakes.com/assets/images/about-michael-collage-2016.jpg
	/*错误写法:
	coverX.onload = function() {coverY.onload = function()},因为若是coverY先加载即用掉了onload，coverX再用onload就等不到，不会执行*/
	cover2.onload = function() {
		$("#j"+wh.split('.')[1]).remove();
		j=".jj-"+wh.split('-')[1]+":before{ background-image: url('"+cover2.src+"');}\n";
		$('#jjj').append(j);
		if(cover1.complete){
			cw(wh,cover1.src);
		}else{
			cover1.onload = function() {
				cw(wh,cover1.src);
			};
		}
	}
}
function cw(wh,src){
	$(wh+" img").attr('src',src);
	$(wh+" img").removeClass('not-clear-1').addClass('is-clear-1');
	setTimeout(function () {
		$(wh).removeClass('not-clear-2').addClass('is-clear-2');
	}, 200);
}
});