Vue.config.devtools = true;

var demo = new Vue({
    el: '#root',
    data: {
        searchtext: "",
		items : [
		{
			"title": "Basic Latin",
			"keywords": ["and", "latin"],
			"code": 33
		},
		{
			"title": "Basic Latin",
			"keywords": ["right parenthesis", "bracket", "latin", "symbols"],
			"code": 41
		},
		{
			"title": "Basic Latin",
			"keywords": ["right parenthesis", "bracket", "latin", "symbols"],
			"code": 41
		}
		]
    },
	filters:{
		codeToString : function(value){
			return String.fromCharCode(value);
		},
		codeToHex : function(value){
			return "0x" + value.toString(16);
		},
		codeToOct : function(value){
			return value.toString(8);
		},
		codeToHtml : function(value){
			return "&#" + value + ";";
		},
		codeToUnicode : function(value){
			return "U+" + value.toString(16);
		},
		codeToJsEscaped : function(value){
			return "%u" + value.toString(16);
		}
	},
	computed: {
		filteredItems(){
			return this.items.filter(item => {
				let flag = false;
				item.keywords.forEach((value) => {
					if (value.includes(this.searchtext.toLowerCase())){
						flag = true;
					}
				})
				return flag;
			});
		}
	}
})