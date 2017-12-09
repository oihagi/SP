;(function(){
	RegisterSod("jquery.js", "//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
	RegisterSod("jquery.SPServices.js","//cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices.min.js");

	LoadSodByKey("jquery.js",function(){
		LoadSodByKey("jquery.SPServices.js",function(){
			console.log("SPServices");
		});
	});
})();
