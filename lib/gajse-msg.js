module.exports={
	/* IN A FUTURE USE CSS MESSAGE, AND MADE POSSIBLE SKIP IT */
	say: function(text, skip, duration, position, color){
		console.log(text);
		var div=document.createElement("div");
		div.style.position="absolute";
		div.style.width=100;
		div.style.height=100;
		div.style.color=color;
		div.style.backgroundColor="transparent";
		div.textContent=text;
		if(position=="top")
			div.style.top="100px";
		if(position=="bottom")
			div.style.bottom="100px";
		div.style.left="100px";
		document.getElementById("gajse").style+="text-align: center;";
		document.getElementById("gajse").appendChild(div);
		return div;
	},
	remove: function(dom){
		document.getElementById("gajse").removeChild(dom);
	}
};
