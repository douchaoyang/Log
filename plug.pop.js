/*
**@Author  douchaoyang
**@Relyed  core.lib.js
*/
window.Pop = window.Pop || (function($) {
	/*设置弹出元素的位置
	根据窗口高度与弹出元素的高度比较自动设置固定方式
	在IE6下默认absolute*/
	var isMask=false,isFucked="";
	var setPosition = function(element) {
			var _this = g(element);
			/*必须先设置元素可见，隐藏元素无法获取offset值*/
			_this.style.display = "block";
			var _scrollTop = $.getScrollTop();
			var _scrollLeft = $.getScrollLeft();
			/*设置固定方式标记*/
			var _flag = (_this.offsetHeight > $.getWinHeight()) || $.browser.ie6;
			$.setStyle(_this, {
				"position": _flag ? "absolute" : "fixed",
				"left": "50%",
				"top": _flag ? _scrollTop + "px" : "50%",
				"marginLeft": _flag ? -1 * Math.floor(_this.offsetWidth / 2) + _scrollLeft + "px" : -1 * Math.floor(_this.offsetWidth / 2) + "px",
				"marginTop": _flag ? "40px" : -1 * Math.floor(_this.offsetHeight / 2) + "px",
				"zIndex": 1000
			})
		};
	var removePosition = function(element) {
			g(element).style.display = "none";
			g(element).removeAttribute("style")
		};
	var setMask = function() {
			if(!isMask)
			{
				_this = $.creatElment("div");
				$.setStyle(_this, {
					"display": "block",
					"width": $.getPageWidth() + "px",
					"height": $.getPageHeight() + "px",
					"position": "absolute",
					"left": "0",
					"top": "0",
					"background": "#000",
					"opacity": 0.75,
					"filter": "alpha(opacity=75)",
					"zIndex": "999"
				});
				/*修复IE6下无法盖住select组件的bug*/
				if ($.browser.ie6) {
					_this.innerHTML = "<iframe style=\"position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);z-index:999\" src=\"javascript:void(0)\"></iframe>";
				}
				_this.id = "POP_SHOW_HIDE_MASK";
				$.bodyAdd(_this);
				isMask=true
			}			
		};
	var removeMask = function() {
			$.removeElment(g("POP_SHOW_HIDE_MASK"));
			isMask=false;
		};
	var show = function(element) {
			isFucked?removePosition(isFucked):setMask();
			setPosition(element);
			isFucked=element
		};
	var hide = function(element) {
			if(isFucked==element)
			{	
				removeMask();
				removePosition(element);
				isFucked=""
			}
		};
	return {
			show: show,
			hide: hide
		}
})(core);