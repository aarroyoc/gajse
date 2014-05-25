module.exports={
	/* IN A FUTURE USE CSS MESSAGE, AND MADE POSSIBLE SKIP IT */
	stack: [],
	available: true,
	say2: function(text, skip, duration, position, color){
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
	tryToSay: function(){
		if(this.available && this.stack.length>0)
		{
			this.available=false;
			var current=this.stack.shift();
			var duration=current.text.length;
			console.log("Displaying text: "+current.text+" during "+duration*500);
			document.getElementById("gajse").style.position="relative";
			var div=document.createElement("div");
			div.style.position="absolute";
			div.style.float="left";
			div.style.bottom="100px";
			div.style.left="100px";
			div.style.color=current.color;
			div.textContent=current.text;
			document.getElementById("gajse").appendChild(div);
			setTimeout(function(){
				document.getElementById("gajse").removeChild(div);
				this.available=true;
				this.tryToSay();
			}.bind(this),duration*250);
		}
		
	},
	say: function(text,color){
		this.stack.push({text: text, color: color});
		this.tryToSay();
	},
	remove: function(dom){
		document.getElementById("gajse").removeChild(dom);
	}
};
