// Simple rectangle class

// Takes two vectors as argument
function Rect(Position,Dimensions){
	 this.P=Position
	 this.D=Dimensions
}

// Checks if rectangle is not overlapping
Rect.prototype.isOutsideOf=function(r){
	 if(r.P.x+r.D.x < this.P.x) return true
	 if(r.P.x > this.P.x+this.D.x) return true
	 if(r.P.y+r.D.y < this.P.y) return true
	 if(r.P.y > this.P.y+this.D.y) return true
	 return false
}

// Check if point is inside of rectangle
Rect.prototype.inside=function(P){
	 if( P.x >= this.P.x && P.x <= this.P.x+this.D.x 
			&& P.y >= this.P.y && P.y <= this.P.y+this.D.y) return true
	 return false
}

// Chec if two rectangles overlaps
Rect.prototype.overlaps=function(r){
	 // one to the left of the other
	 if(
			r.P.x+r.D.x 			< this.P.x ||
			this.P.x+this.D.x < r.P.x) return false
	 // one above the other 
	 if(
			r.P.y + r.D.y 				< this.P.y ||
			this.P.y + this.D.y < r.P.y) return false
	 return true
}

// Get center of rectangle
Rect.prototype.center=function(){
	 var res=this.P.clone()
	 var mid=this.D.clone()
	 mid.multiply(new Victor(0.5,0.5))
	 res.add(mid)
	 return res
}
