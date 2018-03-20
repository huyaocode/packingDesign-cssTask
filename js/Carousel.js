function Carousel(container, inner, spanList, left, right, speedControl = 15, autoRoll = true, slideCycle =5000) {
    this.container = container;     //组件容器, 包括所有
    this.inner = inner;             //装载图片的容器
    this.spanList = spanList;       //每页锚点
    this.left = left;               //左移button
    this.right = right;             //右移button
    this.speedControl= speedControl;   //速度控制,值越小轮播跳转速度越快
    this.autoRoll = autoRoll;       //是否自动滚动
    this.slideCycle = slideCycle;   //滚动周期
    this.timer;                     //完成滚动的定时器    
    var me = this;                  //解决定时器的this问题,以及绑定事件时的在文档中执行的this
    this.distance = this.container.offsetWidth;//获取展示区的宽度，即每张图片的宽度
    // console.log(this.spanList.length);
    //左切换事件
    if(left && right){
        this.left.onclick= function() {
            if(me.clickFlag){
                clickFlag = false;
                me.backward();
                
            }
        }
        //右切换事件
        this.right.onclick= function() {
            if(me.clickFlag){
                clickFlag = false;
                me.forward();
            }
        }
    }
    //这里只能用let, 用var会导致点击中的index全变成spanList.length
    for(let i=0; i < this.spanList.length; i++) {
        this.spanList[i].onclick= function() {
            me.index = i;
            me.routate();
        }
    }
    //控制每次滚动间隔      (当类调用时自动执行)
    if(this.autoRoll) {     //如果需要自动滚动(默认需要)
        this.timeAutoGo = setInterval(function(){
            me.index++;
            //当图片下标到最后一张把小标换0
            if(me.index > me.spanList.length){
                me.index=0;
            }
            me.routate();
        },this.slideCycle);//主要用来设置自动滑动的计时器
    }
}

Carousel.prototype = {
    constructor: Carousel,
    index: 0,           //记录每次滑动图片的下标
    clickFlag: true,   //设置左右切换标记位防止连续按
    //定义图片滑动的函数
    routate: function () {
        
        var start=this.inner.offsetLeft;//获取移动块移动前的left的开始坐标, (0,width, width*2, width*3 ...)
        var end=this.index*this.distance*(-1);//获取移动块移动结束的坐标。
        //计算公式即当移动到第三张图片时，图片下标为2乘以图片的宽度就是块的left值。
        var change=end-start;//偏移量
        this.clear();//先把按钮状态清除,再让对应按钮改变状态
        if(this.index==this.spanList.length){
            this.spanList[0].className="selected";
        }else{
            this.spanList[this.index].className="selected";
        }
        var me = this;
        clearInterval(me.timer);//开启计时器前先把之前的清除, 防止多次重复生成定时器,干扰操作, 
        me.timer=setInterval(function() {
            var iCur = parseInt(me.getStyle(me.inner, 'left'));
            if(iCur == end){//当图片到达终点停止计时器
                clearInterval(me.timer);
                me.clickFlag = false;//当图片到达终点才能切换
                if(me.index == me.spanList.length ){
                    me.inner.style.left = 0;    //无缝滚动
                    me.index=0; //当图片到最后一张时把它瞬间切换回第一张，由于都同一张图片不会影响效果
                    iCur = 0;
                    end = 0;    //让speed等于0, 即me.inner.style.left = 0;停止此次运动,否则结束时候会向左偏移
                }
            }
            var speed = (end - iCur) / me.speedControl;
            speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
            me.inner.style.left = (speed + iCur) + "px";  //每次移动距离=change/maxT*ts
        }, 17);//每个17毫秒让块移动
    },
    //编写图片向右滑动的函数
    forward : function() {
        this.index++;
        //当图片下标到最后一张把小标换0
        if(this.index > this.spanList.length){
            this.index=0;
        }
        this.routate();
    },
    //编写图片向左滑动函数
    backward : function(){
        this.index--;
        //当图片下标到第一张让它返回到倒数第二张，
        //left值要变到最后一张才不影响过渡效果
        if(this.index<0){
            this.index=this.spanList.length-1;
            this.inner.style.left=(this.index+1)*this.distance*(-1)+"px";
        }
        this.routate();
    },
    //清除页面所有按钮状态颜色
    clear : function() {
        for(var i=0;i<this.spanList.length;i++){
            this.spanList[i].className="";
        }
    },
    getStyle : function(obj, attr) {
        try{
            if(obj.currentStyle != undefined ){
                return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj, false)[attr];
            }
        }catch(e){
            
        }
    }
}