// 音乐播放插件 
// 只包括播放暂停，下一曲  以及显示歌曲名称 歌手以及 实时进度
// github： https://github.com/IFmiss/music
//一个奇怪的问题：当source为：http://jq22.qiniudn.com/2_01.mp3时，chrome下加载一次，而firefox加载了两次，这导致产生了两次canplay事件，对应的duration也不同。
//若是不用：$.ajax({cache: false});，draution会出现问题。
//feed:http://www.feedrapp.info/(https://github.com/sdepold/jquery-rss 本质上是调用前面那个网址解析)
//最后采用：https://rss2json.com/docs
//iframe是无法跨域获取资源的
$(window).on("load",function(){
		/*var lastdate="2017-12-30_71"; //名字没有规律
		var count=Math.abs(parseInt((Date.parse(new Date())- Date.parse(lastdate.split('_')[0]))/1000/3600/24));
		var a=Math.floor(count/30);
		var b=count%30;
		var c=eval(lastdate.split('_')[1]);
		//if(24<=b || (b<=6 && a!=0)){
		if(24<=b){
			c=c+1;
		}
		c=c+a;//这儿应该是最新的，但是歌曲每1个月更新，但不像hardwell on air一样每个星期6更新，这样有规律，只是大概一个月左右。66-7.29，67-8.26，68-9.29，69-10.28，70-12.1，71-12.30--》+28 +62 +91 +124 +153-->加24-36>>>24<?-30*x<36-->超过24都加1，36也是加1，54是+2  
		console.log('http://podcast.hardwithstyle.nl/HWS'+c+'_Presented_by_Headhunterz.mp3',count);*/
		MC.music({
			hasAjax:true,
			right:'1rem',
			bottom:'1rem',
			musicChanged:function(ret){
				// alert(ret.url);
				// getMusic_buffer(ret.url);
				// return;
				var data = ret.data;
				var index = ret.index;
				var imageUrl = data[index].img_url;
				var music_bg = document.getElementById('music-bg');
				music_bg.style.background = 'url('+imageUrl+')no-repeat';
				music_bg.style.backgroundSize = 'cover';
				music_bg.style.backgroundPosition = 'center 30%';
			},
			getMusicInfo:function(data){			
			},
			musicPlayByWebAudio:function(ret){
			},
		});//API通过Google搜索https://api.rss2json.com/v1/api.json?api_key 偷来的~
});
$.ajax({cache: false});
(function($,window){
    var DW = {};
    //音乐播放器插件
    DW.music = function(options) {
        var musicValue = {
            width:                  260,                        //宽度
            height:                 60,                         //高度
            hasBlur:                true,                       //是否显示模糊效果
            blur:                   4,                          //模糊的数值
            left:                   'auto',                     //音乐的位置 :left
            right:                  'auto',                     //音乐的位置 :right
            bottom:                 'auto',                     //音乐的位置 :bottom
            top:                    'auto',                     //音乐的位置 :top
            btnBackground:          'rgba(0,0,0,0.2)',          //按钮背景色
            iconColor:              'rgba(250,250,250.0.2)',    //图标背景色
            hasSelect:              false,                       //是否可选择音乐类型
            hasAjax:                true,                       //是否是ajax请求数据
            selectClassName:        'select-type',              //选择类型按钮的className名称
            musicType:              ['纯音乐','华语','欧美','霉霉','电音','韩国','爱乐之城','网络歌曲'],         //音乐的类型  （需要随机显示）这是结合我自己后台数据库使用的 如果不是用ajax请求是不会显示这个类型的;
            source:                 [ //这儿是靠存储，但是播放的hardwithstyle具有规律，不用这儿的方法.最后发现名字是没有规律的！！改用feed方法。
                                   /*     {
                                            name:'We Dont Talk Anymore',
                                            singer:'Charlie Puth',
                                            url:'http://jq22.qiniudn.com/2_01.mp3',
                                            img_url:'/images/hard_with_style.jpg',
                                        },{
                                            name:'Fade',
                                            singer:'Alan Walker',
                                            url:'http://jq22.qiniudn.com/m_0.mp3',
                                            img_url:'http://www.daiwei.org/index/music/musicImg/Faded.jpg',
                                        }*/
                                    ],

            //进度信息
            durationBg:             'rgba(255,255,255,0)',

            // 线性渐变的颜色
            progressBg:             [{
                                        position:0,         //0 是起点, 1为终点   范围为  0 - 1 之间
                                        color:'#FB3232',    //起点的颜色   
                                    },{
                                        position:1,
                                        color:'#FC8F3F',
                                    }],
            //滚动列表正在播放的背景色  //配合长按事件使用
            // scrollActiveBg:         'rgba(224, 189, 134, 0.298039)',

            beforeMusicPlay:function(){},                               //音乐加载之前   可以播放之前
            afterMusicLoading:function(){},                             //音乐加载成功  可播之后
            musicChanged:function(){},                                  //音乐切换之后，类似切歌
            getMusicInfo:function(){},                                  //获取所有音乐信息
        }

        var _this = this;
        var opt = $.extend(musicValue,options || {});
        var music_duration = 0;
        var musicLenth = 0;
        var musicData = '';

        //音乐dom初始化
        musicValue._init = function(){
            _this.cpt_music = $('<div class="cpt-dw-music music-div active"></div>').css({
                    width:opt.width,
                    height:opt.height,
                    bottom:opt.bottom,
                    left:opt.left,
                    right:opt.right,
                    top:opt.top,
					display:'none'
                }).appendTo($('body'));
			_this.progress_bar=$('<div class="audioplayer-bar no_mousedown"><div class="audioplayer-bar-loaded" style="width: 100%;"></div><div class="audioplayer-bar-played"></div></div>').appendTo(_this.cpt_music);
            _this.music_play = $('<div class="music-play-div"></div>').appendTo(_this.cpt_music);

            /*if(opt.hasSelect && opt.hasAjax){
                //选择音乐类型
                _this.music_typeSelect = $('<div class="music-typeSelect"></div>').appendTo(_this.cpt_music);
                _this.music_all = $('<div class="music-all music-typeSelect" data-type="">全部</div>').appendTo(_this.music_typeSelect);
                _this.music_typeList = $('<div class="music-random-typeSelect music-typeSelect" data-type="纯音乐">纯音乐</div><div class="music-random-typeSelect music-typeSelect" data-type="华语">华语</div>').appendTo(_this.music_typeSelect);
                _this.music_refresh = $('<div class="music-refresh">刷新</div>').appendTo(_this.music_typeSelect);
            }*/

            if(opt.hasBlur){
                _this.music_blur = $('<div class="filterBg"></div>').css({
                    '-webkit-filter': 'blur('+opt.blur+'px)',
                    '-moz-filter': 'blur('+opt.blur+'px)',
                    '-ms-filter': 'blur('+opt.blur+'px)',
                    'filter': 'progid:DXImageTransform.Microsoft.Blur(PixelRadius='+opt.blur+', MakeShadow=false)', /* IE6~IE9 */
                }).appendTo(_this.cpt_music);
            }
            _this.music_status = $('<div class="pauseplay no_mousedown"><svg><use xlink:href="/images/icons/music_char.svg#icon-play3"></use></svg></div>').appendTo(_this.music_play);
			_this.music_prenext = $('<div class="prenext next no_mousedown"><svg><use xlink:href="/images/icons/music_char.svg#icon-previous2"></use></svg></div>').appendTo(_this.music_play);
            _this.music_next = $('<div class="next no_mousedown"><svg><use xlink:href="/images/icons/music_char.svg#icon-next2"></use></svg></div>').appendTo(_this.music_play);
			_this.music_list = $('<div class="music_list next no_mousedown"><svg><use xlink:href="/images/icons/music_char.svg#icon-indent-increase"></use></svg></div>').appendTo(_this.music_play);
			_this.music_load_fail = $('<div class="load_fail"></div>').appendTo(_this.music_play);
            //_this.music_info = $('<div class="music-info"></div>').appendTo(_this.music_play);
            _this.music_name = $('<p class="music-name">未曾遗忘的青春</p>').appendTo(_this.music_info);
            _this.music_singer = $('<p class="music-singer">music plugin</p>').appendTo(_this.music_info);
            _this.music_logo = $('<div class="music-div-logo"></div>').appendTo(_this.cpt_music);
            // _this.music_shadow = $('<div class="music-logo-shadow"></div>').appendTo(_this.music_logo);
            _this.music_img = $('<img class="music-logo" src="">').appendTo(_this.music_logo);
            _this.music_progress = $('<canvas id="music_canvas" style="position:absolute;top:0;left:0;zoom:0.25"></canvas>').appendTo(_this.music_logo );
            _this.audio = $('<audio id="cpt_dw_music"></audio>').appendTo($('body'));
			
            opt.beforeMusicPlay();
            //监听选择类型事件
			musicValue._ajax();
            //musicValue._selectEvent();
            musicValue._selectByClass();
        }
        //给类型选择列表加监听事件
       /* musicValue._selectEvent = function(){
            if(opt.hasSelect && opt.hasAjax){
                musicValue._randomSelect(2);

                _this.music_typeSelect.find('.music-typeSelect').on('click',function(event){
                    var text = $(this).attr('data-type');
                    event.stopPropagation();
                    _this.music_typeSelect.remove();
                    //获取数据
                    musicValue._dataType(text);
                });

                _this.music_refresh.on('click',function(event){
                    event.stopPropagation();
                    musicValue._randomSelect(2);
                });
            }else{
                musicValue._dataType();
            }
        };
        //随机设置类型
        musicValue._randomSelect = function(index){
            var arr = opt.musicType;
            var new_arr = musicValue.getRandomElementFromArr(arr,index);
            for(var i = 0;i < index; i++){
                _this.music_typeSelect.find('.music-typeSelect').eq(i+1).text(new_arr[i]).attr('data-type',new_arr[i]);
            };
        };*/
        //音乐播放的点击事件
        musicValue._clickEvent = function(){
			$('.mCSB_container').on('click',function(event){
				musicValue._playIndex(event);
				//console.log($(event.target).data("index"));
			});
            _this.music_status.off().on('click',function(event){
                event.stopPropagation();
                musicValue._playPause();
            });
            _this.music_next.off().on('click',function(event){
                event.stopPropagation();
                musicValue._playNext();
            });
			_this.music_prenext.off().on('click',function(event){
                event.stopPropagation();
                musicValue._playPrev();
            });
			_this.music_list.off().on('click',function(event){
                event.stopPropagation();
                musicValue._list();
            });
			$('.no_mousedown').mousedown(function(e){
				e.stopPropagation();
			});
			_this.progress_bar.on('click',function(e){
				e.stopPropagation();//由于是被大div包含，而大div也被监听，阻止冒泡：https://www.cnblogs.com/lwwen/p/7278761.html
				var music_ele = document.getElementById('cpt_dw_music') || '';
				//console.log(((e.clientX-$(this).offset().left)*music_ele.duration/$(this).width()).toFixed(1));
				music_ele.currentTime = ((e.clientX-$(this).offset().left)*music_ele.duration/$(this).width()).toFixed(1);
            });
			_this.cpt_music.off().mousedown(function(e){
				 var t=0;
				 var offset = $(this).offset();//DIV在页面的位置  
                 var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离  
                 var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离  
                 $(document).bind("mousemove",function(ev){ //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件  
                    ev.stopPropagation();
					if (t==0){
						_this.cpt_music.css("cursor","move");
						t=1;
					}
					_this.cpt_music.stop(true,true);//加上这个之后
                    var _x = ev.pageX - x;//获得X轴方向移动的值  
                    var _y = ev.pageY - y;//获得Y轴方向移动的值  
					if ($('div').hasClass('circle')){//用右定位，这样缩小是向右的
						_this.cpt_music.animate({right:$(window).width()-58-_x+"px",top:_y+"px"},50);  
					}else{
						_this.cpt_music.animate({right:$(window).width()-260-_x+"px",top:_y+"px"},50);  
					}
                    
                });  
				$(document).bind("mouseup",function(eb){  
					if(t==0){//_this.cpt_music.off().on('click',function(e){
						_this.cpt_music.toggleClass('circle');//toggle切换类
						$('.audioplayer-bar').toggle();
					}
					_this.cpt_music.css("cursor","default");  
					$(this).unbind("mousemove");  
					$(this).unbind("mouseup");
				});  
			});       
            $(".li-music-list").off().on('click',function(){
                var _this = $(this);
                var index = _this.attr('data-index');
                musicValue._playIndex(index);
            })
        };
		//显示canvas进度
		musicValue._showLoading = function(audio) {
				var music_ele = audio || '';
				// var myAudio = document.getElementById('music_canvas');
				music_duration = music_ele.duration;
				//音频播放事件
				music_ele.ontimeupdate = function(currnt){
					currnt = music_ele.currentTime;
					$('.audioplayer-bar-played').width((currnt*100/music_duration).toFixed(2)+'%');//保留两位小数
				};
		}
        //音频处于播放状态的事件
        musicValue._onplaying = function(){
            _this.audio.on('playing',function(){
            });
            //实时显示canvas进度
            var dw_audio = document.getElementById('cpt_dw_music');
            dw_audio.addEventListener('canplay',function(){
                musicValue._showLoading(dw_audio);
				$('.load_fail').hide();
				clearInterval(window.id1);
				clearTimeout(window.id2);
                DW.removeLoading('music_waiting');
            });
        };

			
        //显示加载的loading   需引用loading插件
        musicValue._showMusicLoading = function(name){
            if($('.music-div').find('.cpt_loading_mask').length > 0){
                return;
            }
            var name = name || 'music';
            //添加加载浮层
            $('.music-div').loading({
                name:name,
                title:'',
                discription:'',
                originDivWidth:30,
                originDivHeight:30,
                flexCenter:true,
                originWidth:5,
                originHeight:5,
                loadingWidth:opt.width + 20,
                loadingHeight:opt.height,
                originBg:'rgba(34,222,44,0.5)'
            });
        };

        //播放暂停效果
        musicValue._playPause = function(){
            try{
                if(_this.audio[0].paused){
					var index=_this.audio.attr('data-index');//jquery对象有方法，而DOM只有属性～
					$('#now_play_is').text('Hard With Style    '+$('.mCSB_container a')[index].innerHTML);
					$('.pauseplay use').attr("xlink:href",'/images/icons/music_char.svg#icon-pause2');					
                    _this.audio[0].play();
                }else{
					$('.pauseplay use').attr("xlink:href",'/images/icons/music_char.svg#icon-play3');
                    _this.audio[0].pause();
                }
            } catch (e){
                console.log(e.name + ": " + e.message);
            }
        };
		//针对网络卡顿
        //监听音乐是否暂停
        musicValue._onpause = function(){
            _this.audio.on('pause',function(){
                _this.music_img.removeClass('active');
                $('.pauseplay use').attr("xlink:href",'/images/icons/music_char.svg#icon-play3');
            })
        };

        //监听音乐是否暂停
        musicValue._onplay = function(){
            _this.audio.on('play',function(){
                _this.music_img.addClass('active');
				$('.pauseplay use').attr("xlink:href",'/images/icons/music_char.svg#icon-pause2');
                
            })
        };
        //音频播放结束事件
        musicValue._onended = function(){
            _this.audio.on('ended',function(){
                if(_this.audio[0].loop){
                    _this.audio[0].load();
                    _this.audio[0].play();
                }else{
                    musicValue._playNext();
                }
            });
        };


        //音频需要加载之后才播放事件
        /*musicValue._onwaiting = function(){
            _this.audio.on('waiting',function(){
                musicValue._showMusicLoading('music_waiting');
            });
        };*/


        //跳动进度的时候执行
        // musicValue._seeked = function(){

        // };

        musicValue._keyPress = function(){//37左键，38右键。
            document.onkeydown = function(e) {
                var keycode = e.which || window.event.keyCode;
                if(keycode == 32 && !$('input').is(':focus')){
                    musicValue._playPause();
                }

                if(keycode == 39 || keycode == 40 && !$('input').is(':focus')){
                    musicValue._playNext();
                }

                if(keycode == 37 || keycode == 38 && !$('input').is(':focus')){
                    musicValue._playPrev();
                }
            }
        };

        //自定义选择音乐类型事件 
        musicValue._selectByClass = function () {
            var typeClass = opt.selectClassName;
            $('.'+typeClass).on('click',function(){
                var type = $(this).attr('data-type');
                musicValue._pause();
                musicValue._dataType(type);
            })
        };

        //播放上一首音乐 -1
        musicValue._playPrev = function(){
            //通过data-index+1来播放下一集
			$('.load_fail').hide();
            var index = _this.audio.attr('data-index')*1 - 1;
            if(index < 0){
                index = musicLenth-1;
            }
            musicValue._insertData(musicData,index);
            musicValue._playPause();

            if($('.cpt-selectScrollMenu').length){
                $('.cpt-selectScrollMenu').find('li').eq(index).css({
                    background:opt.scrollActiveBg,
                    // color:'#fff',
                }).siblings().css({
                    background:'#fff',
                    // color:'#fff',
                });
            }
        };

        //点击下一首音乐事件 +1
        musicValue._playNext = function(){
            //通过data-index+1来播放下一集
			$('.load_fail').hide();
            var index = _this.audio.attr('data-index')*1 + 1;
            if(index >= musicLenth){
                index = 0;
            }
            musicValue._insertData(musicData,index);
            musicValue._playPause();

            if($('.cpt-selectScrollMenu').length){
                $('.cpt-selectScrollMenu').find('li').eq(index).css({
                    background:opt.scrollActiveBg,
                    // color:'#fff',
                }).siblings().css({
                    background:'#fff',
                    // color:'#fff',
                });
            }
        };
		//显示播放列表，可以更具点击列表进行播放
		musicValue._list=function(){
			$('.footer').toggleClass('down');
			$('body').toggleClass('down2');
		};
        musicValue._playIndex = function(event){
			var index = $(event.target).data("index");
            //通过data-index+1来播放下一集
            //var index = index;
            if(index >= musicLenth){
                index = 0;
            }
            musicValue._insertData(musicData,index);
            musicValue._playPause();
        };

        //写入音乐的事件监听
        musicValue._musicListener = function(){
            if(_this.audio[0].readyState == 3){
                opt.afterMusicLoading();
                //删除加载浮层
                DW.removeLoading('music_waiting');
            }
			//写在其他地方会报错，因为这是个监听事件，不是函数
			$('#cpt_dw_music')[0].onerror = function() {//或者写成 $('#cpt_dw_music')[0].addEventListener("error",function(){console.log(123)},false);
				//console.log($('#cpt_dw_music')[0].error.code,$('#cpt_dw_music')[0].error.message);//onerror 为onerror函数
				if (musicValue.intry==1){
					musicValue._playPrev();
					return
				}
				clearInterval(window.id1);
				clearTimeout(window.id2);
				$(".load_fail").text("资源错误");
				$('.load_fail').show();
				setTimeout(function(){
					$('.load_fail').hide();
					},10000);
				clearTimeout(window.id2);
				DW.removeLoading('music_waiting');	
			}
			
            //注册点击事件
            musicValue._clickEvent();

            //音乐播放结束事件
            musicValue._onended();

            // 音乐处于播放或中途中暂停的状态
            musicValue._onplaying();

            //当媒介已停止播放但打算继续播放时运行脚本
            //musicValue._onwaiting();

            //音乐暂停会触发事件   主要是图标的改动
            musicValue._onpause();

            //音乐暂停会触发事件   主要是图标的改动
            musicValue._onplay();

            //按键事件  控制音乐播放
            musicValue._keyPress();
			_this.music_img.on('load',function(){
				_this.cpt_music.show();
			});
        };

        //当source为空时的，默认填充(hard with style)
        musicValue._insertData = function(data,index){
            var music_imgUrl = '/images/hard_with_style.jpg';//ata[index].img_url || '/images/hard_with_style.jpg';
            var music_name ='Hard with Style';//data[index].name || 'Hard with Style';
            var music_url = data[index].url ;//|| 'http://podcast.hardwithstyle.nl/HWS'+musicValue.musicl+'_Presented_by_Headhunterz.mp3';
            var music_singer ='HardStyle';//data[index].singer || 'HardStyle';//风格
            var music_sortIndex = data[index].sort_index || 0;
            _this.music_name.text(music_name).attr('title',music_name);
            _this.music_singer.text(music_singer).attr('title',music_singer);
			_this.music_img.attr('src',music_imgUrl);
			/*if (_this.music_img.attr('src')==''){
				_this.music_img.bind('load',function(){
				_this.cpt_music.show();
				_this.music_img.unbind('load');
			});
			} */
            if(opt.hasBlur){
                var blur_bg = ('url('+ music_imgUrl +')center right no-repeat').toString();
                _this.music_blur.css({
                    background:blur_bg,
                    'background-size':'cover',
                });
            };

            var ret = {
                index:index,
                data:data,
                url:music_url,
            };

            // opt.musicPlayByWebAudio(ret);
            //opt.musicChanged(ret);
            
            _this.audio.attr('src',music_url);
            _this.audio.attr('data-index',index);
			musicValue._showMusicLoading('music_waiting');
        };

        //获取数据之后的操作  添加sort_index属性
        musicValue._getMusicInfo = function(){
            //给获取的音乐添加sortindex 索引   添加属性
            musicLenth = musicData.length;
            for(var i = 0; i < musicLenth; i++){
                musicData[i].sort_index = i;
            }

            if(musicLenth){
                opt.getMusicInfo(musicData);
                musicValue._insertData(musicData,0);

                //监听状态
                musicValue._musicListener();
            }else{
                return;
            }
        };

        musicValue.getRandomElementFromArr = function(arr,num){
            var test_arr = new Array();
            for(var index in arr){
                test_arr.push(arr[index]);    //创建新的arr  为了不改变原来的arr值
            };

            var result_arr = new Array();
            for(var i = 0;i < num; i++) {
                if(test_arr.length>0){
                    var index = Math.floor(Math.random() * test_arr.length);
                    result_arr.push(test_arr[index]);
                    test_arr.splice(index,1);
                }else{
                    return;
                }
            }
            return result_arr;
        }

        //选择获取数据类型  本地 or ajax
        musicValue._dataType = function(text){
            var value = text || '';
            if(opt.hasAjax){
                musicValue._ajax(value);
                // parseData = JSON.parse(data);
            }else{
                // parseData = opt.source;
                musicValue._localData();
            }
        };

        //执行本地数据
        musicValue._localData = function() {
            musicData = opt.source;
            musicValue._getMusicInfo();
        };

        // musicValue._showMusicList = function() {

        // };

        //执行ajax请求的数据
        musicValue._ajax = function(value){
            var value = value || '';
            var music_data = '';
			var a='';
			$.getJSON("https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.hardwithstyle.nl%2F%3Ffeed%3Dpodcast&api_key=z6hgvtruazf0ghcv27xrgo6ieyznezyet0i9khad&count=200", function(data){//若音乐框未出现，可能与这个json获取失败有关，导致getmusicinfo未能执行
				for (var i=0;i<data['items'].length;i++){
					musicValue.source.push({'url':data['items'][i]['enclosure']['link']});
					a=$('<ul><li><a data-index="'+i+'">'+data['items'][i]['title']+'</a></li></ul>').appendTo($('.mCSB_container'));
					a.index(i) 
				}
				musicData=musicValue.source;
				musicValue._getMusicInfo();
				});
            /*$.ajax({
                url:"http://www.hardwithstyle.nl/?feed=podcast",
                type:'get',
                datatype:'json',
                data:{type:value},
                success:function(data){
					console.log(1112);
					console.log(data);
                    musicData = data;
                    // alert(data);
                    musicValue._getMusicInfo();
                },
                error:function(XMLHttpRequest, textStatus, errorThrown) {
                    console.error('XMLHttpRequest.status: ' +XMLHttpRequest.status);
                    console.error('XMLHttpRequest.readyState: ' +XMLHttpRequest.readyState);
                    console.error('textStatus: '+textStatus);
                    return;
                },
            });*/
        }
        musicValue._init();
        return _this;
    }

    $.fn.loading = function(options){
        var $this = $(this);
        var _this = this;
        return this.each(function(){
            var loadingPosition ='';
            var defaultProp = {
                direction:              'column',                                               //方向，column纵向   row 横向
                animateStyle:           'fadeInNoTransform',                                    //进入类型
                title:                  '请稍等...',                                           //显示什么内容
                name:                   'loadingName',                                          //loading的data-name的属性值  用于删除loading需要的参数
                type:                   'origin',                                               //pic   origin  
                discription:            '这是一个描述',                                       //loading的描述
                titleColor:             'rgba(255,255,255,0.7)',                                //title文本颜色
                discColor:              'rgba(255,255,255,0.7)',                                //disc文本颜色
                loadingWidth:           260,                                                    //中间的背景宽度width
                loadingBg:              'rgba(0, 0, 0, 0.6);',                                  //中间的背景色
                borderRadius:           12,                                                     //中间的背景色的borderRadius
                loadingMaskBg:          'transparent',                                          //背景遮罩层颜色
                zIndex:                 1000001,                                                //层级

                // 这是圆形旋转的loading样式    （originLoading）
                originDivWidth:         60,                                                     //loadingDiv的width
                originDivHeight:        60,                                                     //loadingDiv的Height

                originWidth:            8,                                                      //小圆点width
                originHeight:           8,                                                      //小圆点Height
                originBg:               '#fefefe',                                              //小圆点背景色
                smallLoading:           false,                                                  //显示小的loading

                // 这是图片的样式   (pic)
                imgSrc:                 'http://www.daiwei.org/index/images/logo/dw.png',       //默认的图片地址
                imgDivWidth:            80,                                                     //imgDiv的width
                imgDivHeight:           80,                                                     //imgDiv的Height

                flexCenter:             false,                                                  //是否用flex布局让loading-div垂直水平居中
                flexDirection:          'row',                                                  //row column  flex的方向   横向 和 纵向             
                mustRelative:           false,                                                  //$this是否规定relative
            };


            var opt = $.extend(defaultProp,options || {});

            if($this.selector == 'body'){
                $('body,html').css({
                    overflow:'hidden',
                });
                loadingPosition = 'fixed';
            }else if(opt.mustRelative){
                $this.css({
                    position:'relative',
                });
                loadingPosition = 'absolute';
            }else{
                loadingPosition = 'absolute';
            }

            var _showOriginLoading = function(){
                var smallLoadingMargin = opt.smallLoading ? 0 : '-10px';
                if(opt.direction == 'row'){smallLoadingMargin='-6px'}

                //悬浮层
                _this.cpt_loading_mask = $('<div class="cpt-loading-mask animated '+opt.animateStyle+' '+opt.direction+'" data-name="'+opt.name+'"></div>').css({
                    'background':opt.loadingMaskBg,
                    'z-index':opt.zIndex,
                    'position':loadingPosition,
                }).appendTo($this);

                //中间的显示层
                _this.div_loading = $('<div class="div-loading"></div>').css({
                    'background':opt.loadingBg,
                    'width':opt.loadingWidth,
                    'height':opt.loadingHeight,
                    '-webkit-border-radius':opt.borderRadius,
                    '-moz-border-radius':opt.borderRadius,
                    'border-radius':opt.borderRadius,
                }).appendTo(_this.cpt_loading_mask);

                if(opt.flexCenter){
                    _this.div_loading.css({
                        "display": "-webkit-flex",
                        "display": "flex",
                        "-webkit-flex-direction":opt.flexDirection,
                        "flex-direction":opt.flexDirection,
                        "-webkit-align-items": "center",
                        "align-items": "center",
                        "-webkit-justify-content": "center",
                        "justify-content":"center",
                    });
                }
                //loading中间的内容  可以是图片或者转动的小圆球
                _this.loading = $('<div class="loading"></div>').appendTo(_this.div_loading);
				
                //关闭事件冒泡  和默认的事件
                _this.cpt_loading_mask.on('touchstart touchend touchmove click',function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
				 var a=0;  
				 var t=0;
				 function cc(){  
					if (t==0){
						a=a+3;
						if (a==60){
							t=11;
						}
					}
					if (t==1){
						a=a-3;
						if (a==0){
							t=00;
							return
						}
					}
					$(".loading").css({"width":a,"height":a}); 
					if (t==11){
						t=1;
					}else if(t==00){
						t=0;
					}					
				}  
				//这儿改用ajax去获取MP3，而不是直接修改DOM，这样更正确，而不是依靠加载时长判断.且audio在出现403错误是没有error或是onerror方法的，不知道为什么~
				/*function doget(){   跨域 https://www.web-tinker.com/article/20503.html  https://www.cnblogs.com/syfwhu/p/6116323.html
					var xhr = new XMLHttpRequest();
					var context=new AudioContext;
					xhr.addEventListener("error", function(){
						console.log(xhr.responseText);}, false);
					xhr.open('GET', 'http://jq22.qiniudn.com/m_0.mp3');
					xhr.responseType="arraybuffer";
					xhr.onload = function() {
					  if (this.status == 200) {
						    //解析文件数据
						context.decodeAudioData(xhr.response,function(data){
							 //创建source节点
						var source=context.createBufferSource();
						source.buffer=data;
						//连接：source → destination
						source.connect(context.destination);
						//开始播放
						source.start(0);
						});
					}
				};
				xhr.send():
				};
				doget();*/
				window.id1=setInterval(cc,100);  //这边当正常加载后，就不需要继续运行。这儿无论能不能播放都应该去除遮挡
				window.id2=setTimeout(function(){
					clearInterval(window.id1);
					$('.load_fail').text("加载缓慢");
					$('.load_fail').show();
					DW.removeLoading();
					},10000);//onerror打断，出现资源错误，canplay打断，不打断，出现加载缓慢，出现后canplay 再执行，去除。
            };

            function createLoading(){
                //不能生成两个loading data-name 一样的loading
                if($(".cpt-loading-mask[data-name="+opt.name+"]").length > 0){
                    // console.error('loading mask cant has same date-name('+opt.name+'), you cant set "date-name" prop when you create it');
                    return
                }
                
                _showOriginLoading();
            };

            createLoading();//第一首不出现加载：因为这儿是监听loading事件，而第一首是包含在了新DOM中，当然不属于loading范围
        });
    }

    //关闭Loading
    DW.removeLoading = function(loadingName){
        var loadingName = loadingName || '';
        $('body,html').css({
            overflow:'auto',
        });

        if(loadingName == ''){
            $(".cpt-loading-mask").remove();
        }else{
            var name = loadingName || 'loadingName';
            $(".cpt-loading-mask[data-name="+name+"]").remove();        
        }
    }

    window.MC = DW;
})(jQuery,window)