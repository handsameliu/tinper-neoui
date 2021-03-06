/**
 * Module : neoui-dialog
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 15:29:55
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass,removeClass,hasClass,getStyle,makeDOM,makeModal} from 'tinper-sparrow/js/dom';
import {on,stopEvent,trigger} from 'tinper-sparrow/js/event';
import {extend} from 'tinper-sparrow/js/extend';
import {Button} from './neoui-button';
import {compMgr} from 'tinper-sparrow/js/compMgr';

/**
 * messageDialog.js
 */

'use strict';

/**
 * 消息提示框
 * @param options
 */

var messageDialogTemplate = '<div class="u-msg-dialog">' +
	'<div class="u-msg-title">' +
	'<h4>{title}</h4>' +
	'</div>' +
	'<div class="u-msg-content">' +
	'<p>{msg}</p>' +
	'</div>' +
	'<div class="u-msg-footer only-one-btn"><button class="u-msg-button u-button u-button-primary raised">{btnText}</button></div>' +
	'</div>';

var messageDialog = function(options) {
	var title, msg, btnText, template;
	if(typeof options === 'string') {
		options = {
			msg: options
		};
	}
	msg = options['msg'] || "";
	title = options['title'] || "提示";
	btnText = options['btnText'] || "确定";
	template = options['template'] || messageDialogTemplate;

	template = template.replace('{msg}', msg);
	template = template.replace('{title}', title);
	template = template.replace('{btnText}', btnText);

	var msgDom = makeDOM(template);

	var closeBtn = msgDom.querySelector('.u-msg-button');
	new Button({
		el: closeBtn
	});
	on(closeBtn, 'click', function() {
		document.body.removeChild(msgDom);
		document.body.removeChild(overlayDiv);
		enable_mouseWheel();
	})
	var overlayDiv = makeModal(msgDom);
	document.body.appendChild(msgDom);
    disable_mouseWheel();
	this.resizeFun = function() {
		var cDom = msgDom.querySelector('.u-msg-content');
		if(!cDom) return;
		cDom.style.height = '';
		var wholeHeight = msgDom.offsetHeight;
		var contentHeight = msgDom.scrollHeight;
		if(contentHeight > wholeHeight && cDom)
			cDom.style.height = wholeHeight - (56 + 46) + 'px';

	}.bind(this);

	this.resizeFun();
	on(window, 'resize', this.resizeFun);
};

/**
 * Module : confirmDialog
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-29 10:21:33
 */
var confirmDialogTemplate = '<div class="u-msg-dialog">' +
	'<div class="u-msg-title">' +
	'<h4>{title}</h4>' +
	'</div>' +
	'<div class="u-msg-content">' +
	'<p>{msg}</p>' +
	'</div>' +
	'<div class="u-msg-footer"><button class="u-msg-ok u-button u-button-primary raised">{okText}</button><button class="u-msg-cancel u-button">{cancelText}</button></div>' +
	'</div>';

var confirmDialog = function(options) {
	var title, msg, okText, cancelText, template, onOk, onCancel;
	msg = options['msg'] || "";
	title = options['title'] || "确认";
	okText = options['okText'] || "确定";
	cancelText = options['cancelText'] || "取消";
	onOk = options['onOk'] || function() {};
	onCancel = options['onCancel'] || function() {};
	template = options['template'] || confirmDialogTemplate;

	template = template.replace('{msg}', msg);
	template = template.replace('{title}', title);
	template = template.replace('{okText}', okText);
	template = template.replace('{cancelText}', cancelText);

	var msgDom = makeDOM(template);
	var okBtn = msgDom.querySelector('.u-msg-ok');
	var cancelBtn = msgDom.querySelector('.u-msg-cancel');
	new Button({
		el: okBtn
	});
	new Button({
		el: cancelBtn
	});
	on(okBtn, 'click', function() {
		if(onOk() !== false) {
			document.body.removeChild(msgDom);
			document.body.removeChild(overlayDiv);
			enable_mouseWheel();
		}
	})
	on(cancelBtn, 'click', function() {
		if(onCancel() !== false) {
			document.body.removeChild(msgDom);
			document.body.removeChild(overlayDiv);
			enable_mouseWheel();
		}
	})
	var overlayDiv = makeModal(msgDom);
	document.body.appendChild(msgDom);
	disable_mouseWheel();

	this.resizeFun = function() {
		var cDom = msgDom.querySelector('.u-msg-content');
		if(!cDom) return;
		cDom.style.height = '';
		var wholeHeight = msgDom.offsetHeight;
		var contentHeight = msgDom.scrollHeight;
		if(contentHeight > wholeHeight && cDom)
			cDom.style.height = wholeHeight - (56 + 46) + 'px';

	}.bind(this);

	this.resizeFun();
	on(window, 'resize', this.resizeFun);

};

/**
 * Created by dingrf on 2015-11-19.
 */

/**
 * 三按钮确认框（是 否  取消）
 */
var threeBtnDialog = function() {

}
/**
 * 禁用鼠标滚轮事件
 * @return {[type]} [description]
 */
var disable_mouseWheel = function () {
	if (document.addEventListener) {
	  document.addEventListener('DOMMouseScroll', scrollFunc, false);
	}
	window.onmousewheel = document.onmousewheel = scrollFunc;
};
/**
 * 事件禁用
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
var scrollFunc = function (evt) {
  evt = evt || window.event;
    if(evt.preventDefault) {
    // Firefox
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      // IE
      evt.cancelBubble=true;
      evt.returnValue = false;
  }
  return false;
};

/**
 * 开启鼠标滚轮事件
 * @return {[type]} [description]
 */
var enable_mouseWheel = function () {
	if (document.removeEventListener) {
	  document.removeEventListener('DOMMouseScroll', scrollFunc, false);
	}
	window.onmousewheel = document.onmousewheel = null;
};

/**
 * dialog.js
 */

var dialogTemplate = '<div class="u-msg-dialog" id="{id}" style="{width}{height}">' +
	'{close}' +
	'</div>';

var dialogMode = function(options) {
	if(typeof options === 'string') {
		options = {
			content: options
		};
	}
	var defaultOptions = {
		id: '',
		content: '',
		hasCloseMenu: true,
		template: dialogTemplate,
		width: '',
		height: ''
	}

	options = extend(defaultOptions, options);
	this.id = options['id'];
	this.hasCloseMenu = options['hasCloseMenu'];
	this.content = options['content'];
	this.template = options['template'];
	this.width = options['width'];
	this.height = options['height'];
	this.lazyShow = options['lazyShow'];
	this.closeFun = options['closeFun'];
	this.create();

	this.resizeFun = function() {
		var cDom = this.contentDom.querySelector('.u-msg-content');
		cDom.style.height = '';
		var wholeHeight = this.templateDom.offsetHeight;
		var contentHeight = this.contentDom.offsetHeight;
		if(contentHeight > wholeHeight && cDom)
			cDom.style.height = wholeHeight - (56 + 46) + 'px';

	}.bind(this);

	this.resizeFun();
	on(window, 'resize', this.resizeFun);
}

dialogMode.prototype.create = function() {
	var closeStr = '';
	var oThis = this;
	if(this.hasCloseMenu) {
		var closeStr = '<div class="u-msg-close"> <span aria-hidden="true">&times;</span></div>';
	}
	var templateStr = this.template.replace('{id}', this.id);
	templateStr = templateStr.replace('{close}', closeStr);
	templateStr = templateStr.replace('{width}', this.width ? 'width:' + this.width + ';' : '');
	templateStr = templateStr.replace('{height}', this.height ? 'height:' + this.height + ';' : '');

	var htmlReg = /^(\s*)?<[a-zA-Z]+/ig;
	var selectReg = /^(\.|#)/;
	if(htmlReg.test(this.content)){
		this.contentDom= makeDOM(this.content);
		this.contentDomParent = this.contentDom.parentNode;
		this.contentDom.style.display = 'block';
	}else if(selectReg.test(this.content)){
		this.contentDom = document.querySelector(this.content);
		this.contentDomParent = this.contentDom.parentNode;
		this.contentDom.style.display = 'block';
	}else{
		this.contentDom = makeDOM('<div><div class="u-msg-content"><p>' + this.content + '</p></div></div>');
	}
	this.templateDom = makeDOM(templateStr);

	/*this.contentDom = document.querySelector(this.content); //
	this.templateDom = makeDOM(templateStr);
	if(this.contentDom) { // msg第一种方式传入选择器，如果可以查找到对应dom节点，则创建整体dialog之后在msg位置添加dom元素
		this.contentDomParent = this.contentDom.parentNode;
		this.contentDom.style.display = 'block';
	} else { // 如果查找不到对应dom节点，则按照字符串处理，直接将msg拼到template之后创建dialog
		this.contentDom = makeDOM('<div><div class="u-msg-content"><p>' + this.content + '</p></div></div>');
	}*/
	this.templateDom.appendChild(this.contentDom);
	this.overlayDiv = makeModal(this.templateDom);
	if(this.hasCloseMenu) {
		this.closeDiv = this.templateDom.querySelector('.u-msg-close');
		on(this.closeDiv, 'click', function() {
			oThis.close();
		});
	}
	if(this.lazyShow) {
		this.templateDom.style.display = 'none';
		this.overlayDiv.style.display = 'none';
	}
	document.body.appendChild(this.templateDom);
	disable_mouseWheel();
	this.isClosed = false;
};

dialogMode.prototype.show = function() {
	if(this.isClosed) {
		this.create();
	}
	this.templateDom.style.display = 'block';
	this.overlayDiv.style.display = 'block';
	disable_mouseWheel();
}

dialogMode.prototype.hide = function() {
	this.templateDom.style.display = 'none';
	this.overlayDiv.style.display = 'none';
	enable_mouseWheel();
}

dialogMode.prototype.close = function() {
	this.closeFun && this.closeFun.call(this);
	if(this.contentDom) {
		this.contentDom.style.display = 'none';
		this.contentDomParent && this.contentDomParent.appendChild(this.contentDom);
	}
	document.body.removeChild(this.templateDom);
	document.body.removeChild(this.overlayDiv);
	this.isClosed = true;
		enable_mouseWheel();
}


var dialog = function(options) {
	return new dialogMode(options);
}

/**
 * 对话框向导
 * @param options:  {dialogs: [{content:".J-goods-pro-add-1-dialog",hasCloseMenu:false},
                               {content:".J-goods-pro-add-2-dialog",hasCloseMenu:false},
                            ]
                    }
 */
var dialogWizard = function(options) {
	var dialogs = [],
		curIndex = 0;
	options.dialogs = options.dialogs || [],
		len = options.dialogs.length;
	if(len == 0) {
		throw new Error('未加入对话框');
	}
	for(var i = 0; i < len; i++) {
		dialogs.push(dialog(extend(options.dialogs[i], {
			lazyShow: true
		})));
	}
	var wizard = function() {}
	wizard.prototype.show = function() {
		dialogs[curIndex].show();
		disable_mouseWheel();
	}
	wizard.prototype.next = function() {
		dialogs[curIndex].hide();
		dialogs[++curIndex].show();
	}
	wizard.prototype.prev = function() {
		dialogs[curIndex].hide();
		dialogs[--curIndex].show();
	}
	wizard.prototype.close = function() {
		for(var i = 0; i < len; i++) {
			dialogs[i].close();
		}
		enable_mouseWheel();
	}
	return new wizard();
}


/**
 * Module : iframeDialog
 * Author : wh(wanghaoo@yonyou.com)
 * Date	  : 2016-09-8 9:33
 */
var iframeDialogTemplate = '<div class="u-msg-dialog u-iframe-dialog" style="{width}{height}{top}">' +
	'{close}' +
    '<div class="u-msg-title">' +
    '<h4>{title}</h4>' +
    '</div>' +
    '<div class="u-msg-content">' +
    '<iframe src="{url}" width = "99%" height ="100%"></iframe>' +
    '</div>' +
    '{footer}';



	// '<div class="u-msg-title">' +
	// '<h4>{title}</h4>' +
	// '</div>' +
	// '<div class="u-msg-content">' +

	// '</div>' +
	// '<div class="u-msg-footer"><button class="u-msg-ok u-button primary raised">{okText}</button><button class="u-msg-cancel u-button">{cancelText}</button></div>' +
	// '</div>';

var iframeDialogF = function(options) {

	var defaultOptions = {
		hasCloseMenu: true,
		hasFooter: false,
		url: '',
		width: '',
		height: '',
		title: '标题',
		top: '10%',
		onClose: function (){},
		onCancel: function (){},
		onOk: function(){}
	}

	options = extend(defaultOptions, options);
	this.id = options['id'];
	this.template = iframeDialogTemplate;
	this.hasCloseMenu = options['hasCloseMenu'];
	this.hasFooter = options['hasFooter'];
	this.url = options['url'];
	this.top = options['top'];
	this.title = options['title'];
	this.width = options['width'];
	this.height = options['height'];
	this.onClose = options['onClose'];
	this.onOk = options['onOk'];
	this.onCancel = options['onCancel'];
	//是否有url，没有url直接跳出
	if (!this.url) {
		return ;
	}

	this.create();

	this.resizeFun = function() {
		// var cDom = this.contentDom.querySelector('.u-msg-content');
		// cDom.style.height = '';
		// var wholeHeight = this.templateDom.offsetHeight;
		// var contentHeight = this.contentDom.offsetHeight;
		// if(contentHeight > wholeHeight && cDom)
		// 	cDom.style.height = wholeHeight - (56 + 46) + 'px';

		var wholeHeight = this.templateDom.offsetHeight;
		var cDom = this.templateDom.querySelector('.u-msg-content');
		if (this.hasFooter) {
            cDom.style.height = wholeHeight - (56 + 52) + 'px';
        }else {
            cDom.style.height = wholeHeight - 52 + 'px';
        }

	}.bind(this);

	this.resizeFun();
	on(window, 'resize', this.resizeFun);

}

iframeDialogF.prototype.create = function() {
	var closeStr = '' ,footerStr ='';
	var oThis = this;
	if(this.hasCloseMenu) {
		var closeStr = '<div class="u-msg-close"> <span aria-hidden="true">&times;</span></div>';
	}
	if (this.hasFooter) {
		var footerStr = '<div class="u-msg-footer"><button class="u-msg-ok u-button u-button-primary raised">确定</button><button class="u-msg-cancel u-button">取消</button></div>' +
						'</div>';
	}
	var templateStr = this.template.replace('{close}', closeStr);
	templateStr = templateStr.replace('{url}',this.url);
	templateStr = templateStr.replace('{title}',this.title);
	templateStr = templateStr.replace('{footer}',footerStr);
	templateStr = templateStr.replace('{width}', this.width ? 'width:' + this.width + ';' : '');
	templateStr = templateStr.replace('{height}', this.height ? 'height:' + this.height + ';' : '');
	templateStr = templateStr.replace('{top}', this.top ? 'top:' + this.top + ';' : '');

	this.templateDom = makeDOM(templateStr);
	this.overlayDiv = makeModal(this.templateDom);



	if (this.hasCloseMenu) {
		this.closeDiv = this.templateDom.querySelector('.u-msg-close');
		on(this.closeDiv, 'click', function() {
			if(oThis.onClose() !== false) {
				oThis.close();
			}
		});
	}

	if (this.hasFooter) {
		var okBtn = this.templateDom.querySelector('.u-msg-ok');
		var cancelBtn = this.templateDom.querySelector('.u-msg-cancel');
		var closeBtn =
		new Button({
			el: okBtn
		});
		new Button({
			el: cancelBtn
		});
		on(okBtn, 'click', function() {
			if(oThis.onOk() !== false) {
				oThis.close();
			}
		})
		on(cancelBtn, 'click', function() {
			if(oThis.onCancel() !== false) {
				oThis.close();
			}
		})
	}

	document.body.appendChild(this.templateDom);
	this.isClosed = false;
};



iframeDialogF.prototype.close = function () {


	document.body.removeChild(this.templateDom);
	document.body.removeChild(this.overlayDiv);
	this.isClosed = true;


};


var iframeDialog = function(options) {
	return new iframeDialogF(options);
}




export {messageDialog,
		confirmDialog,
		dialogMode,
		dialog,
		dialogWizard,iframeDialog};
