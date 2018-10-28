(function() {
	var boxStyle = '\
.highlighter-code-box {\
    background: #F1F1F1;\
    position: fixed;\
    left: 32% ;\
    top: 50% ;\
    border: 1px solid #999;\
    width: 900px;\
    height: auto;\
    margin: -210px 0 0 -230px;\
    line-height: 25px;\
    border-radius: 3px 3px 0 0;\
	z-index:9999;\
}\
.highlighter-code-box-title{\
    height: 25px;\
    background: #444;\
    color: #fff;\
    text-align: center;\
\
    vertical-align: baseline;\
    font-family: Arial,Verdana;\
    font-size: 11px;\
    \
}\
.highlighter-code-box-toolbar{\
    padding: 5px 15px;\
}\
.highlighter-code-input{\
    width: 430px;\
    height: 310px;\
    font-family: "Courier New", Courier, mono;\
    font-size: 12px;\
    border: 1px solid #DFDFDF;\
    margin: 0 auto;\
    display: block;\
    resize: none;\
}\
.highlighter-code-box-bottombar{\
    text-align: right;\
    padding: 5px 15px;\
}\
.highlighter-code-box-bottombar input{\
    border: 1px solid #BBB;\
    margin: 0;\
    padding: 0 0 1px;\
    font-weight: bold;\
    font-size: 11px;\
    width: 94px;\
    height: 24px;\
    color: black;\
    cursor: pointer;\
    border-radius: 3px;\
    background-color: #EEE;\
    background-image: -ms-linear-gradient(bottom, #DDD, white);\
    background-image: -moz-linear-gradient(bottom, #DDD, white);\
    background-image: -o-linear-gradient(bottom, #DDD, white);\
    background-image: -webkit-gradient(linear, left bottom, left top, from(#DDD), to(white));\
    background-image: -webkit-linear-gradient(bottom, #DDD, white);\
    background-image: linear-gradient(bottom, #DDD, white);\
}\
.highlighter-code-box-bottombar input:hover{\
    border: 1px solid #555;\
}\
.dl_links .del {display: none;position: absolute;right: 15px;opacity: .6;}\
.col-lg-2 {float: left;margin-right: 10px;}\
.col-lg-6 {float: left;margin-right: 10px;}\
.col-lg-6 input {width: 350px;}\
.col-lg-6.mce-widget.mce-btn {margin-left: 20px;left: 645px;}\
.inpadding {padding: 16px;position: relative;overflow: hidden;}\
.info {padding: 20px 16px 40px 16px;}\
.info input {width: 100%;}\
.magnetld {padding: 20px 16px 40px 16px;}\
.magnetld input {width: 100%;}\
';

	var boxTemplate = '\
<div class="mce-reset dl_links" role="application">\
<div class="mce-window-head">\
<div class="mce-title">本下载框由dlbox插件生成</div>\
<button type="button" id="codeCancelButton" class="mce-close" aria-hidden="true"><i class="mce-ico mce-i-remove"></i></button>\
</div>\
<div class="mce-container-body mce-abs-layout">\
	<div class="inpadding magnetld info mce-container mce-first mce-formitem">\
	<div class="mce-container-body mce-abs-layout" >\
	<div class="mce-abs-end"></div>\
	<div style="padding-bottom: 50px;"><input class="dl_title mce-textbox mce-abs-layout-item mce-last" placeholder="文件大小（）" ></div>\
	<div style="padding-bottom: 50px;"><input class="dl_info mce-textbox mce-abs-layout-item mce-last" placeholder="来源" ></div>\
	<div><input class="dl_magnet mce-textbox mce-abs-layout-item mce-last" placeholder="磁力链接（可选）" ></div>\
	</div>\
	</div>\
	<div class="mce-abs-end"></div>\
	<div class="row inpadding" data-id="0" >\
		<a href="javascript:;" class="del mce-ico mce-i-remove" title="删除此条目" ></a>\
		<div class="col-lg-2">\
				<input type="text" class="mce-textbox  mce-last dl_name" placeholder="名称">\
			</div>\
			<div class="col-lg-6">\
				<input type="url" class="mce-textbox  mce-last dl_url" placeholder="下载地址">\
			</div>\
			<div class="col-lg-2">\
				<input type="text" class="mce-textbox  mce-last dl_tq" placeholder="提取码（可选）">\
			</div>\
			<div class="col-lg-2">\
				<input type="text" class="mce-textbox  mce-last dl_pw" placeholder="解压密码（可选）">\
			</div>\
	</div>\
		<div id="mce-container mce-panel mce-foot dl_action" style="overflow: hidden;padding: 20px 0 20px 0;">\
			<div class="mce-container-body mce-abs-layout">\
			<div class="mce-abs-end"></div>\
				<div class="col-lg-6 mce-widget mce-btn mce-last mce-btn-has-text">\
					<button id="add" role="presentation" type="button" tabindex="-1" style="height: 100%; width: 100%;"><span class="mce-txt">添加新链接</span></button>\
				</div>\
				<div class="col-lg-6 mce-widget mce-btn mce-first mce-btn-has-text">\
					<button id="push" role="presentation" type="button" tabindex="-1" style="height: 100%; width: 100%;"><span class="mce-txt">插入链接到文章</span></button>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>\
				';

	var languages = {
		Markup: 'markup',
		Css: 'css',
		JavaScript: 'js',
		Php: 'php'
	}
	var codeBox = {
		create: function() {

			var styleNode = document.createElement('style');
			styleNode.innerHTML = boxStyle;
			document.getElementsByTagName('head')[0].appendChild(styleNode);

			this._dom = document.createElement('div');
			this._dom.setAttribute('class', 'highlighter-code-box mce-container mce-panel mce-floatpanel mce-window mce-in');
			this._dom.innerHTML = boxTemplate;
			document.body.appendChild(this._dom);
			this._init = true;
			var that = this;
			var language = this.language = document.getElementById('codeLanguage');
			var textarea = this.textarea = document.getElementById('codeInput');
			var cancel = document.getElementById('codeCancelButton');
			var insert = document.getElementById('codeInsertButton');
			var html = '';
			for (var i in languages) {
				html += '<option value="' + languages[i] + '">' + i + '</option>';
			}

			cancel.onclick = function() {
				that.hide();
			}
/*
        insert.onclick = function(){
            var text = textarea.value;
            var lan = language.value;
            //var label = language.options[language.selectedIndex].innerHTML;
            text = text.replace(/&/g, '&amp;');							// &转html实体
            text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');	// 转html实体
            text = '<pre><code  class="language-' + lan + '">' + text + '</code></pre>';
            that._action && that._action(text);
            that.hide();
            if(localStorage){
                localStorage['lastLanguage'] = lan;
            }
        }
		*/
		},

		show: function(action) {
			if (!this._init) {
				this.create();
			}
			// this.textarea.value = '';
			this._action = action;
			//if(localStorage && localStorage['lastLanguage']){
			//    this.language.value = localStorage['lastLanguage'];
			//}
			this._dom.style.display = 'block';
		},
		hide: function() {
			this._action = null;
			this._dom.style.display = 'none';
		}

	};
	tinymce.PluginManager.add('specs_code_plugin', function(editor, url) {
		editor.addButton('specs_code_plugin', {
			text: '下载面板',
			icon: false,
			onclick: function() {
				codeBox.show(function(text) {
					//editor.selection.setContent(editor.selection.getContent() + text );
				});
				jQuery('.del').click(function() {
					if (jQuery(".dl_links .row").length != 1) {
						if (jQuery(".dl_links .row").length == 2) {
							jQuery('.del').hide();
						}
						jQuery(this).parent('.row').remove();
					}
				});
				var index = 1;
				jQuery('#add').click(function() {
					var $m = jQuery('[data-id="0"]').clone(true).attr('data-id', index++);
					jQuery('[data-id]:last').after($m);
					jQuery('.del').show();
					console.log('add');
				});
				jQuery('#push').click(function() {
					var title_data = '';
					var magnet_data = '';
					var pw_data = '';
					var link_data = '';
					var tq_data = '';
					var dl_data = '';
					name_array = [];
					url_array = [];
					tq_array = [];
					pw_array = [];

					function getNowFormatDate() {
						var date = new Date();
						var seperator1 = "-";
						var seperator2 = ":";
						var year = date.getFullYear();
						var month = date.getMonth() + 1;
						var strDate = date.getDate();
						if (month >= 1 && month <= 9) {
							month = "0" + month;
						}
						if (strDate >= 0 && strDate <= 9) {
							strDate = "0" + strDate;
						}
						var currentdate = year + "年" + month + "月" + strDate + "日";
						return currentdate;
					}
					jQuery(".dl_title").each(function() {
						title_data = jQuery(this).val();
					})
					jQuery(".dl_info").each(function() {
						info_data = jQuery(this).val();
					})
					jQuery(".dl_magnet").each(function() {
						magnet_data = jQuery(this).val();
					})
					jQuery(".dl_name").each(function() {
						name_array.push(jQuery(this).val());
					})
					jQuery(".dl_url").each(function() {
						url_array.push(jQuery(this).val());
					})
					jQuery(".dl_tq").each(function() {
						tq_array.push(jQuery(this).val());
					})
					jQuery(".dl_pw").each(function() {
						pw_array.push(jQuery(this).val());
					})
					if (title_data.length = 0 || title_data == "" || title_data == undefined || title_data == null) {
						title_data = '下载地址';
					}
					for (x = 0; x < tq_array.length; x++) {
						if (x == 0) {
							var jg = '';
						} else(jg = '')
						tq_data = tq_data + jg + tq_array[x];
					}
					for (x = 0; x < url_array.length; x++) {
						link_data = link_data + '<a href="'+url_array[x]+'" target="_blank" style="display: inline;">'+ name_array[x] + '</a>';
					}
					for (x = 0; x < pw_array.length; x++) {
						if (x == 0) {
							var jg = '';
						} else(jg = '')
						pw_data = pw_data + jg + pw_array[x];
					}
					dl_data = '[hj_dlbox b=\'' + info_data + '\' c=\'' + getNowFormatDate() + '\' d=\'提取：' + tq_data + ' / 解压：' + pw_data + '\' e=\'' + magnet_data + '\' f=\'' + title_data+'\']' + link_data + '[/hj_dlbox]\n';
					editor.insertContent(dl_data);
					jQuery(".highlighter-code-box").hide();
					dl_data = '';
				})
			}
		});
	});

})();



