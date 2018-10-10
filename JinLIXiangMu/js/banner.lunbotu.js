function move(ele, attr, target) {
    if (typeof ele == 'string') {
        ele = document.querySelector(ele);
    }
    clearInterval(ele.timer);
    var init = parseFloat(getStyle(ele, attr));
    if (attr == 'opacity') {
        init *= 100;
    }
    ele.timer = setInterval(function () {
        console.log(1);
        var speed = (target - init) / 20;
        if(speed > 0) {
            speed = Math.ceil(speed);
        } else {
            speed = Math.floor(speed);
        }
        init += speed
        if ((speed >= 0 && init >= target) || (speed <= 0 && init <= target)) {
            init = target;
            clearInterval(ele.timer);
        }
        if (attr == 'opacity') {
            ele.style[attr] = init / 100;
        } else {
            ele.style[attr] = init + 'px';
        }
    }, 10)

}

function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}
var swiper = (function(){
    var timer = null;
    return {
        init: function(ele) {
            if(typeof ele == 'string') {
                ele = document.querySelector(ele);
            }
            this.$ele = ele;
            this.$tip = ele.querySelector('.tip');
            this.$left = ele.querySelector('.left');
            this.$right = ele.querySelector('.right');
            this.$image = ele.querySelector('.image');
            this.$imageAll = this.$image.children;
            this.$image.appendChild(this.$imageAll[0].cloneNode(true));
            this.$image.insertBefore(this.$image.lastElementChild.cloneNode(true), this.$imageAll[0]);
            this.$image.style.left = '-1920px';
            this.$tipLiAll = this.$tip.children;
            for(var i = 0; i <  this.$tipLiAll.length; i++) {
                this.$tipLiAll[i].index = i;
            }
            this.index = 0;
            this.event();
            this.autoPlay(this.index);
        },
        event: function() {
            var _this = this;
            _this.$tip.onclick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName == 'LI') {
					 clearInterval(timer);
                    _this.showImage(target.index);
                    _this.autoPlay(target.index+1)
                }
            };
            _this.$ele.onmouseenter = function()
            {
            	_this.$left.style.display = "block";
            	_this.$right.style.display = "block";
                
            }
            _this.$ele.onmouseleave = function()
            {
            	_this.$left.style.display = "none";
            	_this.$right.style.display = "none";
            	_this.$left.style.background = "url(../images/left.png)";
            	_this.$right.style.background = "url(../images/right.png)";
            }
            _this.$left.onclick =function() {
            	 clearInterval(timer);
                _this.showImage(--_this.index);
                _this.$left.style.background = "url(../images/left.png)";
                _this.autoPlay(_this.index+1)
            }
            _this.$right.onclick = function() {
            	 clearInterval(timer);
               _this.showImage(++_this.index);
               _this.$right.style.background = "url(../images/right.png)";
               _this.autoPlay(_this.index+1)
            }
        },
        showImage: function(index) {
            var max = this.$tipLiAll.length - 1;
            if(index > max)
            {
                index = 0;
                this.$image.style.left = 0;
            } 
            else if(index < 0) 
            {
                index = max;
                this.$image.style.left = -600 * (max + 2) + 'px';
            }
            this.index = index;
            for(var i = 0; i < this.$tipLiAll.length; i++) {
                this.$tipLiAll[i].removeAttribute('class');
            }
            this.$tipLiAll[index].className = 'active';
            move(this.$image, 'left', -1920 * (index + 1));
        },
        autoPlay(index) {
        	clearInterval(timer);
        	var _this = this;
           timer = setInterval(function(){
           	 _this.index++;
           		if(_this.index>2)
           		{
           			_this.index = 0;
           		}
           		_this.showImage(_this.index)
           },5000)
        }
    }
}())
swiper.init('.box');