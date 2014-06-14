var { Question }=require("./gajse-text");

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
			if(typeof(current.text) == typeof("STRING"))
			{
				var duration=current.text.length;
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
			}else{
				document.getElementById("gajse").style.position="relative";
				var div=new Array;
				for(var i=0;i<current.text.answers.length;i++)
				{
					div[i]=document.createElement("div");
					div[i].answer=current.text.answers[i].scriptedText;
					div[i].style.position="absolute";
					div[i].style.float="left";
					div[i].style.bottom=(i+1)*100+"px";
					div[i].style.left="100px";
					div[i].style.color=current.color;
					div[i].textContent=current.text.answers[i].answer;
					div[i].addEventListener("mouseover",function(evt){
						var myDiv=evt.target;
						myDiv.style.color="yellow";
					});
					div[i].addEventListener("mouseout",function(evt){
						var myDiv=evt.target;
						myDiv.style.color="green";
					});
					div[i].addEventListener("click",function(evt){
						var myDiv=evt.target;
						div.forEach(function(aDiv){
							document.getElementById("gajse").removeChild(aDiv);
						});
						myDiv.answer.speak();
						this.available=true;
						this.tryToSay();
					}.bind(this));
					document.getElementById("gajse").appendChild(div[i]);
				}
			}
		}
		
	},
	say: function(text,color){
		if(typeof(text) == "string")
		{
			this.stack.push({text: text, color: color});
			this.tryToSay();
		}else
		{
			this.stack.push({text: text, color: "green"});
			this.tryToSay();
		}
	},
	remove: function(dom){
		document.getElementById("gajse").removeChild(dom);
	}
};
