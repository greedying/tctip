var tctipUtil = {

	/***在目标元素target最后创建新元素。
	 * 新元素标签名为tagName,属性由param键值对决定
	 */
createElement	: function(param, tagName, target) {
				   var element = document.createElement(tagName || "div");
				   for (var key in param) {
					   key == "style" ? (element[key].cssText = param[key]) : (element[key] = param[key])
				   }
				   return (target || document.body).appendChild(element);
			   },

/***
 * 根据className获得元素
 */
getElementsByClassName:	function(className,node) {
						node = node || document;
						if (node.getElementsByClassName) { // use native implementation if available
						  return node.getElementsByClassName(className);
						}else {
						  return (function getElementsByClass(searchClass,node) {
								  var classElements = [],
								  els = node.getElementsByTagName("*"),
								  elsLen = els.length,
								  pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

								  for (i = 0, j = 0; i < elsLen; i++) {
									if ( pattern.test(els[i].className) ) {
										classElements[j] = els[i];
										j++;
									}
								  }
								  return classElements;
								  })(className, node);
							}
						},
/***
 * firefox兼容性处理
 * 如果是firefox，则使用textContent
 * 否则使用innerText
 */
getTextKey:		function(){
					if(tctipUtil.getExplorer() == "firefox"){
						return "textContent";
					}
					return "innerText";
				},

/***
 * 判断浏览器类型
 */
getExplorer:	function(){
						var explorer = window.navigator.userAgent.toLowerCase();
						//ie 
						if (explorer.indexOf("msie") >= 0) {
							return "ie";
						}
						//firefox 
						else if (explorer.indexOf("firefox") >= 0) {
							return "firefox";
						}
						//Chrome
						else if(explorer.indexOf("chrome") >= 0){
							return "chrome";
						}
						//Opera
						else if(explorer.indexOf("opera") >= 0){
							return "opera";
						}
						//Safari
						else if(explorer.indexOf("safari") >= 0){
							return "safari";
						}
					},
/***
 * 增加onload函数
 * 如果onload已经存在，则在原来onload函数后追加func。
 * 否则将func赋值于onload函数
**/
addLoadEvent	: function(func){
					  if(typeof window.onload != "function"){
						  window.onload = func;
					  }else{
						  var oldonload = window.onload;
						  window.onload = function(){
							  oldonload();
							  func();
						  }
					  }
				  },

/****
 * 是否支持canvas属性
 * 根据结果可以决定绘制二维码的方式
 */
isSupportCanvas	: function(){
					  try{
						  document.createElement("canvas").getContext("2d");
						  return true;
					  } catch (e) {
						  return false;
					  }
				  },

/**
  * * 判断mouseover/mouseout事件是否在事件源上执行
  * * 如果是，则执行相关操作，如果不是而是在事件源内部子元素上，则不执行操作
  * * @param {xxxEvent} e Event对象（当前的事件）
  * * @param {HTMLDivElement} target 事件源（目标对象）
  * * @return {Boolean}
* */
isMouseLeaveOrEnter	: function(e, target) {
						  if (e.type != 'mouseout' && e.type != 'mouseover') return false;
						  var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
						  while (reltg && reltg != target)
							  reltg = reltg.parentNode;
						  return (reltg != target);
					  },


/***
 * 获得当前event,兼容ie和ff
 */
currentEvent:	function()
				{
					if(document.all)  return window.event;
					func= tctipUtil.currentEvent.caller;
					while(func!=null){
						var arg0=func.arguments[0];
						if(arg0){
							if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || 
							   (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation)){
								return arg0;
							}
						}
						func=func.caller;
					}
					return null;
	},
/****
 *两个obj合并；如果都存在的元素，则选择source
isALl: 如果source中有target不存在的属性，是否增加
**/
mergeArray : function (target, source, isAll) {
			for (var p in source) {
				if (target.hasOwnProperty(p) || isAll) {
					target[p] = source[p];
				}
			}
			return target;
},


/**
 * 简单动画效果
 * 用来显示和隐藏插件
 */
animate:	function(props, element, speed){
				/***
				 * speed和动画效果,
				 * 待实现
				 */
				for(var key in props){
					element.style[key] = props[key];
				}

		},

/***
 * pathPrefix 路径前缀，可以是域名，也可以是路径
 * 例如 domain.com domain.com/static /static 三者都可以，作用是修正css和图片的url,
 * 默认用户使用此插件的时候，不会改变现在的几个文件夹的相对结构;否则请自行修改js代码
 * 如果pathPrefix为空，则直接返回url
 * 否则返回pathPrefix+url,中间去掉可能重复的"/"
 */
staticUrl:	function(pathPrefix, url){
				if(pathPrefix !== "" && url.substring(0,4) != "http"){
					var length = pathPrefix.length;
					if(pathPrefix[length-1] == "/"){
						pathPrefix = pathPrefix.substring(0, length-1);
					}

					if(url[0] == "/"){
						url = url.substr(1);
					}
					return pathPrefix + "/" + url;
				}else{
					return url;
				}
		},
/***
 * 生成二维码方法
 * param options传入自定义参数，如长宽和文字等
 * targetEle 目标元素,DOM变量
 */
generateQR :		 function (options, targetEle) {
				 // if options is string,
				 if( typeof options === 'string' ){
					 options = { text: options };
				 }

				 // set default values
				 // typeNumber < 1 for automatic calculation
				 options = tctipUtil.mergeArray({
						render      : "canvas",
						width       : 256,
						height      : 256,
						typeNumber  : -1,
						correctLevel    : QRErrorCorrectLevel.H,
						background      : "#ffffff",
						foreground      : "#000000"
					}, options, true);

				 var createCanvas    = function(){
					 // create the qrcode itself
					 var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
					 qrcode.addData(options.text);
					 qrcode.make();

					 // create canvas element
					 var canvas      =   document.createElement('canvas');
					 canvas.width    =   options.width;
					 canvas.height   =   options.height;
					 var ctx     = canvas.getContext('2d');

					 // compute tileW/tileH based on options.width/options.height
					 var tileW   = options.width  / qrcode.getModuleCount();
					 var tileH   = options.height / qrcode.getModuleCount();

					 // draw in the canvas
					 for( var row = 0; row < qrcode.getModuleCount(); row++ ){
						 for( var col = 0; col < qrcode.getModuleCount(); col++ ){
							 ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
							 var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
							 var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
							 ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);
						 }
					 }
					 // return just built canvas
					 return canvas;
				 }

				 // from Jon-Carlos Rivera (https://github.com/imbcmdth)
				 var createTable = function(){
					 // create the qrcode itself
					 var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
					 qrcode.addData(options.text);
					 qrcode.make();

					 // create table element
					 var table = document.createElement('table');
					 table.style.width  = options.width+"px";
					 table.style.height = options.height+"px";
					 table.style.border = "0px";
					 table.style.borderCollapse = "collapse";
					 table.style.backgroundColor = options.background;

					 // compute tileS percentage
					 var tileW   = options.width / qrcode.getModuleCount();
					 var tileH   = options.height / qrcode.getModuleCount();

					 // draw in the table
					 for(var row = 0; row < qrcode.getModuleCount(); row++ ){
						 var $row = $table.insertRow(-1);
						 row.style.height = tileH+"px";

						 for(var col = 0; col < qrcode.getModuleCount(); col++ ){
							 var $cell = $row.insertCell(-1);
							 cell.style.width = tileW+"px";
							 cell.style.backgroundColor =  qrcode.isDark(row, col) ? options.foreground : options.background;
						 }
					 }
					 // return just built canvas
					 return table;
				 }

				 var element = options.render == "canvas" ? createCanvas() : createTable();
				 return  targetEle.insertBefore(element, targetEle.firstChild);
		}
};



/***
 * 用来生成插件的js
 */
var tctip =  window.tctip || {
	/**
	 * 配置文件，包括基本信息，比如imagePrefix，btnId等。
	 * list配置因为较为复杂，单独拆分处理；处理完毕后加入myConfig
	 */
	myConfig : {
		imagePrefix	: "",
		cssPrefix		: "",
		/***
		 * 当staticPrefix不为空的时候,imagePrefix和cssPrefix失效
		 */
		staticPrefix	: "",
		buttonImageId	: "3",
		buttonTip		: "dashang",
		cssUrl:	"css/myRewards.css"
	},

	/***
	 * list默认配置，需要和用户传入的list整合，并且最后只保留五个
	 */
   listConfig:{
				'alipay'	: 	{icon: "img/alipay.png", name:"支付宝", desc: "支付宝打赏", className: ""},
				'tenpay'	: 	{icon: "img/tenpay.png", name:"财付通", desc: "财付通打赏", className:""},
				'weixin'	: 	{icon: "img/weixin.png", name:"微信", desc: "微信打赏", className:""},
				'bitcoin'	:   {icon: "img/bitcoin.png", name:"比特币", desc: "比特币打赏", className:""},
				'litecoin'	:   {icon: "img/litecoin.png", name:"莱特币", desc: "莱特币打赏",className:""},
				'dogecoin'	:   {icon: "img/dogecoin.png", name:"狗狗币", desc: "狗狗币打赏", className:""}
			},
	/***
	 * 根据默认配置和用户自定义配置生成最终使用配置文件
	 **/
	myRewards : null,
	myRewardsBtn : null,
	myRewardsMain:	null,
	myRewardsbox: null,
	myRewardsList:null,
	myRewardsDetail:null,
	myRewardsListUl: null,
	myRewardsUbox: null,

	/***
	 * 当前li。
	 * 鼠标切换的时候需要移除className
	 */
	currentLi:		null,
	/***
	 * 生成右侧二维码的当前数据
	 */
	currentData:	null,

	/**
	 * 根据imagePrefix和图片url拼接更完整url
	 * imagePrefix可为""
	 */
	imageUrl:	function(url){
					return tctipUtil.staticUrl(tctip.myConfig.staticPrefix || tctip.myConfig.imagePrefix, url);
				},

	/***
	 * 根据cssPrefix和cssurl拼接更完整url
	 * cssPrefix可为""
	 */
	cssUrl:	function(url){
					return tctipUtil.staticUrl(tctip.myConfig.staticPrefix || tctip.myConfig.cssPrefix, url);
				},
	/**
	 * 生成最左侧button 的Url
	 */
	buttonImageUrl: function(){
						var id = tctip.myConfig.buttonImageId;
						var tip = tctip.myConfig.buttonTip;
						return tctip.imageUrl("img/" + tip + "/tab_" + id + ".png");
				},

	/***
	 * 计算出配置文件
	 * **/
	generateMyConfig:	function(){
							tctip.myConfig = tctipUtil.mergeArray(tctip.myConfig, tctipConfig);
							var list = [];
							var num = 0;
							var hasOn = false;//是否存在显示二维码的list
							for(var key in tctipConfig.list){
								if(tctip.listConfig.hasOwnProperty(key)){
									var one = tctipUtil.mergeArray(tctip.listConfig[key], tctipConfig.list[key], true);
								}else{
									var one = tctipConfig.list[key];
								}
								if(one.className == "myR-on"){
									hasOn = true;
								}
								list.push(one);
								num += 1;
								if(num >= 5){
									break;
								}
							}

							if(hasOn == false){
								list[0].className = "myR-on";
							}

							tctip.myConfig.list = list;
						},

	generateMyRewards:	function(){

							this.myRewards  = tctipUtil.createElement({
								id:			"myRewards", 
								className: "myRewards",
								onmouseover : function(){
													tctip.showTctip(this);
												},
								onmouseout	: function(){
													tctip.hideTctip(this);
												}
								});
							this.generateLeftBtn();
							this.generateMyRewardsMain();
						},
	generateLeftBtn:	function(){
							this.myRewardsBtn = tctipUtil.createElement({className: "btn-myRewards", href: "javascript:;"}, 'a', this.myRewards);
							tctipUtil.createElement({className: "png", src: tctip.buttonImageUrl()}, 'img', this.myRewardsBtn);
	},

	/***
	 * 显示打赏插件
	 **/
	showTctip:			function(target){
							 var e = tctipUtil.currentEvent();
							 if(tctipUtil.isMouseLeaveOrEnter(e, target)){
								 tctipUtil.animate({width:"240px"}, tctip.myRewards, 200);
							 }
						},
	/***
	 * 隐藏打赏插件
	 **/
	hideTctip:			function(target){
							var e = tctipUtil.currentEvent();
							if(tctipUtil.isMouseLeaveOrEnter(e, target)){
								tctipUtil.animate({width:"0px"}, tctip.myRewards, 200);
							}
						},

	generateMyRewardsMain:	function(){
							this.myRewardsMain = tctipUtil.createElement({className: "myRewards-main"}, 'div', this.myRewards);
							var obj = {className: "myR-h"};
							obj[tctipUtil.getTextKey()] =  "喜欢请打赏";
							tctipUtil.createElement(obj, 'h1', this.myRewardsMain);

							this.generateMyRewardsbox();
							
							var myRewardsBot = tctipUtil.createElement({className: "myR-bot"}, 'p', this.myRewardsMain);
							obj = {href:"https://github.com/greedying/tctip", target: "_blank"};
							obj[tctipUtil.getTextKey()] =  "了解更多";
							tctipUtil.createElement(obj, 'a', myRewardsBot);
	},

	generateMyRewardsbox:	function(){
								this.myRewardsbox = tctipUtil.createElement({className: "myRewardsbox"},"div", this.myRewardsMain);
								this.generateMyRewardsList();
								this.generateMyRewardsDetail();
							},
	
	generateMyRewardsList:	function(){
								this.myRewardsList = tctipUtil.createElement({className: "myRewards-list"},"div", this.myRewardsbox);

								if(tctip.myConfig.list.length >= 5){
									this.myRewardsListUl = tctipUtil.createElement({}, 'ul', this.myRewardsList);
									//如果不足五行，新加一个class not-full
								}else{
									this.myRewardsListUl = tctipUtil.createElement({className: "not-full"}, 'ul', this.myRewardsList);
								}

							/***
								* 本来用的是for(var i in list)形式，
								* 但是发现有些网页会给array加一些默认属性，因此改为现在的循环形式
							***/
								for(var i= 0; i < 5; i++){
									if( ! tctip.myConfig.list.hasOwnProperty(i)){
										break;
									}
									var one		= tctip.myConfig.list[i];
									var li_el	= tctipUtil.createElement({className: one.className}, 'li', this.myRewardsListUl);
									var a_el	= null;
									/**用闭包方式动态绑定onmouseover 事件**/
									(function(){
										var tmp_one = one;
										var a_params = {
												href		:"javascript:;", 
												onmouseover : function(){
															tctip.leftMouseover(this, tmp_one);
															}
												};
											a_params[tctipUtil.getTextKey()] = one.name;
												/**第五个li增加fifth，去除boder-bottom*/
										if(i==4){
											a_params.className = "fifth";
										}
										a_el = tctipUtil.createElement(a_params, 'a', li_el);
									})();

									if(one.className == "myR-on"){
											this.currentLi	= li_el;
											this.currentData = one;
									}

									tctipUtil.createElement({className: "png", src: tctip.imageUrl(one.icon), alt:one.name}, 'img', a_el);
								}
							},
	generateMyRewardsDetail:function(){
								if(tctip.myRewardsDetail){
									tctip.myRewardsbox.removeChild(tctip.myRewardsDetail);
								}
								this.myRewardsDetail = tctipUtil.createElement({className: "myRewards-detail"},"div", this.myRewardsbox);

								this.myRewardsUbox = tctipUtil.createElement({className: "myRewards-ubox"},"div", this.myRewardsDetail);
								var obj = {className: "myRewards-code-tit"};
								obj[tctipUtil.getTextKey()] =  "扫描二维码打赏";
								tctipUtil.createElement(obj,"p", this.myRewardsUbox);
								var myRewardsCode = tctipUtil.createElement({className: "myRewards-code"}, 'div',  this.myRewardsUbox);
								if(tctip.currentData.hasOwnProperty('qrimg')){
									tctipUtil.createElement({src: tctip.imageUrl(tctip.currentData.qrimg)}, 'img',  myRewardsCode);

									obj = {className: "myRewards-account"};
									obj[tctipUtil.getTextKey()] = tctip.currentData.desc || tctip.currentData.name;
									var myRewardsAccount = tctipUtil.createElement(obj, "p", this.myRewardsUbox);
								}else if(tctip.currentData.hasOwnProperty('account')){
									 //生成二维码过程
									 tctipUtil.generateQR({
											render  : tctipUtil.isSupportCanvas() ? "canvas" : "table",
											text    : tctip.currentData.account,
											width   : 106,
											height  : 106}, myRewardsCode);
									/**生成二维码**/

									obj = {className: "myRewards-account"};
									obj[tctipUtil.getTextKey()] = tctip.currentData.desc || tctip.currentData.name;
									var myRewardsAccount = tctipUtil.createElement(obj, "p", this.myRewardsUbox);
									obj = {};
									obj[tctipUtil.getTextKey()] = tctip.currentData.account;
									tctipUtil.createElement({}, "br", myRewardsAccount);
									tctipUtil.createElement(obj, "span", myRewardsAccount);
								}
							},
/***
 * 左侧鼠标滑过的效果
 * param element: 当前对象
 * param data 结构如下
 * {img: "img/bitcoin.png", name:"比特币", className:""}
 */
	 leftMouseover	:	function(element, data){
							tctip.currentLi.className = "";
							element.parentNode.className = "myR-on";
							tctip.currentLi = element.parentNode;
							tctip.currentData = data;
							tctip.generateMyRewardsDetail();
	},

	/***
	 * 引入css文件
	 **/
	
	loadCss:	function(){
						tctipUtil.createElement({type: "text/css",rel: "stylesheet", href: tctip.cssUrl(tctip.myConfig.cssUrl)}, "link");
				},
	stat:		function(){
					tctipUtil.createElement({src: "http://stat.tctip.com/stat/index"}, "script");
				},
	
	init:		function(){
					if(!document.body){
						/**判断body是否存在，如果不存在则等待完成**/
						setTimeout(tctip.init,0);
					}else{
						tctip.generateMyConfig();
						tctip.loadCss();
						tctip.generateMyRewards();
						tctip.stat();
					}
		}
};
tctip.init();
