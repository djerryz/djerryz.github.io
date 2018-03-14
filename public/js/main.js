function touchm (event){  
            var event = event || window.event;    
            event.preventDefault(); //阻止touchmove的默认动作
} 
function touche (event){  
            var event = event || window.event;    
            event.preventDefault(); //阻止touchend的默认动作
			zhanyin();
     } 
function zhanyin(){
	var labelm=document.getElementById('sidebar-checkbox');
	if(labelm.checked==true){
	$('body').toggleClass('down2');
	labelm.checked=false;
	document.getElementById('divOne').style.display="none";
	//document.getElementById('sidebar-toggle').innerHTML = '展开';//通过id获取label,修改值为2
	//document.body.style.overflowY="scroll";
	//document.getElementsByClassName('wrapall')[0].style.position = "relative";
	}else{
	labelm.checked=true;//这儿相当于实现了for功能
	if (!$('.footer').hasClass('down')){
		$('.footer').addClass('down');
	}else{
		$('body').toggleClass('down2');
	}
	document.getElementById('divOne').style.display="block";
	//document.getElementById('sidebar-toggle').innerHTML = '隐藏';//通过id获取label,修改值为2
	//document.body.style.overflowY="hidden";//隐藏且禁用
	//document.getElementsByClassName('wrapall')[0].style.position = "fixed";
	}
}
function preview(){
		var labelp=document.getElementById('button-lock');
		if(view==0){
			labelp.checked=false;
			view=1;
		}else{
			labelp.checked=true;
			view=0;
		}
};
$(document).ready(function () {
	var a;
	var b = 0;
	var checkonnews = {
		"opacity": "1",
		"transform": "translate3d(0, 0.32rem, 0)",
		"box-shadow": "0 0 0 1px rgba(0, 0, 0, 0.15)",
		"z-index": "40",
		"display": "block"
	};
	var checkoutnews = {
		"opacity": "0",
		"transform": "translate3d(0, -0.32rem, 0)",
		"box-shadow": "none",
		"z-index": "-5"
	};
	var checkonhas = {
		"opacity": "1"
	};
	var checkouthas = {
		"opacity": "0.2"
	};
	$(".has-ajax,.news").mouseover(function () {
		if ($(".news").css("opacity") == 0 || b==0) {
			$(".news").css(checkonnews);
			$(".has-ajax").css(checkonhas);
			b = 1;
		} else {
			clearTimeout(a);
		}
	});
	$(".has-ajax,.news").mouseout(function () {
		a = setTimeout(function () {
				$(".news").css(checkoutnews);
				$(".has-ajax").css(checkouthas);
				b = 0;//使得在变透明过程中能再次显示
			}, 340);
	});
	$(".close").click(function () {
		$(".news").css(checkoutnews);
		$(".has-ajax").css(checkouthas);//这儿不用b=0，因为点击X后，一定完全透明关闭，中间不能打断
	});
	/*$("#lock").click(function(){
	$(".wrapall").animate({filter: "blur(18px)",marginTop:"20"},6000);
	});*/
	var music_move_1={
		"opacity": "1"
	};
	var music_move_2={
		"opacity": "0.4"
	};
	$(".side_player").mouseover(function () {
			$(".side_player").css(music_move_1);
	});
	$(".side_player").mouseout(function () {
			$(".side_player").css(music_move_2);
	});
});