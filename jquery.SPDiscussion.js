;(function(){
	RegisterSod("jquery.js", "//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
	RegisterSod("jquery.SPServices.js","//cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices.min.js");
	LoadSodByKey("jquery.js",function(){
		LoadSodByKey("jquery.SPServices.js",function(){
			init();
		});
	});
	function init(){
		try{
			_spPageContextInfo = $.extend({}, _spPageContextInfo);
		}catch(err){
			console.log(err);
			return;
		};
		console.log(_spPageContextInfo);
		rest({"path":"/_api/contextinfo","type":"POST"}).done(function(data){
			console.log(data);
		});
		rest({"path":"/_api/lists"}).done(function(data){
			console.log(data);
		});
		if(!_spPageContextInfo.listId){
			return;
		};
		rest({"listName":_spPageContextInfo.listId}).done(function(data){
			console.log(data);
		});
		rest({"listName":_spPageContextInfo.listId,"path":"/items","query":"?$select=*"}).done(function(data){
			console.log(data);
		});
	};
	//rest通信、返ってきた値をリストに追加する
	function rest(args){
		args = args || {};
		//完了を知らせるためにDeferredオブジェクトを生成しそれを返す
		var deferred_ = new $.Deferred();
		var options_ = {
			"type": args.type || "GET"
			,"url": _spPageContextInfo.webAbsoluteUrl
			,"headers": {
				"Access-Control-Allow-Origin": "*"
				,"accept": "application/json;odata=verbose"
				,"content-type":"application/json;odata=verbose"
			}
		};
		if(args.listName){
			options_.url += "/_api/web/lists(guid'"+args.listName.replace("{","").replace("}","")+"')";
		};
		if(args.path){
			args.path = args.path.indexOf("/")!=0 ? "/"+args.path : args.path;
			options_.url += args.path;
		};
		if(args.query){
			args.query = args.query.indexOf("?")!=0 ? "?"+args.query : args.query;
			options_.url += args.query;
		};
		$.ajax(options_)
			.done(function(data){
				//ajax処理を終了したことをDeferredオブジェクトに通知
				deferred_.resolve(data);
			})
			.fail(function(){});
		//完了を知らせるためにDeferredオブジェクトを生成しそれを返す
		return deferred_ .promise(this);
	};
})();
