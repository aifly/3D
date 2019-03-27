<template>
	<transition name='main'>
		<div class="zmiti-main-ui" :style='{height:viewH+"px"}' :class="{'show':show}">
			<div class="zmiti-view" ref='view'  @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend' :style="{perspective:perspective+'px',WebkitPerspective:perspective+'px'}">
				<div class="zmiti-box-ui" ref='boxui'>
					<div class="zmiti-translateZ" ref='toZ'>
						<div class="zmiti-box-C" ref='box' v-html='content' >
							 
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	
	import zmitiUtil from '../lib/util';
	import IScroll from 'iscroll';
	import Toast from '../toast/toast';
	
	import zmitiAnimate from '../lib/mTween';
	export default {
		props: ['obserable', 'pv', 'randomPv', 'nickname', 'headimgurl'],
	
		name: 'zmitiindex',
	
		data() {
			return {
				show:true,
				bgImgs:window.bgImgs,
				imgs:window.imgs,
				viewW:Math.min( window.innerWidth,750),
				viewH: window.innerHeight,
				rotateBox:false,
				rotateStop:false,
				perspective:2000,
				lastPoint:0,
				lastTime:0,
				lastSpeed:0,
				isTouch:false,//是否触摸屏幕,
				isStart:true,
				startBoxDeg:0,
				content:'',
			}
		},
	
		components: {
			Toast
		},
		watch:{

		},
		methods: {
  			
  			touchstart(e){
  				this.isTouch = true;
  				if(!this.isTouch){
  					return;
  				}
  				
  				this.startRotateY = zmitiAnimate.css(this.$refs['box'],'rotateY');
  				this.startX = e.changedTouches[0].pageX;
  				this.isStarting = true;
  				
  				this.lastPoint = this.startX;
  				this.lastTime = Date.now();
  				this.lastSpeed = 0;
  				zmitiAnimate.mTween.stop(this.$refs['toZ']);

  				zmitiAnimate.mTween({
					el:this.$refs['toZ'],
					attrs:{
						translateZ:-600
					},
					duration:100,
					fx:'easeIn'
				})
  			},
  			touchmove(e){
  				if(this.isStarting ){
  					var endX = e.changedTouches[0].pageX;
  					
  					var angle = (endX - this.startX)/this.viewW * 180;
  					this.angle = angle;
  					zmitiAnimate.css(this.$refs['box'],'rotateY',this.startRotateY-angle);

  					var nowTime = Date.now();
  					this.lastSpeed = (endX - this.lastPoint) / (nowTime - this.lastTime)*300;

  					this.lastPoint = endX;
  					this.lastTime = nowTime;


  				}
  			},
  			touchend(e){

  				if(!this.isTouch){
  					return;
  				}
  				zmitiAnimate.mTween.stop(this.$refs['toZ']);
				zmitiAnimate.mTween({
					el:this.$refs['toZ'],
					attrs:{
						translateZ:-500
					},
					duration:300,
					fx:'easeIn',

				})
  				if(this.lastSpeed === 0||Date.now()-this.lastTime>=40){
  					setTimeout(()=>{
  						this.isStart = false;
  						this.isTouch = false;
  					},330);
  					return;
  				}



  				this.isStarting = false;
  				var endX = e.changedTouches[0].pageX;
  				 

				var dis = (this.lastSpeed)/this.viewW * 180;

				zmitiAnimate.mTween.stop(this.$refs['toZ']);
				zmitiAnimate.mTween({
					el:this.$refs['toZ'],
					attrs:{
						translateZ:-500
					},
					duration:300,
					fx:'easeIn'
				});

				zmitiAnimate.mTween.stop(this.$refs['box']);
				zmitiAnimate.mTween({
					el:this.$refs['box'],
					attrs:{
						rotateY:zmitiAnimate.css(this.$refs['box'],'rotateY') - dis
					},
					duration:{
						multiple:4,
						min:300,
						max:1600
					},
					fx:'easeOutStrong',
					cb:()=>{
						this.isTouch = false;
						this.isStart = true;
					}


				})


				

  			},
  			bindEvent(){
  				window.addEventListener('deviceorientation',(e)=>{
  					console.log(this.isTouch);
  					if(this.isTouch){
  						return;
  					}
  					var box = this.$refs['box'];

  					if(this.isStart){
  						var deg = (e.alpha + e.gamma)%360;
  						this.isStart = false;
  						this.startDeg = deg;

  						this.startBoxDeg = zmitiAnimate.css(box,'rotateY');

  					}else{
  						var nowDeg = (e.alpha + e.gamma)%360;
  						var disDeg = nowDeg - this.startDeg;

  						zmitiAnimate.css(box,'rotateY',disDeg + this.startBoxDeg);
  					}
  				});
  			},
  			init(){
  				var deg = 52.5;
  				var R = Math.round(Math.tan(deg/180*Math.PI)*this.viewH*.5);
  				this.perspective = R;
  				zmitiAnimate.css(this.$refs['boxui'],"translateZ",R);

  				var view = this.$refs['view'];
  				var toZ = this.$refs['toZ'];
  				var box = this.$refs['box'];
  				setTimeout(()=>{
  					var spans = box.querySelectorAll('span');
  					var R1 = Math.tan(Math.PI/180*((180-360/this.bgImgs.length)/2))*750/2;
  					zmitiAnimate.css(box,'rotateY',80);
  					zmitiAnimate.css(box,'translateZ',-R1);
  					zmitiAnimate.css(toZ,'translateX',-4800);
  					zmitiAnimate.css(toZ,'translateZ',4800);
  					for(var i = 0;i<spans.length;i++){
  						zmitiAnimate.css(spans[i],'rotateY',0);
  						
  					}

  					zmitiAnimate.mTween({
  						el:toZ,
  						attrs:{
  							translateX: 0,
							translateZ: -520
  						},
  						fx:"easeOut",
  						duration:3700
  					});
  					setTimeout(()=>{
  						var len = spans.length;
  						var num = len - 1;
  						var timer = setInterval(()=>{
  							
  							zmitiAnimate.mTween({
  								el:spans[num],
  								attrs:{
  									rotateY:-360/len
  								},
  								fx:'easeOut',
  								duration:800,
  							});
  							num--;
  							if(num<1){
  								clearInterval(timer);
  								this.rotateStop = false;
  								this.bindEvent();
  							}

  						},100)
  					},1300)


  					/*setTimeout(()=>{
  						zmitiAnimate.mTween({
  							el:view,
  							attrs:{
  								rotateY:-1080
  							},
  							fx:'linear',
  							duration:10*1000
  						})
  					},4500)*/

  				},20)
  			}

			
		},
	
		mounted() {

			for(var i =0 ;i<this.bgImgs.length;i++){
				this.content = `<span class='zmiti-box-item' style="background:url(${this.bgImgs[this.bgImgs.length - 1 -i].img}) no-repeat center center;backgroundSize:cover">${this.content}</span>`;
			}
			this.init();
		}
	
	}
</script>
