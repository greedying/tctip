tctip
========
谢谢原作者的代码，很方便。为了结合我的项目。
对原来作者项目调整如下：

* 去掉二维码生成代码部分，直接采用原作者的二维码图片功能
* 去掉静态文件的相对路径设置，直接使用静态文件的路径
* 去掉图片设置的样式，采用css，减小插件的大小
* 添加公告栏形式的内容(支持html代码)
* 添加侧边栏文本可配置项
* 添加侧边栏文本背景颜色可配置项
* 添加侧边栏文本高度可配置项
* 添加最上面文本可配置项
* 添加整个侧边栏高度可配置项
* 添加底部文字和链接可配置项

简而言之，简化、优化并添加配置项。

========
##tctip是什么？
tctip是一款js的插件  
用户通过插件扫描二维码或者复制账号，对网站的优质内容进行打赏  

##tcitp现在有哪些网站使用？
以下是一些早期用户，感谢他们在项目早期的支持
    * http://joway.wang/message.html
	* http://www.11what.com/
	* http://www.axhmei.com/
	* http://blog.liuyang.cf

流程大体如下：
**网站部署tctip**->**生成打赏侧边栏**->**用户扫描二维码**->**网站获得奖赏**

##tctip适用于什么样的网站？
tctip的目的是提供一个方面的工具，让用户对网站优质内容打赏
所以比较适合的网站是**具有优质内容的网站**，比如**科技博客**，**问答网站**等等

##tctip提供哪些打赏方式？
	只要可以二维码扫码就支持

##如何使用和部署tctip(该部分的配置和原作者不一样)
	网站站长可以将tctip的所有静态文件拷贝到自己服务器使用  
	也可以使用作者提供的静态文件库，此时staticPath需要设置为`http://static.tctip.com`,网站主不需要下载任何文件即可以使用插件  

	但无论使用何处的静态文件，网站长都需要将类似如下的js放到网页内
	**我们推荐将如下js放到 `</body>`之前，以保证最好的兼容性

	```javascript
	<script>
        window.tctipConfig = {
            //最上面的文字
            headText: "欢迎打赏支持我 ^_^",
            //侧边栏文本
            siderText: "公告 & 打赏",
            //侧边栏文本高度调整
            siderTextTop: "-80px",
            //侧边栏背景颜色
            siderBgcolor: "#323d45",
            //整个侧边栏的高度设置可以px，em，或百分比
            siderTop:"120px",
            //底部文字
            buttomText:"了解更多",
            //底部文字链接
            buttomLink:"https://github.com/haddyyang/tctip",

            //显示项
            list:{
                notice: {icon: "img/icon/tip.png", name:"公告栏", className:"myR-on", text: '这是公告内容,这是公告内容,这是公告内容,<b style="color:red;">这是公告内容</b>,这是公告内容,这是公告内容,这是公告内容'},
                alipay: {icon: "img/icon/alipay.png", name:"支付宝", desc: "支付宝打赏", qrimg: "img/qr/alipayqr.png"},
                weixin: {icon: "img/icon/weixin.png", name:"微信", desc: "微信打赏", qrimg: "img/qr/alipayqr.png"}	
            }
        };
    </script>
    <script src="js/tctip.min.js"></script>
	```
	更详细的使用说明请参阅**sample.html**中的示例和注解

##联系方式
由于原作者和本项目作者并非专业js人员，所写代码会有不足之处
且本职工作较为繁忙，所以功能上也有很多亟待补充的地方  
进一步交流，欢迎加入qq群`188087193`

##最后的最后
	如果您觉得本插件对您有所帮助，欢迎对sample.html中任意一种支付方式的二维码进行打赏，不尽感激
	如果您愿意为项目的发展提供长期的帮助或者合作，请联系作者