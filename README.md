tctip项目介绍
========

##tctip是什么？

tctip是一款js打赏插件
部署后在网站右侧中间位置生成一个打赏区域    
用户通过插件扫描二维码进行打赏  

##tcitp现在有哪些网站使用？
以下是一些早期用户，感谢他们在项目早期的支持    

* http://joway.wang/message.html  
* http://www.11what.com/  
* http://www.axhmei.com/  
* http://blog.liuyang.cf  

##使用流程

1. 网站部署tctip
2. 生成打赏侧边栏
3. 用户扫描二维码
4. 网站获得奖赏

##适用网站

+ 个人博客  
+ 问答网站 
+ 其他你觉得合适的网站  


##tctip提供哪些打赏方式？
+ 支付宝，默认提供
+ 财付通, 默认提供
+ 微信，默认提供
+ 比特币，默认提供
+ 来特币，默认提供
+ 其他，可自定义，需要在配置中提供icon图标地址和描述字段


##如何使用和部署tctip？

将以下js代码放到网页结尾，一般是放到`</body>`之前，以保证最好的兼容性

```javascript
<script>
window.tctipConfig = {
  staticPrefix: 'http://static.tctip.com',
  buttonImageId: 1,
  buttonTip: 'zanzhu',
  list:{
	alipay: {
      qrimg: 'http://tctip.com/img/alipayqr.png'
    },
	weixin: {
      qrimg: 'http://littlebtc.com/images/yeshen.png'
    }
  }
}
</script>
<script src="http://static.tctip.com/js/tctip.min.js"></script>
```
更详细的使用说明请参阅**sample.html**中的示例和注解

##有没有办法预览插件效果图？
example_pic文件夹内有各大网站使用插件的效果截图
您也可以提供网址，作者提供效果截图

##联系方式
进一步交流，欢迎加入qq群`188087193`

##最后的最后
* 作者并非专业js人员，所写代码不足之处颇多，欢迎PR
* 如果您觉得本插件对您有所帮助，欢迎打赏作者
