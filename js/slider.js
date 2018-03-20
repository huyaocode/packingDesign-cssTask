function Slider(viewContain, sliderContainer, aSliders, leftButton, rightButton, speedControl = 12) {
    this.sliderContainer = sliderContainer;
    this.aSliders = aSliders;             //装载图片的容器
    this.leftButton = leftButton;               //左移button
    this.rightButton = rightButton;             //右移button
    this.speedControl= speedControl;   //速度控制,值越小轮播跳转速度越快
    this.preContainerWidth =  parseInt(this.getStyle(viewContain, 'width'));   //视口宽度(可见宽度)
    
    this.timer;                     //完成滚动的定时器
    var me = this;                  //解决定时器的this问题,以及绑定事件时的在文档中执行的this
    //左切换事件
    this.leftButton.onclick = function() {
        if(me.clickFlag){
            me.clickFlag = false;   //写在函数前, 代码执行问题
            me.routate(1);
        }
    }
    //右切换事件
    this.rightButton.onclick = function() {
        if(me.clickFlag) {
            me.clickFlag = false;
            me.routate(0);
        }
    }
    this.slidersLen = 0;    //所有滑块长度总和
    for(var i = 0; i < this.aSliders.length; i++){
        this.slidersLen += parseFloat(this.getStyle(this.aSliders[i], 'width'));  //获取展示区的宽度，即每张图片的宽度
        this.slidersLen += parseFloat(this.getStyle(this.aSliders[i], 'marginRight'));
        this.slidersLen += parseFloat(this.getStyle(this.aSliders[i], 'marginLeft'));
        this.slidersLen = Math.ceil(this.slidersLen);
    }
}

Slider.prototype = {
    constructor: Slider,
    index: 0,           //记录每次滑动左边显示或出现的那个滑块的下标
    clickFlag: true,   //设置左右切换标记位防止连续按
    //定义图片滑动的函数
    routate: function(direction) {
        var me = this;
        if(this.index - direction < 0){
            this.clickFlag = true;
            return;
        }

        var distance = parseFloat(this.getStyle(this.aSliders[this.index - direction], 'width'));  //获取展示区的宽度，即每张图片的宽度
        distance += parseFloat(this.getStyle(this.aSliders[this.index - direction], 'marginRight'));
        distance += parseFloat(this.getStyle(this.aSliders[this.index - direction], 'marginLeft'));
        var start =  parseFloat(this.getStyle(this.sliderContainer, 'marginLeft'));//获取移动块移动前的leftButton的开始坐标, (0,width, width*2, width*3 ...)
        var end;
        if(direction == 0){//获取移动块移动结束的坐标。
            end = (start - distance);
        } else{
            end = (start + distance);
        }
        end = direction ?  Math.ceil(end): Math.floor(end);
        // end = Math.ceil(end)
        if(!direction && ( 0 - end + this.preContainerWidth) > this.slidersLen || end > 0){ //到达两端
            me.clickFlag = true;
            return;
        }
        me.timer=setInterval(function(){
            var iCur = parseInt(me.getStyle(me.sliderContainer, 'marginLeft'));
            if(iCur == end){//当图片到达终点停止计时器
                clearInterval(me.timer);
                me.clickFlag = true;//当图片到达终点才能切换
                if(direction== 0){
                    me.index++;
                } else{
                    me.index--;
                }
            }
            var speed = (end - iCur) / me.speedControl;
            speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
            me.sliderContainer.style.marginLeft = (speed + iCur) + "px";  //每次移动距离=change/maxT*ts
        }, me.speedControl);//每个17毫秒让块移动
    },
    getStyle : function(obj, attr) {
        if(obj.currentStyle != undefined ) {
            return obj.currentStyle[attr];
        }
        else {
            return getComputedStyle(obj, false)[attr];
        }
    }
}