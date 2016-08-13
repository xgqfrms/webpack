// webpack 是一个模块打包器。
// 这意味着webpack 将相互依赖的模块打包，发布为静态的资源来代替这些模块本身.

// 依赖的导入可以使用 CommonJs 完成
var commonjs = require("./commonjs");
// 或 使用 AMD
define(["amd-module", "../file"], function(amdModule, file) {
	// 然而以前的结构是同步的
	// 这是异步的
	require(["big-module/big/file"], function(big) {
		 // for async dependencies webpack splits
		 //  your application into multiple "chunks".
		 // This part of your application is
		 //  loaded on demand (Code Splitting)
		var stuff = require("../my/stuff");
		// "../my/stuff" is also loaded on demand
		// 因为它在AMD要求的回调函数中
	});
});


require("coffee!./cup.coffee");
// "Loaders" can be used to preprocess files.
// They can be prefixed in the require call
//  or configured in the configuration.
require("./cup");
// This does the same when you add ".coffee" to the extensions
//  and configure the "coffee" loader for /\.coffee$/


function loadTemplate(name) {
	return require("./templates/" + name + ".jade");
	// many expressions are supported in require calls
	// a clever parser extracts information and concludes
	//  that everything in "./templates" that matches
	//  /\.jade$/ should be included in the bundle, as it
	//  can be required.
}


// ... and you can combine everything
function loadTemplateAsync(name, callback) {
	require(["bundle?lazy!./templates/" + name + ".jade"], 
	  function(templateBundle) {
		templateBundle(callback);
	});
}
