var WR=0.299
var WB=0.114
var WG=1-WR-WB

var U_MAX=0.436
var V_MAX=0.615

function Color(r,g,b){
	this.fromRGB(r,g,b)
}

Color.prototype.clip=function(v){
	if(v<0) return v
	if(v>255) return 255
	return v
}

Color.prototype.clipf=function(v){
	if(v<0) return v
	if(v>1.0) return 1.0
	return v
}

// get and or set lightness
Color.prototype.luminosity=function(y){
	if(typeof(y)!="undefined") this.y=this.clipf(y)
	return y
}

Color.prototype.toRGB=function(as_string){
	var r=this.y+1.14*this.v
	var g=this.y-0.395*this.u-0.581*this.v
	var b=this.y+2.033*this.u

	r=this.clipf(r)
	g=this.clipf(g)
	b=this.clipf(b)

	// TODO implement tostring??
	if(as_string){
		return "rgb("+255*r+","+255*g+","+255*b+")"
	}
	return {r:r,g:g,b:b}
}

Color.prototype.fromRGB=function(rp,gp,bp){
	// Convert to float [0,1]
	r=this.clip(rp)/255
	g=this.clip(gp)/255
	b=this.clip(bp)/255

	// BT. 601 RGB - YUV conversion
	var y=WR*r+WG*g+WB*b
	var u=U_MAX*(b-y)/(1-WB)
	var v=V_MAX*(r-y)/(1-WR)

	this.y=y
	this.u=u
	this.v=v
}
