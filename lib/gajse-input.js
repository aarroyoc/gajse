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
	enableInput: function(){
		window.addEventListener("keydown",function(evt){
			var code=evt.keyCode;
			switch(code)
			{
				case 65:
				case 37:this.input.KEY_A=true;break;
				case 68:
				case 39:this.input.KEY_D=true;break;
				case 83:
				case 40:this.input.KEY_S=true;break;
				case 87:
				case 38:this.input.KEY_W=true;break;
				case 81:this.input.KEY_Q=true;break;
				case 69:this.input.KEY_E=true;break;
				case 13:this.input.KEY_ENTER=true;break;
			}
		}.bind(this));
		
		window.addEventListener("keyup",function(evt){
			var code=evt.keyCode;
			switch(code)
			{
				case 65:
				case 37:this.input.KEY_A=false;break;
				case 68:
				case 39:this.input.KEY_D=false;break;
				case 83:
				case 40:this.input.KEY_S=false;break;
				case 87:
				case 38:this.input.KEY_W=false;break;
				case 81:this.input.KEY_Q=false;break;
				case 69:this.input.KEY_E=false;break;
				case 13:this.input.KEY_ENTER=false;break;
			}
		}.bind(this));
	},
	getInput: function(){
			return this.input;
	}
}
