
const Storage = {
	
	// Local Storage API
	localSet: function(k, v){
		if (typeof v === 'object'){
			// storage object as json
			v = JSON.stringify(v);
		}
		localStorage.setItem(k, v);
		return this;
	},

	localGet: function(k){
		return localStorage.getItem(k);
	},

	localGetInt: function(k){
        return parseInt(this.localGet(k));
    },

    localGetFloat: function(k){
        return parseFloat(this.localGet(k));
    },

    localGetObj: function(k){
        return JSON.parse(this.localGet(k));
    },

    localRemove: function(k){
        localStorage.removeItem(k);
        return this;
    },

    localClear: function(){
        localStorage.clear();
        return this;
    },

    // Session Storage API
    sessionSet: function(k, v){
        if (typeof v === 'object'){
            v = JSON.stringify(v);
        }
        sessionStorage.setItem(k, v);
        return this;
    },

    sessionGet: function(k){
		return sessionStorage.getItem(k);
	},

	sessionGetInt: function(k){
        return parseInt(this.sessionGet(k));
    },

    sessionGetFloat: function(k){
        return parseFloat(this.sessionGet(k));
    },

    sessionGetObj: function(k){
        return JSON.parse(this.sessionGet(k));
    },

    sessionRemove: function(k){
        sessionStorage.removeItem(k);
        return this;
    },

    sessionClear: function(){
        sessionStorage.clear();
        return this;
    }
};

export {Storage};