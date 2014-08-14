module.exports={
	input: {
		KEY_W: false,
		KEY_A: false,
		KEY_S: false,
		KEY_D: false,
		KEY_Q: false,
		KEY_E: false,
		KEY_ENTER: false,
		MOUSE_RIGHT: false,
		MOUSE_LEFT: false,
		MOUSE_MIDDLE: false
		},
	processInput: function(evt,enable){
		var code=evt.keyCode;
		switch(code)
		{
			case 65:
			case 37:this.input.KEY_A=enable;break;
			case 68:
			case 39:this.input.KEY_D=enable;break;
			case 83:
			case 40:this.input.KEY_S=enable;break;
			case 87:
			case 38:this.input.KEY_W=enable;break;
			case 81:this.input.KEY_Q=enable;break;
			case 69:this.input.KEY_E=enable;break;
			case 13:this.input.KEY_ENTER=enable;break;
		}
	},
	enableInput: function(){
		window.addEventListener("keydown",function(evt){
			this.processInput(evt,true);
		}.bind(this));
		
		window.addEventListener("keyup",function(evt){
			this.processInput(evt,false);
		}.bind(this));
	},
	getInput: function(){
			return this.input;
	}
}
