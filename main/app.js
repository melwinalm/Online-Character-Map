Vue.config.devtools = true;

var demo = new Vue({
	el: '#root',
	data: {
		searchtext: "",
		items: [],
		searchfilter: "keyword"
	},
	mounted: function () {
		this.$http.get('main/content.json')
			.then(response => {

				let tempItems = response.body;

				for (let i = 0; i < tempItems.length; i++) {

					if (tempItems[i].type == 1) {
						let from = tempItems[i].range[0];
						let to = tempItems[i].range[1];
						let keywords = tempItems[i].keywords;

						for (let j = from; j <= to; j++) {

							this.items.push({
								"code": j,
								"keywords": keywords
							})

						}
					}
					else if (tempItems[i].type == 2) {
						let code = tempItems[i].code;
						let keywords = tempItems[i].keywords;

						this.items.push({
							"code": code,
							"keywords": keywords
						})

					}
					else if ($scope.data[i].type == 3) {

					}
				}


			}, response => {

			});
	},
	methods: {
		greet(code, type) {
			let clipboardText = "";

			if (type == 'cts') {
				clipboardText = String.fromCharCode(code);
			}
			else if (type == 'cth') {
				clipboardText = "0x" + code.toString(16);
			}
			else if (type == 'cto') {
				clipboardText = code.toString(8);
			}
			else if (type == 'cte') {
				clipboardText = "&#" + code + ";";
			}
			else if (type == 'ctu') {
				clipboardText = "U+" + code.toString(16);
			}
			else if (type == 'ctj') {
				clipboardText = "%u" + code.toString(16);
			}

			alert(clipboardText);
		}
	},
	filters: {
		codeToString: function (value) {
			return String.fromCharCode(value);
		},
		codeToHex: function (value) {
			return "0x" + value.toString(16);
		},
		codeToOct: function (value) {
			return value.toString(8);
		},
		codeToHtml: function (value) {
			return "&#" + value + ";";
		},
		codeToUnicode: function (value) {
			return "U+" + value.toString(16);
		},
		codeToJsEscaped: function (value) {
			return "%u" + value.toString(16);
		}
	},
	computed: {
		cache: true,
		filteredItems() {

			if (this.searchfilter == "keyword") {
				return this.items.filter(item => {
					let flag = false;
					item.keywords.forEach((value) => {
						if (value.includes(this.searchtext.toLowerCase())) {
							flag = true;
						}
					})
					return flag;
				});
			}
			else {
				return this.items.filter(item => {
					let flag = false;

					if (String.fromCharCode(item.code).toLowerCase() == this.searchtext.toLowerCase()) {
						flag = true;
					}

					return flag;
				});
			}
		}
	}
})
