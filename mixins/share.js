export default {
	methods: {
		async share(e) {
			this.HideModal();
			let { provider, scene } = e.currentTarget.dataset;
			switch (provider) {
				case 'copy':
					this.copy();
					this.isShare = true;
					break;
				case 'save':
					this.$uni.showLoading({ title: '生成图片中' });
					setTimeout(() => {
						this.saveImageToPhotosAlbum();
					}, 500);
					break;
				case 'qq':
					this.$uni.showLoading({ title: '生成图片中' });
					setTimeout(() => {
						this.uniShare(provider, scene);
					}, 500);
					break;
				case 'weixin':
					this.$uni.showLoading({ title: '生成图片中' });
					setTimeout(() => {
						this.uniShare(provider, scene);
					}, 500);
					break;
				default:
					break;
			}
		},
		async uniShare(provider, scene) {
			let resp = await this.saveCapture();
			let [err, res] = await uni.share({
				provider: provider,
				scene: scene,
				type: 2,
				imageUrl: resp.target
			});
			this.$uni.hideLoading();
			this.HideModal()
			if (res) {
				// this.ShareSuccess()
				this.$uni.showToast({ title: '分享成功', icon: 'success' });
			}
			if (err) {
				this.$uni.showToast({ title: '分享失败' });
				this.isShare = true;
			}
		},
		async saveImageToPhotosAlbum() {
			let resp = await this.saveCapture();
			let [err, res] = await uni.saveImageToPhotosAlbum({
				filePath: resp.target
			});
			if (res) {
				this.$uni.showToast({ title: '保存图片成功', icon: 'success' });
			}
			if (err) {
				this.$uni.showToast({ title: '保存图片失败' });
				this.isShare = true;
			}
		},
		saveCapture() {
			return new Promise(async (resolve, reject) => {
				try {
					await this.createBitmap();
					let res = await this.saveBitmap();
					this.bitmap.clear();
					this.isShare = true;
					resolve(res);
				} catch (e) {
					this.$uni.showToast({ title: '保存图片失败' });
					this.isShare = true;
					reject(e);
				}
			});
		},
		createBitmap() {
			return new Promise((resolve, reject) => {
				this.bitmap = new plus.nativeObj.Bitmap('invite');
				let currentWebview = this.$mp.page.$getAppWebview();
				let res = uni.getSystemInfoSync();
				let top = res.statusBarHeight + 45;
				// 将webview内容绘制到Bitmap对象中
				currentWebview.draw(
					this.bitmap,
					() => {
						resolve();
					},
					err => {
						reject(err);
						console.log('截屏绘制图片失败');
					}, {
						// clip: { top: `${top}px`, left: '0px', width: '100%', height: '100%' }
						clip: { left: '0px', width: '100%', height: '100%' }
					}
				);
			});
		},
		saveBitmap(path = '_doc/share.jpg') {
			return new Promise((resolve, reject) => {
				this.bitmap.save(
					path, {
						overwrite: true,
						quality: 100
					},
					res => {
						resolve(res);
					},
					err => {
						this.isShare = true;
						reject(err);
						console.log('保存图片失败');
					}
				);
			});
		},
	}
}
