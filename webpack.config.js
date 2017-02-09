module.exports = {
	entry: __dirname + '/main.js', // 唯一的入口文件
	output: {
		path: __dirname + '/build', // 打包后的文件存放的地方
		filename: 'bundle.js'  // 打包后输出的文件名
	}
};