function renderMap(){
	
}

// an element with tag doug-map with for linked to  id
// will be set up as a keymap for the bindings
function setupmap(dougo,el){
	var map=$("[doug-map][for='edit']")
	if(map.length<1) return

	console.log("setup")
	t0=map
	var kmap=dougo.getmap()
	var rows=kmap.length
	var cols=kmap[0].length
	var cw=Math.floor(100/cols)+"%"

	for(var y0=0;y0<kmap.length;y0++){
		var krow=kmap[y0]
		var row=$("<div  />",{class:"row"})
		for(var x0=0;x0<krow.length;x0++){
			var col=$("<div />",
				{class:"col",
				style:"width:"+cw
				})

			var str=$("<span />",{ class:"str" })
			var hyph=$("<span />",{ class:"str" })
			var bmap=$("<span />",{ class:"bmap" })

			str.html(kmap[y0][x0].s)
			hyph.html("&#45")
			bmap.html(kmap[y0][x0].bs)

			col.append(str)
			col.append(hyph)
			col.append(bmap)

			row.append(col)
		}
		map.append(row)
	}
}

//  TODO
//  - overlaps with sympred.js
function initDoug(){
	$("[doug]").each(function(){
		var el=$(this)
		var binds=$(this).attr("bindings")
		var bindo=JSON.parse(binds)

		var dougo=new Doug(el.val())
		el.__doug=dougo

		// setup map
		setupmap(dougo,el)

		console.log("Get map")
		var  map=dougo.getmap()
		console.log(map)

		// get signal finger number from keycode
		// returns -1 if keycode is not bound
		function mapKC(which){
			for(k in bindo){
				if(bindo[k]==which)
					return k
			}
			return -1
		}

		// callback that runs upon new symbol 
		// from doug model insert in selection 
		// if any. Afterwards update
		dougo.onupdate(function(s){
			var pos=el.selection('getPos')
			
			// dupl from mod  sympred
			p0=pos.start
			p1=pos.end
			d=el.val()

			var head=d.substr(0,p0)
			var tail=d.substr(p1)

			current=head+s+tail

			//  update internal state of model
			dougo.setcontent(current)

			// update HTML
			el.val(current)
		})

		el.keydown(function(ev){ 
			var kc=ev.which
			var signal=mapKC(kc)

			if(signal==-1)  return

			dougo.signal(signal)

			ev.preventDefault()
		})
		el.keyup(function(ev){
			var kc=ev.which
			var signal=mapKC(kc)
			
			if(signal==-1)  return

			dougo.unsignal(signal)
			
			ev.preventDefault()
		})
	})
}

mobileConsole.init()
$(document).ready(function(){
	mobileConsole.toggle()
	initDoug()	
})
