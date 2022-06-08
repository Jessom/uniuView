class Dialog {
	constructor() {
		this.maskLayer = {}
		this.popupEle = {}
	}

	/**
	 * 显示
	 * @param { Object } params 对象
	 * @param { String } params.title 标题文字
	 * @param { String } params.content 内容
	 * @param { Boolean } params.showCancel 是否显示取消按钮
	 * @param { String } params.cancelText 取消按钮文字
	 * @param { String } params.confirmText 确定按钮文字
	 * @param { Function } params.confirm 确定回调
	 * @param { Function } params.cancel 取消回调
	 * @param { String } params.icon 顶部图标地址
	 * @param { String } params.titleAlign 标题对其方式， left | center
	 * @param { String } params.contentAlign 内容对其方式， left | center
	 * @version 2021-10-20 zzc
	 */
	show(params) {
		this.drawView(params)
		this.maskLayer.show()
		this.popupEle.show()
	}

	/**
	 * 隐藏
	 * @version 2021-10-20 zzc
	 */
	hide() {
		this.maskLayer.hide()
		this.popupEle.hide()
	}

	drawView(params) {
		const {
			confirmText = '确定',
			cancelText = '取消',
			titleAlign = 'center',
			contentAlign = 'left',
			title = '提示',
			content,
			showCancel = true,
			confirm,
			cancel,
			icon
		} = params

		const screenWidht = plus.screen.resolutionWidth
		const screenHeight = plus.screen.resolutionHeight

		const popWidth = screenWidht * 0.7
		let popHeight = 134 + 20 + 20 + 90 + 20

		// 正文距离顶部
		let contentTop = 172

		// 弹窗容器的Padding
		const viewPadding = 20

		// 弹窗容器的宽度
		const viewWidth = parseInt(popWidth - (viewPadding * 2))

		// 更新描述文字
		const description = this.drawText(content, viewWidth)

		const textHeight = 18

		const popContent = []

		const confirmTextConfig = {
			tag: 'font',
			id: 'confirmText',
			text: confirmText,
			textStyles: {
				size: '14px',
				color: '#FFF',
				lineSpacing: '0%',
			},
		}

		// 如果没有图标
		if (icon) {
			popContent.unshift({
				src: icon,
				id: 'logo',
				tag: 'img',
				position: {
					top: '0px',
					left: (popWidth - 124) / 2 + 'px',
					width: '124px',
					height: '124px',
				}
			})
		} else {
			popHeight -= 30
			contentTop = 105
		}

		// 如果没有标题
		if (title) {
			popContent.push({
				tag: 'font',
				id: 'title',
				text: title,
				textStyles: {
					size: '18px',
					color: '#fff',
					weight: 'bold',
					whiteSpace: 'normal'
				},
				position: {
					top: icon ? '134px' : '60px',
					left: titleAlign === 'center' ? `${viewPadding}px` : '-25px',
					width: viewWidth + 'px',
					height: '30px',
				},
			})
		} else {
			contentTop = 134
		}

		description.forEach((item, index) => {
			if (index > 0) {
				popHeight += textHeight;
				contentTop += textHeight;
			}
			popContent.push({
				tag: 'font',
				id: 'content' + index + 1,
				text: item.content,
				textStyles: {
					size: '14px',
					color: '#eee',
					lineSpacing: '50%',
					align: content.length < 16 ? 'center' : contentAlign,
				},
				position: {
					top: contentTop + 'px',
					left: viewPadding + 'px',
					width: viewWidth + 'px',
					height: textHeight + 'px',
				}
			})
			if (item.type == 'break') {
				contentTop += 10;
				popHeight += 10;
			}
		})

		// 如果没有取消按钮
		if (!showCancel) {
			popContent.push({
				tag: 'rect', // 绘制底边按钮
				rectStyles: {
					radius: '6px',
					color: '#469BFF'
				},
				position: {
					bottom: viewPadding + 'px',
					left: viewPadding + 'px',
					width: viewWidth + 'px',
					height: '40px'
				}
			})
			popContent.push({
				...confirmTextConfig,
				position: {
					bottom: viewPadding + 'px',
					left: viewPadding + 'px',
					width: viewWidth + 'px',
					height: '40px'
				}
			})
		} else {
			// 绘制底边按钮
			popContent.push({
				tag: 'rect',
				id: 'cancelBox',
				rectStyles: {
					radius: '5px',
					borderColor: '#eeeeee',
					color: '#f0f0f0',
					borderWidth: '1px',
				},
				position: {
					bottom: viewPadding + 'px',
					left: viewPadding + 'px',
					width: (viewWidth - viewPadding) / 2 + 'px',
					height: '40px',
				}
			})
			popContent.push({
				tag: 'rect',
				id: 'confirmBox',
				rectStyles: {
					radius: '5px',
					color: '#469BFF',
				},
				position: {
					bottom: viewPadding + 'px',
					left: ((viewWidth - viewPadding) / 2 + viewPadding * 2) + 'px',
					width: (viewWidth - viewPadding) / 2 + 'px',
					height: '40px',
				}
			})
			popContent.push({
				tag: 'font',
				id: 'cancelText',
				text: cancelText,
				textStyles: {
					size: '14px',
					color: '#666',
					lineSpacing: '0%',
					whiteSpace: 'normal'
				},
				position: {
					bottom: viewPadding + 'px',
					left: viewPadding + 'px',
					width: (viewWidth - viewPadding) / 2 + 'px',
					height: '40px',
				}
			})
			popContent.push({
				...confirmTextConfig,
				position: {
					bottom: viewPadding + 'px',
					left: ((viewWidth - viewPadding) / 2 + viewPadding * 2) + 'px',
					width: (viewWidth - viewPadding) / 2 + 'px',
					height: '40px',
				}
			})
		}

		this.maskLayer = new plus.nativeObj.View('maskLayer', {
			top: '0px',
			left: '0px',
			height: '100%',
			width: '100%',
			backgroundColor: 'rgba(0,0,0,0.5)'
		})

		this.popupEle = new plus.nativeObj.View('popupEle', {
			tag: 'rect',
			top: (screenHeight - popHeight) / 2 + 'px',
			left: '15%',
			height: popHeight + 'px',
			width: '70%'
		})

		// 绘制白色背景
		this.popupEle.drawRect({
			color: '#000000',
			radius: '8px',
			borderWidth: '1px',
			borderColor: 'rgba(255,255,255,0.4)'
		}, {
			top: '40px',
			height: popHeight - 40 + 'px',
		})

		this.popupEle.draw(popContent);

		this.popupEle.addEventListener('click', (e) => {
			let maxTop = popHeight - viewPadding;
			let maxLeft = popWidth - viewPadding;
			let buttonWidth = (viewWidth - viewPadding) / 2;
			if (e.clientY > maxTop - 40 && e.clientY < maxTop) {
				if (!showCancel) {
					if (e.clientX > viewPadding && e.clientX < maxLeft) {
						// 确定
						confirm && confirm()
						this.hide()
					}
				} else {
					// 取消
					if (e.clientX > viewPadding && e.clientX < maxLeft - buttonWidth - viewPadding) {
						cancel && cancel()
						this.hide()
					} else if (e.clientX > maxLeft - buttonWidth && e.clientX < maxLeft) {
						// 确认
						confirm && confirm()
						this.hide()
					}
				}
			}
		})
	}

	/**
	 * 文本换行
	 * @param { String } text 文本内容
	 * @param { Number } maxWidth 宽度
	 */
	drawText(text, maxWidth) {
		let textArr = text.split('');
		let len = textArr.length;

		// 上个节点
		let previousNode = 0;

		// 记录节点宽度
		let nodeWidth = 0;

		// 文本换行数组
		let rowText = [];

		// 如果是字母，侧保存长度
		let letterWidth = 0;

		// 汉字宽度
		let chineseWidth = 14;

		// otherFont宽度
		let otherWidth = 7;

		for (let i = 0; i < len; i++) {
			if (/[\u4e00-\u9fa5]|[\uFE30-\uFFA0]/g.test(textArr[i])) {
				if (letterWidth > 0) {
					if (nodeWidth + chineseWidth + letterWidth * otherWidth > maxWidth) {
						rowText.push({
							type: 'text',
							content: text.substring(previousNode, i)
						});
						previousNode = i;
						nodeWidth = chineseWidth;
						letterWidth = 0;
					} else {
						nodeWidth += chineseWidth + letterWidth * otherWidth;
						letterWidth = 0;
					}
				} else {
					if (nodeWidth + chineseWidth > maxWidth) {
						rowText.push({
							type: 'text',
							content: text.substring(previousNode, i)
						});
						previousNode = i;
						nodeWidth = chineseWidth;
					} else {
						nodeWidth += chineseWidth;
					}
				}
			} else {
				if (/\n/g.test(textArr[i])) {
					rowText.push({
						type: 'break',
						content: text.substring(previousNode, i)
					});
					previousNode = i + 1;
					nodeWidth = 0;
					letterWidth = 0;
				} else if (textArr[i] == '\\' && textArr[i + 1] == 'n') {
					rowText.push({
						type: 'break',
						content: text.substring(previousNode, i)
					});
					previousNode = i + 2;
					nodeWidth = 0;
					letterWidth = 0;
				} else if (/[a-zA-Z0-9]/g.test(textArr[i])) {
					letterWidth += 1;
					if (nodeWidth + letterWidth * otherWidth > maxWidth) {
						rowText.push({
							type: 'text',
							content: text.substring(previousNode, i + 1 - letterWidth)
						});
						previousNode = i + 1 - letterWidth;
						nodeWidth = letterWidth * otherWidth;
						letterWidth = 0;
					}
				} else {
					if (nodeWidth + otherWidth > maxWidth) {
						rowText.push({
							type: 'text',
							content: text.substring(previousNode, i)
						});
						previousNode = i;
						nodeWidth = otherWidth;
					} else {
						nodeWidth += otherWidth;
					}
				}
			}
		}
		if (previousNode < len) {
			rowText.push({
				type: 'tex',
				content: text.substring(previousNode, len)
			});
		}
		return rowText;
	}
}

export default new Dialog()
