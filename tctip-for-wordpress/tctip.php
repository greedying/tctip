<?php  
/*
 * Plugin Name: tctip
 * Plugin URI: github.com/greedying/tctip
 * Description: 此插件将在窗口右侧，显示一个侧边栏
 * Version: 1.0.0
 * Author: vincent
 * Author URI: http://tctip.com/
 * * License: GPL
 * */

/* 注册激活插件时要调用的函数 */ 
register_activation_hook( __FILE__, 'tctip_install');   

/* 注册停用插件时要调用的函数 */ 
register_deactivation_hook( __FILE__, 'tctip_remove' );  

function tctip_install() {  
	/* 在数据库的 wp_options 表中添加一条记录，第二个参数为默认值,
	 * 第三个参数弃用，为空即可，第四个参数为是否需要被wp_load_alloptions函数自动加载，yes or no，默认为yes
	 * */ 
	add_option("buttonImageId", "8", '', 'yes');  
	add_option("alipayAccount");
	add_option("alipayQrimg");
}

function tctip_remove() {  
	/* 删除 wp_options 表中的对应记录 */ 
	delete_option("buttonImageId");
	delete_option("alipayAccount");
	delete_option("alipayQrimg");
}



if( is_admin() ) {
	/*  利用 admin_menu 钩子，添加菜单 */
	add_action('admin_menu', 'display_tctip_menu');
}

function display_tctip_menu() {
	/* add_options_page( $page_title, $menu_title, $capability, $menu_slug, $function);  */
	/* 页名称，菜单名称，访问级别，菜单slug别名，点击该菜单时的回调函数（用以显示设置页面） */
	//	add_options_page('tctip打赏插件设置页面', 'tctip插件设置', 'administrator','tctip_setting', 'show_tctip_setting_page');
	//	应该是add_submenu_page的一种


	//add_submenu_page( $parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function ); 
	//$parent_slug：（字符串） （必须）顶级菜单名称，可以在顶级菜单中加入我们的子菜单，也可以在自定义顶级菜单中加入子菜单；
	//$page_title：（字符串） （必须） 这个参数是子菜单的标题，将会显示在浏览器的标题栏，默认为空；
	//$menu_title：（字符串） （必须） 显示的菜单名称，默认为空；
	//$capability：（字符串） （必须） 用户权限，定义了具有哪些权限的用户会看到这个子菜单（权限部分请看文章结尾处），默认为空，参照capability；
	//$menu_slug：（字符串） （必须） 显示在URl上面的菜单名称，默认为空；
	//$function：所有调用的函数名称，通过调用这个函数来显示这个子菜单页面的内容。
	add_submenu_page('plugins.php', 'tctip打赏插件设置页面', 'tctip插件设置', 'administrator','tctip_setting', 'show_tctip_setting_page');
}

function show_tctip_setting_page() {
?>

<?php if(!empty($_POST) && check_admin_referer('update_options')):?>
		<?php 
	//本页接受post请求
			update_option('buttonImageId', $_POST['buttonImageId']);
			update_option('buttonTip', $_POST['buttonTip']);
			update_option('alipayAccount', $_POST['alipayAccount']);
			update_option('alipayQrimg', $_POST['alipayQrimg']);
			update_option('weixinQrimg', $_POST['weixinQrimg']);
			update_option('tenpayAccount', $_POST['tenpayAccount']);
			update_option('bitcoinAddress', $_POST['bitcoinAddress']);
		?>
        <div id="message" class="updated">
            <p><strong style="color:red;">设置成功</strong></p>
        </div>
<?php endif?>
     
	<div class="wrap">  
		<?php screen_icon();?>
		<h2>tctip插件设置</h2>  
		<p>欢迎使用tctip插件，您可以在这里做一些个性化的设置</p>
		<p>您可以选择按钮的颜色，选择支付方式，选择传入二维码图片还是账号</p>
		<form method="post" action="">  
			<?php /* 下面这行代码用来生成随机数，保障表单安全 ** */ ?>  
			<?php wp_nonce_field('update_options'); ?>  
			<h3>请选择您喜欢的button颜色</h3>
			<div style="height:100px">  
				<ul>
			<?php for($i=1; $i <=9; $i++):?>
					<li style="float:left;">
						<input type="radio" name="buttonImageId" value="<?php echo $i?>" <?php if(get_option('buttonImageId')==$i) echo 'checked'?>><img style="margin-right:50px;"src="http://static.tctip.com/img/zanzhu/tab_<?php echo $i?>.png">
					</li>
			<?php endfor;?>
				</ul>
			</div>  

			<h3>请选择显示button字样(打赏 or 赞助)</h3>
			<div style="height:100px">  
				<ul>
					<li style="float:left;">
						<input type="radio" name="buttonTip" value="dashang" <?php if(get_option('buttonTip')=='dashang') echo 'checked'?>><img style="margin-right:50px;"src="http://static.tctip.com/img/dashang/tab_3.png">
					</li>
					<li style="float:left;">
						<input type="radio" name="buttonTip" value="zanzhu" <?php if(get_option('buttonTip')=='zanzhu') echo 'checked'?>><img style="margin-right:50px;"src="http://static.tctip.com/img/zanzhu/tab_3.png">
					</li>
				</ul>
			</div>  
<style>
	input[type=text]{width: 300px;}
	label {display:inline-block; width:200px;}
</style>
			<h3>请选择一种或多种打赏方式</h3>
			<p>其中支付宝您可以选择输入支付宝账号，或者输入支付宝收款二维码的图片链接</p>
			<p>其他打赏方式请按照提示输入账号地址或者二维码图片链接</p>

			<p> 
				<label>输入支付宝账号：</label>
				<input type="text" name="alipayAccount" id="alipayAccount" value="<?php echo get_option('alipayAccount')?>">
			</p>
			<p> 
				<label>支付宝收款二维码：</label>
				<input type="text" name="alipayQrimg" id="alipayQrimg" value="<?php echo get_option('alipayQrimg')?>">
			</p>
		
			<p> 
				<label>微信收款二维码：</label>
				<input type="text" name="weixinQrimg" id="weixinQrimg" value="<?php echo get_option('weixinQrimg')?>">
			</p>
			<p> 
				<label>财付通账号：</label>
				<input type="text" name="tenpayAccount" id="tenpayAccount" value="<?php echo get_option('tenpayAccount')?>">
			</p>
			<p> 
				<label>比特币地址：</label>
				<input type="text" name="bitcoinAddress" id="bitcoinAddress" value="<?php echo get_option('bitcoinAddress')?>">
			</p>

			<div class="submit">  
				<input type="submit" name="submit" value="Save" class="button-primary" />  
			</div>  
		</form>  
	</div>  
<?php  
}  

add_action('wp_footer', 'tctip_init');
function tctip_init(){
	$tctipConfig = array(
		'staticPrefix'	=> 'http://static.tctip.com',
	);

	$buttonImageId = get_option('buttonImageId');
	if($buttonImageId){
		$tctipConfig['buttonImageId'] = get_option('buttonImageId');
	}

	$buttonTip = get_option('buttonTip');
	if($buttonTip){
		$tctipConfig['buttonTip'] = get_option('buttonTip');
	}

	$list = array();
	$alipayQrimg = get_option('alipayQrimg');
	$alipayAccount = get_option('alipayAccount');
	if($alipayQrimg){
		$list['alipay'] = array('qrimg' => get_option('alipayQrimg'));
	}elseif($alipayAccount){
		$list['alipay'] = array('account' => get_option('alipayAccount'));
	}

	$tenpayAccount = get_option('tenpayAccount');
	if($tenpayAccount){
		$list['tenpay'] = array('account' => get_option('tenpayAccount'));
	}

	$weixinQrimg = get_option('weixinQrimg');
	if($weixinQrimg){
		$list['weixin'] = array('qrimg' => get_option('weixinQrimg'));
	}

	$bitcoinAddress = get_option('bitcoinAddress');
	if($bitcoinAddress){
		$list['bitcoin'] = array('account' => get_option('bitcoinAddress'));
	}

	$tctipConfig['list'] = $list;
	echo "<script>window.tctipConfig =" . json_encode($tctipConfig) . "</script>";
	echo "<script src='http://tctip.com/js/tctip.min.js'></script>";
}
