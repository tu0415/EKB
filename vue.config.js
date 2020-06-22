module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://jkc.test.6n0z.cn',
				ws: true,
				changeOrigin: true
			},
		}
	}
}
