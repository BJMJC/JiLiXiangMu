var phone = (function(){
        
    return {
      init: function() {
        // 获取最大的盒子
        this.$box = document.querySelector('.box');
        // 获取展示图片的盒子
        this.$showImage = this.$box.querySelector('.show-image');
        // 获取放大图片的盒子
        this.$showBigImage = this.$box.querySelector('.show-big-image');
        // 获取放大的图片
        this.$bigImage = this.$showBigImage.firstElementChild;
        // 获取小图片的盒子
        this.$ulbox = this.$box.querySelector('.img-box');
        // 获取每一张图片的li集合
        this.$liAll = this.$ulbox.children;
        // 获取移动的小黑块(放大镜)
        this.$filter = this.$showImage.querySelector('.filter');
        // 给每一li添加索引， 方便获取
        for(var i = 0; i < this.$liAll.length; i++) {
          this.$liAll[i].index = i;
        }

        this.event();

      },
      event: function() {
        var _this = this;
        // 利用事件委托，给每一个li添加点击事件
        this.$ulbox.onclick = function(ev) {
          ev = ev || window.event;
          // 获取目标元素
          var target = ev.target || ev.srcElement;
          // 这里点击的是img
          if(target.nodeName == 'IMG') {
            _this.showImage(target.parentNode.index);
          }

        }

        // 这里用onmouseenter： 子元素不触发事件
        this.$showImage.onmouseenter = function() {
          // 放大镜显示
          _this.$filter.style.display = 'block';
          // 展示大图片显示
          _this.$showBigImage.style.display = 'block';
          // 注意: 需要放大镜显示以后,才可以获取真正的放大镜尺寸
          _this.maxX = this.clientWidth - _this.$filter.offsetWidth;
          _this.maxY = this.clientHeight - _this.$filter.offsetHeight;
        }
        this.$showImage.onmouseleave = function() {
          _this.$filter.style.display = 'none';
          _this.$showBigImage.style.display = 'none';
        }
        // 在展示图片盒子里移动
        this.$showImage.onmousemove = function(ev) {
          // 计算放大镜的位置
          var x = ev.pageX -  _this.$filter.offsetWidth / 2 - _this.$showImage.offsetLeft;
          var y = ev.pageY -_this.$filter.offsetHeight / 2 - _this.$showImage.offsetTop;
          // 边界处理
          if(x < 0) {
            x = 0;
          } else if(x > _this.maxX) {
            x = _this.maxX;
          }
          if(y < 0) {
            y = 0;
          } else if(y > _this.maxY) {
            y = _this.maxY;
          }
          _this.$filter.style.left = x + 'px';
          _this.$filter.style.top = y + 'px';

          // 移动大图片
          _this.$bigImage.style.left = x * -3 + 'px';
          _this.$bigImage.style.top = y * -3 + 'px';

        }
        
      },
      showImage: function(index) {
        for(var i = 0; i < this.$liAll.length; i++) {
          this.$liAll[i].removeAttribute('class');
        }
        this.$liAll[index].className = 'active';
        // 获取最小图片的地址
        var src = this.$liAll[index].firstElementChild.src;
        this.$showImage.firstElementChild.src = src.replace('small', 'big');
        this.$bigImage.src = src.replace('small', 'largest')
        console.log(src);
      }
      
    }
    
  }())
  phone.init();
