
import './common.less';

// string format 
String.prototype.format = function(){
    var args = arguments[0];
    return this.replace(/\{(\d+)\}/g,                
        function(m,i){
            return args[i];
    	});
}