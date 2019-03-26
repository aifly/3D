﻿
var boxImgs = [
  {img:'./assets/images/index_01.jpg',style:{}},
  {img:'./assets/images/index_02.jpg',style:{}},
  {img:'./assets/images/index_03.jpg',style:{}},
  {img:'./assets/images/index_04.jpg',style:{}},
  {img:'./assets/images/index_05.jpg',style:{}},
  {img:'./assets/images/index_06.jpg',style:{}},
  {img:'./assets/images/index_07.jpg',style:{}},
  {img:'./assets/images/index_08.jpg',style:{}},
  {img:'./assets/images/index_09.jpg',style:{}},
  {img:'./assets/images/index_10.jpg',style:{}},
  {img:'./assets/images/index_11.jpg',style:{}},
  {img:'./assets/images/index_12.jpg',style:{}},
  {img:'./assets/images/index_13.jpg',style:{}},
  {img:'./assets/images/index_14.jpg',style:{}},
  {img:'./assets/images/index_15.jpg',style:{}},
  {img:'./assets/images/index_16.jpg',style:{}},
  {img:'./assets/images/index_17.jpg',style:{}},
  {img:'./assets/images/index_18.jpg',style:{}},
  {img:'./assets/images/index_19.jpg',style:{}},
  {img:'./assets/images/index_20.jpg',style:{}},
];
window.imgs = {

};
boxImgs.forEach(function(item,i){
  window.imgs['index'+(i+1)] = item.img;
});
var bgImgs = [];
for(var i = 0;i<20;i++){

  window.imgs['img'+(i+1)] = './assets/images/bg/'+(i+1)+'.png';
  bgImgs.push({
    img:'./assets/images/bg/'+(i+1)+'.png',
    id:'img_'+i
  })
}
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

 window.config = {
   indexvideo: './assets/video/index3.mp4',
   indexvideo1: './assets/video/index3.mp4',
   baseUrl: "https://testxlive.xinhuaapp.com",
   host:"https://xlive.xinhuaapp.com", //正式域名：https://testxlive.xinhuaapp.com
   secretKey: "e9469538b0623783f38c585821459454",
  
 };
 
  
var musics = {
	music: {
		src: './assets/music/bg2.mp3',
		autoplay: false,
		name: 'bg2',
		loop: true
	},
  alert: {
    src: './assets/music/alert.mp3',
    autoplay: true,
    name: 'alert',
  },
  error: {
    src: './assets/music/error.mp3',
    autoplay: true,
    name: 'error',
  },
  right: {
    src: './assets/music/right.mp3',
    autoplay: true,
    name: 'right',
  }
};

 (function () {

 	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
 		handleFontSize();
 	} else {
 		if (document.addEventListener) {
 			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
 		} else if (document.attachEvent) {
 			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
 			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
 		}
 	}

 	function handleFontSize() {
 		// 设置网页字体为默认大小
 		WeixinJSBridge.invoke('setFontSizeCallback', {
 			'fontSize': 0
 		});
 		// 重写设置网页字体大小的事件
 		WeixinJSBridge.on('menu:setfont', function () {
 			WeixinJSBridge.invoke('setFontSizeCallback', {
 				'fontSize': 0
 			});
 		});
 	}
 })();