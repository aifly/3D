<template>
	<div  class="lt-full zmiti-index-main-ui " >
		<div class="lt-full zmiti-box-perspective">
			<div class="lt-full zmiti-box-3d" style="width:150px;height:522px">
				<div v-for='(box,i) in boxImgs' :key='i' :style="box.style">
					
				</div>
			</div>
		</div>	 
	</div>
</template>


<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	export default {
		props:['obserable'],
		name:"zmiti-index-page",
		data(){
			return{
				boxImgs:window.boxImgs,
				imgs:window.imgs,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				angle:0,
				styles:[]
			}
		},
		components:{
		},
		
		methods:{
			
			
		},
		mounted(){
			var ang = 360 / this.boxImgs.length;
			var width = 150;

			var Z = Math.tan(Math.PI/180*((180-ang)/2))*width/2;
			console.log(Z)
			this.boxImgs.forEach((item,i)=>{
				item.style = {
					background:'url('+item.img+') no-repeat center center',
					backgroundSize:'cover',
					width:'150px',
					height:'522px',
					transform:"rotateY("+-ang*i+"deg) translateZ("+-Z+"px)"
				}
			})
		}
	}

</script>