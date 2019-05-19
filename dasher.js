function Box(P,D,s,path){
	 this.r=new Rect(P,D)
	 this.s=s
	 this.path=path
}

function start(){
   var selfref=this

   this.interval=setInterval(function(){
      selfref.render()
   },1000/this.FPS)

   console.log("started rendering at "  + this.interval)
}

function end(){
   console.log("Clearing :  " + this.interval)
   clearInterval(this.interval)
   this.moving=false
   this.render()
}
function move(e){
   this.moving=true

   this.tx=e.x
   this.ty=e.y
}

// Constructor for dasher model 
function Dasher(el){
	 this.framen=0
   //  Call parent class
   Alpha.call(this,el)
   
   // CFG
   this.clen = 48
   this.cx = this.w/2
   this.cy = this.h*.8
   this.FPS = 30
	 this.inputCursorLen = 20
	 this.box_width_th = 8
	 
	 this.inputAreaGravity=this.getCFG("ctrl-gravity")
	 this.inputAreaPadding=0.1

	 // Velocity
	 this.v = 1000

   // State
   this.interval=-1
	 this.pos=new Victor(0,0)
	 this.ppos=false

	 this.boxes=[]

	 // Calc. pos & dim for touch area
	 this.calcInputArea()

   console.log("Set up dasher model...")
   this.render()

   // Touch / User interaction
   this.touchstart=start
   this.touchmove=move
   this.touchend=end
}

// Projection coeffecient 
Dasher.prototype.coeff=function(dx){
	 if(dx<0) return 1-Math.log(1-dx)
	 return 1+dx
}

// Store box for hitbox purposes
Dasher.prototype.storeBox=function(P,D,s,path){
	 this.boxes.push(new Box(P,D,s,path))
}

// Cursor going into box
Dasher.prototype.intoBox=function(box){
	 this.target.emit(box.s)
	 console.log("into box")
}

// Cursor going out of box
Dasher.prototype.outofBox=function(box){
	 this.target.remove()
	 console.log("backspace")
}
// move elsewher
function getMS(){ return Date.now() }

function logTime(s,t0){
	 var str=s+" in "+(getMS()-t0)+"ms"
	 console.log(str)
	 return str
}

Dasher.prototype.gotHit=function(P0){ 
	 var t0=getMS()
	 var p=""
	 for(var k in this.boxes){
			var box=this.boxes[k]
			var m0=box.r.inside(P0)

			if(m0 && box.path.length>p.length) p=box.path
	 }
	 logTime("collision",t0)
	 console.log("Longest path: "+p)

	 // Check for  changes
	 if(p.length) this.target.update(p)
}

// Draw "Dasher" Box 
// Returns width of box, for use as x offset
Dasher.prototype.dBox=function(s,f,w0,h0,xoffs,yoffs,xo){
   var w=f*w0
	 if(w<this.box_width_th) return w
   var h=f*h0
   var y=h0*0.05+this.pos.y

	 var dy=(y-this.cy)/h0-yoffs
	 var dx=xoffs+this.pos.x
	 var k=this.coeff(dy)*2

	 var P=new Victor(xo+k*dx,0)
	 var D=new Victor(k*w,h+this.pos.y)
	 var R=new Rect(P,D)

	 if(R.isOutsideOf(this.screen)) return w
	 
	 // save hitbox for collision detection
	 this.storeBox(P,D,s,s)

	 // Cull if box is bigger than screen
	 if(!R.isInsideOf(this.screen)&&D.x>this.box_width_th)
			this.rect(P.x,P.y,D.x,D.y)
	 this.string(s,P.x,D.y,D.y/2,D.x,true)
			
	 var xoi=xo+k*(xoffs+this.pos.x)

	 // next level
   for(var kx in this.prof.sorted){
			var f1=this.prof.f(this.prof.sorted[kx])
			var s1=this.prof.sorted[kx]

			xoi+=this.dBoxII(s1,f1,xoi,k*w,h+this.pos.y,dy-1,s)
	 }

	 this.printV(this.pos,1)
	 this.printVAR("y=",dy,2)
	 this.printVAR("k=",k,3)

   return w
}

Dasher.prototype.dBoxII=function(s,f,x0,w0,h0,dy,path){
//	 if(dy<-1.999999) return;

	 var dy1=dy
	 var k=this.coeff(dy1)*2

	 var w1=w0*f
	 // If to small get back but  return w for xofs calc
	 if(w1<this.box_width_th) return w1
	 var h1=h0*f*k

	 // save for collision detection
	 var P=new Victor(x0,0)
	 var D=new Victor(w1,h1)
	 var R=new Rect(P,D)

	 // Cull if outside
	 if(R.isOutsideOf(this.screen)) return w1
	 this.storeBox(P,D,s,path+s)

	 // Don't bother if rect is to small or larger than
	 if(!R.isInsideOf(this.screen))
			this.rect(x0,0,w1,h1)
	 this.string(s,x0,h1,h1/2,w1,true)

	 var xoi=x0

   for(var kx in this.prof.sorted){
			var f1=this.prof.f(this.prof.sorted[kx])
			var s1=this.prof.sorted[kx]

			xoi+=this.dBoxII(s1,f1,xoi,w1,h1,dy-1,path+s)
	 }

	 return w1
}

Dasher.prototype.dBoxI=function(s,f,w0,h0,xoffs,yoffs,xo){
   var w=f*w0
   var h=f*h0
   var y=h0*0.05+this.pos.y

	 var dy=(y-this.cy)/h0-yoffs
	 var k=this.coeff(dy)*2

	 if(k*(xoffs+this.pos.x+w)<0)
			return w

   //  draw  rectangle / stroke Rect
   this.rect(k*(xoffs),0,k*w,k*h)
   // draw text
   this.string(s,k*(xoffs),h*k,k*h,k*w)

   return w
}

Dasher.prototype.cursor=function(){
   var x=this.cx
   var y=this.cy
   var l=this.clen

   this.line(x-l,y,x+l,y)
   this.line(x,y-l,x,y+l)
}

Dasher.prototype.touchstart=function(){
   console.log("Dasher touchstart")
}

// update position
Dasher.prototype.update=function(){
	 if(!this.moving) return

	 // cursor
	 var c=this.inputCursor

	 // touch input
	 var i=new Victor(this.tx,this.ty)
	 i.subtract(c)
//	 i.normalize()
	 i.divide(this.inputRect.D)

	 i.invertY()
	 i.invertX()

	 var t=1.0/this.FPS
	 var d=t*this.v
	 i.multiply(new Victor(d,d))


	 // See if cursor crossed boundraries
	 var c=new Victor(this.cx,this.cy)

	 this.gotHit(c)

	 this.pos.add(i)
}

// Calculate coordinates for input area	 
//  TODO 
//  -  add cfg box for non  square box
//  - apply padding / margin	
Dasher.prototype.calcInputArea=function(){
	 var len=Math.min(this.w/2,this.h/2)
	 var input=new Rect(new Victor(0,0),new Victor(len,len))
	 var p=this.inputAreaPadding
	 var w=h=len

	 // NW by default
	 switch(this.inputAreaGravity){
			case "NE":
				 input.P=new Victor(this.w-len,0)
				 break;
			case "SW":
				 input.P=new Victor(0,this.h-len)
				 break;
			case "SE":
				 input.P=new Victor(this.w-len,this.h-len)
				 break;
			default:
				 input.P=new Victor(0,0)
				 break;
	 }
	 
	 console.log(input.P)
	 console.log(input.D)

	 this.inputRect=input

	 var mid=input.center()
	 this.inputCursor=mid
}

Dasher.prototype.inputArea=function(){
	 this.rectR(this.inputRect)
	 this.cursorP(this.inputCursor,this.inputCursorLen)
}

Dasher.prototype.key=function(e){
	 console.log("Got key movement")
}

Dasher.prototype.render=function(){
	 this.n_strings=0
	 this.n_boxes=0
	 //  Fill canvas
   this.clear()

   // needs to be cleared for every render
	 var xoffs=0

	 // hitbox list is compiled on each render
	 this.boxes=[]

   for(var k in this.prof.sorted){
      var f=this.prof.f(this.prof.sorted[k])
			var x0=xoffs

      xoffs+=this.dBox(this.prof.sorted[k],f,
				 this.w,this.h,xoffs,0,0)
   }
	 //  Do movement logic
	 this.update()
	 
	 var pstr=this.tx+"x"+this.ty
//	 this.string(pstr,0,42,42,1000)
	 
	 // Draw input control box
	 this.inputArea()
   // Draw cursor
   this.cursor()

	 // Draw dir vector
   if(this.moving){
			console.log(this.tx+" x " + this.ty)
			this.vectorP(new Victor(0,0),this.inputCursor)
			this.vectorP(new Victor(0,0),new Victor(this.tx,this.ty))
			this.vectorP(this.inputCursor,new Victor(this.tx,this.ty))
//      this.vector(this.inputCursor.x,this.inputCursor.y,this.tx,this.ty)
   }

//	 this.vectorP(this.inputCursor.P,new Victor(this.tx,this.ty))
	 this.printVAR("n strings",this.n_strings,4)
	 this.printVAR("n boxes",this.n_boxes,5)
	 this.framen++
	 this.printVAR("framen",this.framen,6)
}
