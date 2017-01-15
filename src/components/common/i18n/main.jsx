import Cookies from 'js-cookie';

const I18n = {
	
	lang: function(){
		var lang = Cookies.get('lang');
		if (!lang){
			lang = navigator.language;
			Cookies.set('lang', lang);
		}
		return lang.substr(0, 2);
	}(),

	setLang: function(lang){
		this.lang = lang;
		Cookies.set('lang', lang);
	},

	msgs: {
		"en": {
	      "404": "Page is not found",
	      "back.home": "Back to home",
	      "exit": "Exit",
	      "submit": "Submit",
	      "confirm": "Confirm",
	      "cancel": "Cancel",
	      "add": "Add",
	      "refresh": "Refresh",
	      "update": "Update",
	      "delete": "Delete",
	      "input": "Please Input",
	      "not.found": "Not found records",
	      "app.mgr": "App Management",
	      "app.list": "App List",
	      "app.edit": "Edit App",
	      "app.delete": 'Delete App',
	      "app.select": 'Select App',
	      "app.name": "App Name",
	      "app.desc": "App Description",
	      "app.key": "App Secret Key",
	      "app.inherit": "Inherit Configs From App",
	      "app.delete.confirm": "Sure to delete the app【{0}】and delete all configurations of it?",
	      "config.mgr": "Configuration Management",
	      "config.list": "Config List",
	      "config.name": "Config Name",
	      "config.value": "Config Value",
	      "cluster.mgr": "Cluster Management",
	      "cluster.servers": "Server List",
	      "cluster.clients": "Client List",
	      "id": "ID",
	      "name": "Name",
	      "desc": "Description",
	      "operation": "Operation",
	      "value": "Value",
	      "total": 'All {0} items',
	      "input.fullname": 'Pleanse Input Full Name',
	      "config.edit": "Edit Config",
	      "config.delete": "Delete Config",
	      "config.delete.confirm": "Sure to delete the config【{0}】?",
	      "host": "Host",
	      "status": "Status",
	      "shutdown": "Shutdown",
	      "clean.cache": "Clean Cache",
	      "server.clean.cache": "Clean Server Cache",
	      "server.clean.cache.confirm": "Sure to clean the server 【{0}】's cache?",
	      "server.shutdown": "Shutdown Server",
	      "server.shutdown.confirm": "Sure to shutdown the server【{0}】?",
	      "config.push.logs": "Config Push Logs",
	      "push.log.content": "{0}: The server【{1}】pushed the config【{2}】to the client【{3}】.",
	      "client.count": 'Client Count',
	      "client.addr": "Client Address",
	      "client.server": "Connectting Server",
	      "client.uptime": "Uptime",
	      "name.tip": "(A-Za-z0-9_)",
	      "field.format.error": "The format isn't right: {0}"
	    },

	    'zh': {
	      "404": "未找到该页面",
	      "back.home": "返回首页",
	      "exit": "退出",
	      "submit": "提交",
	      "confirm": "确认",
	      "cancel": "取消",
	      "add": "添加",
	      "refresh": "刷新",
	      "update": "更新",
	      "delete": "删除",
	      "input": "请输入",
	      "not.found": "未找到记录",
	      "app.mgr": "应用管理",
	      "app.list": "应用列表",
	      "app.edit": "编辑应用",
	      "app.delete": "删除应用",
	      "app.select": "请选择应用",
	      "app.name": "应用名称",
	      "app.desc": "应用描述",
	      "app.key": "应用密钥",
	      "app.delete.confirm": "确定要删除应用【{0}】，并删除其所有配置吗？",
	      "app.inherit": "继承应用配置",
	      "config.mgr": "配置管理",
	      "config.list": "配置列表",
	      "cluster.mgr": "集群管理",
	      "cluster.servers": "服务器列表",
	      "cluster.clients": "客户端列表",
	      "config.name": "配置名称",
	      "config.value": "配置值",
	      "id": "编号",
	      "name": "名称",
	      "desc": "描述",
	      "operation": "操作",
	      "value": "值",
	      "total": '共 {0} 条',
	      "input.fullname": '请输入全名称',
	      "config.edit": "编辑配置",
	      "config.delete": "删除配置",
	      "config.delete.confirm": "确定要删除配置【{0}】吗？",
	      "host": "主机",
	      "status": "状态",
	      "shutdown": "关闭",
	      "clean.cache": "清除缓存",
	      "server.clean.cache": "清除服务器缓存",
	      "server.clean.cache.confirm": "确定要清除服务器【{0}】的缓存吗？",
	      "server.shutdown": "关闭服务器",
	      "server.shutdown.confirm": "确定要关闭服务器【{0}】吗？",
	      "config.push.logs": "配置推送日志",
	      "push.log.content": "{0}：服务器【{1}】推送配置【{2}】至客户端【{3}】.",
	      "client.count": "客户端数",
	      "client.addr": "客户端地址",
	      "client.server": "连接服务器",
	      "client.uptime": "最近连接时间",
	      "name.tip": "(字母、数字或下划线)",
	      "field.format.error": "输入格式不正确: {0}"
	    }
	},

    getText(code){
    	return this.msgs[this.lang][code] || '';
  	},

  	formatText(){
  		var args = Array.prototype.slice.call(arguments, 1);
  		var txt = this.getText(arguments[0]);
  		return txt === '' ? '' : txt.format(args);
  	}
};

export { I18n };