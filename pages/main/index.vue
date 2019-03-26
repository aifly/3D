<template>
	<transition name='main'>
		<div class="zmiti-main-ui" :style='{height:viewH+"px"}' :class="{'show':show}">
			<div class="zmiti-view" :style="{perspective:perspective+'px'}">
				<div class="zmiti-box-ui" ref='boxui'>
					<div class="zmiti-translateZ" ref='toZ' @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend'>
						<div class="zmiti-box-C" ref='box' :class='{"active":rotateBox}'>
							<div  :style="item.style"  class="zmiti-box-item" v-for="(item,i) in bgImgs" :key='i'>
							
							</div>
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
  				if(!this.rotateStop){
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
						translateZ:-1600
					},
					duration:100,
					fx:'easeIn'
				})
  			},
  			touchmove(e){
  				if(!this.rotateStop){
  					return;
  				}
  				if(this.isStarting ){
  					var endX = e.changedTouches[0].pageX;
  					
  					var angle = (endX - this.startX)/this.viewW * 120;
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
						translateZ:-1500
					},
					duration:300,
					fx:'easeIn',

				})
  				if(!this.rotateStop ||this.lastSpeed === 0||Date.now()-this.lastTime>=40){
  					setTimeout(()=>{
  						this.isStart = false;
  					},330);
  					return;
  				}



  				this.isStarting = false;
  				var endX = e.changedTouches[0].pageX;
  					
				///zmitiAnimate.css(this.$refs['box'],'rotateY',this.startRotateY-angle);
				//缓存距离

				var dis = (this.lastSpeed)/this.viewW * 120;

				zmitiAnimate.mTween.stop(this.$refs['toZ']);
				zmitiAnimate.mTween({
					el:this.$refs['toZ'],
					attrs:{
						translateZ:-1500
					},
					duration:300,
					fx:'easeIn'

				})

				


				zmitiAnimate.mTween.stop(this.$refs['box']);
				zmitiAnimate.mTween({
					el:this.$refs['box'],
					attrs:{
						rotateY:zmitiAnimate.css(this.$refs['box'],'rotateY') - dis
					},
					duration:{
						multiple:3,
						min:200,
						max:1500
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

  						console.log(this.startBoxDeg)

  						zmitiAnimate.css(box,'rotateY',disDeg + this.startBoxDeg);
  					}
  				});
  			}
		},
	
		mounted() {

			var angle = 360 / this.bgImgs.length;
			var Z = Math.tan(Math.PI/180*(180-angle)/2)*129/2 ;
			this.bgImgs.forEach((item,i)=>{
				item.style = {
					width:'129px',
					height:'1170px',
					background:'url('+item.img+') no-repeat center center',
					backgroundSize:'cover',
					transform:"rotateY("+-angle*i+"deg) translateZ("+-Z+"px)"

				}
			});


			var perspective = Math.tan(Math.PI/180*52)* this.viewH /2*2 ;
			this.perspective = perspective;
			zmitiAnimate.css(this.$refs['boxui'],"translateZ",perspective);
			this.bgImgs = this.bgImgs.concat([]);

			zmitiAnimate.css(this.$refs['toZ'],'translateZ',-4500);
			zmitiAnimate.css(this.$refs['box'],'rotateY',0);

			setTimeout(()=>{

				zmitiAnimate.mTween({
					el:this.$refs['box'],
					attrs:{
						'rotateY':1080
					},
					duration:5000,
					cb:()=>{
						this.rotateStop = true;
						this.bindEvent();
						
					}
				});

				zmitiAnimate.mTween({
					el:this.$refs['toZ'],
					attrs:{
						translateZ:-1500
					},
					duration:2000,
					fx:'easeIn'

				})
			},200)
		}
	
	}
</script>
