module.exports = {
	devServer: {
		proxy: {
			'/api': {
				// target: 'http://jkc666.com', // 正式
				target: 'http://ekb.test.6n0z.cn', // 测试
				ws: true,
				changeOrigin: true
			},
		}
	}
}
