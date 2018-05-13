$(function(){
	var liNum = 125;  //暂定li个数为125个  5*5*5
	init();

	function init(){								//初始化
		for(var i = 0;i<liNum;i++){
			var $li = $("<li></li>");
			$li.html(i);
			var x = Math.random()*4000-2000;
			var y = Math.random()*4000-2000;
			var z = Math.random()*4000-2000;
			$li.css({
				'transform' : 'translate3d('+x+'px,'+y+'px,'+z+'px)'
			});
			$("#main").append($li);
		}
		setTimeout(function(){
			Grid();
			$("#btns").css({
				'transform':'scale(1)',
				'opacity': '1'
			});
		},300);
		$("#btns li").click(function(){
			var index = $(this).index();
			switch (index)
			{
				case 0:
					Table();
					break;
				case 1:
					Sphere();
					break;
				case 2:
					Helix();
					break;
				case 3:
					Grid();
					break;
			}
		});
	}

	function Grid(){								//进行排序
		
		var zX = 500,
			zY = 500,
			zZ = 800;
		var	firstX = -2*zX,
			firstY = -2*zY,
			firstZ = -2*zZ;
		$("#main li").each(function(i){
			var iX = i % 5; // x方向，要增加的倍数
			var iY = parseInt((i % 25) / 5); //y方向要增加的倍数
			var iZ = parseInt(i / 25);//z方向要增加的倍数
			
			$(this).css({
					'transform' : 'translate3d('+ ( firstX + iX*zX ) +'px,'+ (firstY+iY*zY) +'px,'+(firstZ+iZ*zZ)+'px)',
					'transition' : '5s ease-in-out'
				});
		});			
	}


	function Helix(){								//螺旋状排列
		$("#main li").each(function(i){
			$(this).css({
				'transform':'rotateY('+(10*i)+'deg) translateY('+7*i+'px) translateZ(1000px) '
			});
		});
	}
	function Table(){								//元素周期表排列
		
		var tX = 160 , tY = 200;
		var firstX = -9*tX + 60;
		var firstY = -4*tY;
		var arr = [
			{x:firstX,y:firstY},
			{x:firstX+17*tX,y:firstY},
			{x:firstX , y:firstY+tY },
			{x:firstX+tX , y:firstY+tY},
			{x:firstX+12*tX , y:firstY+tY },
			{x:firstX+13*tX , y:firstY+tY },
			{x:firstX+14*tX , y:firstY+tY },
			{x:firstX+15*tX , y:firstY+tY },
			{x:firstX+16*tX , y:firstY+tY },
			{x:firstX+17*tX , y:firstY+tY },
			{x:firstX , y:firstY+tY*2 },
			{x:firstX+tX , y:firstY+tY*2},
			{x:firstX+12*tX , y:firstY+tY*2 },
			{x:firstX+13*tX , y:firstY+tY*2 },
			{x:firstX+14*tX , y:firstY+tY*2 },
			{x:firstX+15*tX , y:firstY+tY*2 },
			{x:firstX+16*tX , y:firstY+tY*2 },
			{x:firstX+17*tX , y:firstY+tY*2 }
		];
		$('#main li').each(function(i){
			var x , y;
			if ( i < 18 )
			{
				x = arr[i].x;
				y = arr[i].y;
			}else
			{
				var iX = (i+18) % 18;
				var iY = parseInt((i+18)/18) + 1;
				x = firstX+iX*tX;
				y = firstY+iY*tY;
			}
			$(this).css({
				transform : 'translate('+x+'px,'+y+'px)'
			});
		});
	}
	function Sphere(){								//球状排列
		var zZ = 800;
		var firstRoX = 0,
			firstRoY = 0;
		var  roX = 20,
			 roY = 360/(liNum/18);
		$('#main li').each(function(i){
			var iY = Math.floor(i/18);
			$(this).css({
				'transform':' rotateY('+ (firstRoY+roY*iY) +'deg) rotateX('+ (firstRoX+roX*i) +'deg) translateZ('+ zZ +'px)'
			});
		});
		/*var arr = [1,5,9,13,17,19,22,19,17,13,9,5,1];
		var roX = 180/arr.length;
		var firstRoX = 90;
		$("#main li").each(function(j){
			var sum = 0;
			var index,//层数
				num;
			for (var i=0;i<arr.length;i++){ 
				sum += arr[i];
				if(sum>=j-1){
					index = i;
					num = arr[i]-(sum-j);
					break;
				}
			}
			var roY = 360/arr[index];
			var x = index%2?firstRoX+index*roX:firstRoX-index*roX; 
			var y = num*roY;
			var z = 0;
			if(x>90&&x<270){
				z = 180;
			}
			$(this).css({
				'transform':'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ('+z+'deg) translateZ(800px)'
			});
		});*/
	}	
	(function(){									//拖拽及滚轮
		var nowX,lastX,minusX=0,nowY,lastY,minusY=0;
		var roY = 0 ;
		var roX = 0 ;
		var translateZ = -2000;
		var timer1,timer2 ;
		$(document).mousedown(function(ev){
			ev = ev || window.event;
			lastX = ev.clientX;
			lastY = ev.clientY;
			clearInterval(timer1);
			$(this).on('mousemove',function(ev){
				ev = ev || window.event;
				nowX = ev.clientX;
				minusX = nowX - lastX;
				nowY = ev.clientY;
				minusY = nowY - lastY;
				roY += minusX*0.4;
				roX += minusY*0.4;
				$("#main").css({
					'transform' : 'translateZ('+translateZ+'px) rotateX('+-roX+'deg) rotateY('+roY+'deg)'
				});
				lastX = nowX;
				lastY = nowY;
			});
		}).mouseup(function(){
			$(this).off('mousemove');
			timer1 = setInterval(function(){
				minusX *= 0.9;
				minusY *= 0.9;
				if(Math.abs(minusX)<0.5&&Math.abs(minusY<0.5)){    //结束定时器条件
					clearInterval(timer1);
				}
				roY += minusX*0.4;
				roX += minusY*0.4;
				$("#main").css({
					'transform' : 'translateZ('+translateZ+'px) rotateX('+-roX+'deg) rotateY('+roY+'deg)'
				});
			},13);
		}).mousewheel(function(){        //滚轮事件
			clearInterval(timer2);
			var z = arguments[1];			   //arguments 不定参  实参的集合
			translateZ += z*200;
			translateZ = Math.min(0,translateZ);
			translateZ = Math.max(-4000,translateZ);
			$("#main").css({
				'transform' : 'translateZ('+translateZ+'px) rotateX('+-roX+'deg) rotateY('+roY+'deg)'
			});
			timer2 = setInterval(function(){
				z *= 0.85;
				if (Math.abs(z)<0.01) {
					clearInterval(timer2);
				}
				translateZ += z*200;
				translateZ = Math.min(0,translateZ);
				translateZ = Math.max(-4000,translateZ);
				$("#main").css({
					'transform' : 'translateZ('+translateZ+'px) rotateX('+-roX+'deg) rotateY('+roY+'deg)'
				});
			},13);
		});
	})()
});