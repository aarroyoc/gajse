/* This module verifies if the user can move */

var THREE=require("three");

module.exports={
	rays: [
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 1),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(1, 0, -1),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(-1, 0, -1),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(-1, 0, 1)
	],
	raycaster: new THREE.Raycaster(),
	movements: {
		RIGHT: true,
		LEFT: true,
		GO: true,
		BACK: true
	},
	getMovements: function(){
		return this.movements;
	},
	refresh: function(position,objects){
		/* objects should be scene.children */
		this.movements.RIGHT=true;
		this.movements.LEFT=true;
		this.movements.GO=true;
		this.movements.BACK=true;
		for(var i=0;i<this.rays.length;i++)
		{
			this.raycaster.set(position,this.rays[i]);
			var collisions=this.raycaster.intersectObjects(objects);
			if(collisions.length > 0 && collisions[0].distance <= 1)
			{
				if(i==3 || i==4 || i==5)
				{
					this.movements.GO=false;
				}
				if(i==0 || i==1 || i==7)
				{
					this.movements.BACK=false;
				}
				if(i==1 || i==2 || i==3)
				{
					this.movements.RIGHT=false;
				}
				if(i==5 || i==6 || i==7)
				{
					this.movements.LEFT=false;
				}	
				if(collisions[0].object.gajse != undefined)
				{

					if(collisions[0].object.gajse.textCallback != undefined)
						collisions[0].object.gajse.textCallback.speak();
				}
			}
		}
	}
}
