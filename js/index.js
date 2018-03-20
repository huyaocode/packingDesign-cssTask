window.onload = function(){
	$('#fullpage').fullpage({
		anchors: ['div_id_advAnchor', 'div_id_caseAnchor', 'div_id_productAnchor', 'div_id_aboutAnchor', 'div_id_contactAnchor'],
		menu: '#id_ul_Anchors'
	});
	//首页轮播图
	var oHomePicsContainer = document.getElementsByClassName('div_class_container')[0];
	var oHomePicsInner = document.getElementsByClassName('div_class_cut')[0];
	var aHomePics = $id('paganation').getElementsByTagName('span');
	var homeCarouse = new Carousel(oHomePicsContainer, oHomePicsInner, aHomePics);
	GetSlider("product");	//产品页滑动
	GetSlider("case");		//案例页滑动
	GetSlider("about");		//关于页
	var toggoleNav = $id("div_id_toggleNav");
	toggoleNav.onclick = function(){
		if($id("div_id_nav").style.left == '0px'){
			$id("div_id_nav").style.left = '-256px';
			$id("div_id_curtain").style.display = 'none';
		} else {
			$id("div_id_nav").style.left = 0;
			$id("div_id_curtain").style.display = 'block';
		}
	}
	$id("div_id_curtain").onclick = function(){
		$id("div_id_nav").style.left = '-256px';
		$id("div_id_curtain").style.display = 'none';
	}
}
function GetSlider(name){
	var oSlider = $id(name+"Slider");
	var oContianer = $id(name+"Container");
	var aList = document.getElementsByClassName(name+"Swiper");
	var oContianerLeft = $id(name+"Left");
	var oContianerRight = $id(name+"Right");
	var slider = new Slider(oSlider, oContianer, aList, oContianerLeft, oContianerRight);
}
function $id(id) {
	return document.getElementById(id);
}