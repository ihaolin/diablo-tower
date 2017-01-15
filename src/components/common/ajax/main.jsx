import queryString from 'query-string';
import { message } from 'antd';

/**
 * Ajax with fetch API
 */
const Ajax = {
	
	doAjax: function(url, method, params, okCallback, errCallback) {
		var fetchInit = {
			//pass cookies, for authentication
			credentials: 'include'
		};
		fetchInit.method = method;

		if (!this.isEmptyObj(params)){
			if (fetchInit.method === 'GET'){
	            var queryParams = '?' + queryString.stringify(params);
				url += queryParams;
			} else if(fetchInit.method === 'POST'){
				// headers
				// var headers = new Headers();
				// headers.append("Content-Type", "application/json");
				// headers.append("Content-Type", "application/x-www-form-urlencoded");
				// fetchInit.headers = headers;
				
				// params body
				var formData = new FormData();
				for (var paramKey in params) {
					if (params.hasOwnProperty(paramKey)){
						formData.append(paramKey, params[paramKey]);
					}
				}
				fetchInit.body = formData;
				// fetchInit.body = JSON.stringify(params);
			}
		}
 
		var okCallback = okCallback || function(){};
		var errCallback = errCallback || function(err){ message.error(err, 2); };

		fetch(url, fetchInit)
		.then(
			function(resp){
				if (resp.ok){
					resp.json().then(function(jsonResp){
						if (jsonResp.status === 200){
							okCallback(jsonResp.data);
						} else {
							errCallback(jsonResp.err)
						}
					});
				} else {
					errCallback(resp);
				}				
			},
			function(err){
				errCallback(err);
			}
	    );
	}, 

	get: function(url, params, okCallback, errCallback){
		this.doAjax(url, 'GET', params, okCallback, errCallback);
	},

	post: function(url, params, okCallback, errCallback){
		this.doAjax(url, 'POST', params, okCallback, errCallback);
	},

	isEmptyObj: function(obj){
		for (var key in obj) {
			return false;
		}
		return true;
	}
};

export { Ajax };

