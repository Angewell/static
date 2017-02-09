$(function(){
	/**
	 * 微信认证
	 */
	$.post("http://123.206.66.193/generate",{
		url: location.href.split('#')[0]
	},function(data){
		data = JSON.parse(data);
		console.log(data);

		wx.config({
			debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId : 'wx4c166202e798d4cc',  // 必填，公众号的唯一标识
			timestamp : data.timestamp,  // 必填，生成签名的时间戳
			nonceStr : data.noncestr,   // 必填，生成签名的随机串
			signature : data.signature, // 必填，签名，见附录1
			jsApiList : [ 'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage' ]
		// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	});


	// 微信分享
	wx.ready(function(){
		wxShare({
			shareTitle: "刚跟偶像拍了张海报，心都开花了!",
			shareDesc: "2016行走的力量，让心开出花来",
			shareImg: "http://powertogo6.k-run.cn/logo.jpg",
			shareLink: "http://powertogo6.k-run.cn/"
		});
	});



	var mySwiper = new Swiper('.swiper-container', {
		direction : 'vertical',
		pagination : '.swiper-pagination'
	});



	var body_width = $('body').width(),
		winH = $(window).height(),
		isIphone = navigator.userAgent.match(/iphone/i),
		canvas = document.getElementById("myCanvas");


	canvas.width = body_width;
	canvas.height = body_width*1.35;

	var s1_1_h = body_width * 350 / 640;

	$(".s1_1").height(s1_1_h);
	$(".s1_2").css({
		top: s1_1_h + "px"
	});


	if(body_width * 1.35 > winH - 60){
		$("#p3_btn_wrap").css({
			height: "60px"
		});
		$("#p3_btn").css({
			height: "40px",
			"line-height": "40px"
		});
	}else{
		$("#p3_btn_wrap").css({
			height: winH - (body_width*1.35) + "px"
		});
	}

	var $page_2_name = $("#page_2_name");

	var $clipArea = $("#clipArea");

	console.log(winH/body_width);

	$clipArea.height((body_width - 20) * 1.35 + 20);

	$clipArea.photoClip({
	    width: body_width - 20,
	    // height: (body_width - 20) * (winH/body_width),
	    height: (body_width - 20) * 1.35,
	    file: "#file",
	    view: "#hit",
	    ok: "#clipBtn",
	    strictSize: true,
	    clipFinish: function(dataURL) {
	        $('#hit').attr('src', dataURL);

	        if($.trim($page_2_name.val()) == ""){
	        	alert("请输入你想带Ta去的地方！");
	        	return;
	        }

	        if($.trim($page_2_name.val()).length > 5){
	        	alert("请把地名字数控制在5字以内！");
	        	return;
	        }

	        render(dataURL);

	        $(".page.on").removeClass('on');
	        $("#page_3").addClass('on');

	        // 微信分享
	        wxShare({
	        	shareTitle: "刚跟偶像拍了张海报，心都开花了!",
	        	shareDesc: "2016行走的力量，让心开出花来",
	        	shareImg: "http://powertogo6.k-run.cn/logo.jpg",
	        	shareLink: "http://powertogo6.k-run.cn/"
	        });
	    }
	});


	var $flower = $(".flower"),
		$text = $(".text"),
		nScale = (body_width - 20)/500,
		sizeScale = (body_width - 20)/body_width;

	$flower.css({
		"-webkit-transform": "scale("+ sizeScale +")",
		"transform": "scale("+ sizeScale +")",
		"top": 260 * nScale + "px",
		"width": 200 * nScale + "px",
		"height": 370 * nScale + "px"
	});


	$(".f_4").click(function(event) {
		$(".page.on").removeClass('on');
		$("#page_2").addClass('on');
	});


	// flash
	var $page1 = $("#page_1"),
		flashIndex = 1,
		flashTimer;
	$page1.find(".f_1").addClass('on');

	$(window).load(function(){
		flashTimer = setInterval(function(){
			if(flashIndex < 4){
				flashIndex++;
				$page1.find(".on").removeClass('on');
				$page1.find(".f_" + flashIndex).addClass('on');
			}else{
				clearInterval(flashTimer);
				var $view = $(".photo-clip-view");
				$flower.appendTo($view);
				$text.appendTo($view);
			}
		},1800);
	});
	



	//图片上传结束
    $('#upload2').on('click', function() {
        $('#file').click();
    });


    $("#mask").click(function(){
    	$(this).stop().fadeOut(200);
    });



    $("#p3_btn").click(function(){
    	$("#kun_say").stop().fadeIn(200);
    });


    $("#say_btn").click(function(e) {
    	e.stopPropagation();
    	$("#container").removeClass('on');
    	$("#swiperBox").addClass('on');
    });

    $("#kun_say").click(function(){
    	$(this).stop().fadeOut(200);
    });




	// 微信分享
	function wxShare(obj){
		// 分享到朋友圈 配置
		wx.onMenuShareTimeline({
		    title: obj.shareTitle, // 分享标题
		    link: obj.shareLink, // 分享链接
		    imgUrl: obj.shareImg // 分享图标
		});

		// 分享给朋友 配置
		wx.onMenuShareAppMessage({
		    title: obj.shareTitle, // 分享标题
		    desc: obj.shareDesc, // 分享描述
		    link: obj.shareLink, // 分享链接
		    imgUrl: obj.shareImg // 分享图标
		});
	}



	// 渲染 Image 缩放尺寸  
	function render(src) {
		if (src == "") {
		    alert("图像上传失败，请重试");
		}

	    var MAX_HEIGHT = 256; //Image 缩放尺寸 
	    // 创建一个 Image 对象  
	    var image = new Image();

	    // 绑定 load 事件处理器，加载完成后执行  
	    image.onload = function() {
	    	creatImg($.trim($page_2_name.val()), image);
	    };
	    // 设置src属性，浏览器会自动加载。  
	    // 记住必须先绑定render()事件，才能设置src属性，否则会出同步问题。  
	    image.src = src;
	};



	function creatImg(name, image){
		// 获取 canvas DOM 对象  
		var p3_flower = document.getElementById("p3_flower"),
		    p3_text = document.getElementById("p3_text"),
		    p3_code = document.getElementById("p3_code"),
		    MAX_HEIGHT = 256; //Image 缩放尺寸 


		// 如果高度超标  
		if (image.height > MAX_HEIGHT) {
		    // 宽度等比例缩放 *=  
		    image.width *= MAX_HEIGHT / image.height;
		    image.height = MAX_HEIGHT;
		}

		var ctx = canvas.getContext("2d");

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var cScale = body_width/500,
			canvasH = body_width*1.35;

		// 将图像绘制到canvas上  
		ctx.drawImage(image, 0, 0, body_width, canvasH);
		ctx.drawImage(p3_flower, 300 * cScale, 260 * cScale, 200 * cScale, 370 * cScale);
		ctx.drawImage(p3_text, body_width - 40, 10, 26, 151);
		ctx.drawImage(p3_code, 10, canvasH - 90, 80, 80);

		var startX = body_width - 45,
			startY = 162;

		for(var j = 0, jLen = name.length; j < jLen; j++){
			ctx.font = "bold 28px '黑体'";
			ctx.shadowBlur = 1;
			ctx.shadowColor = "black";
			ctx.fillStyle = "white";
			ctx.textBaseline = "top";
			ctx.strokeText(name[j], startX, startY);
			ctx.fillText(name[j], startX, startY);
			startY += 30;
		}

		var dataurl = canvas.toDataURL("image/png"),
		    imagedata = encodeURIComponent(dataurl);

		$("#p3_card").attr("src",dataurl);

		$.post("http://h5.powertogo6.k-run.cn/upload.do ",{
			imgContent: dataurl.split(",")[1]
		},function(data){
			console.log(data);
			if(data.status == 1000){
				$("#p3_card").attr("src",data.thumb);
				$("#mask").delay(800).fadeOut(200);
				$("#p3_tip").hide();
			}
			else{
				alert("图片生成失败，请重试");
			}
		});
	}
});





