// todo move to editor class
function backspace(morseo,el){
	// FIXME overlaps doug in web
	var pos=el.selection('getPos')
	
	// dupl from mod  sympred
	p0=pos.start
	p1=pos.end
	d=el.val()

	console.log(pos)
	// for tablet??
	if(p0==p1 && p0==0) p0=p1=el.length

	if(p0==p1) p0=p0-1
	var head=d.substr(0,p0)
	var tail=d.substr(p1)
	var current=""

	current=head+tail
	// update the map
	var map=morseo.getmap(head)
	console.log("Direct")

	//  update internal state of model
//	morseo.setcontent(current)

	// update HTML
	el.val(current)
	setupmap(morseo,el)
}
function insert(morseo,el,sym){
	if(!sym) return
	else console.log(sym)
	// FIXME overlaps doug in web
	var pos=el.selection('getPos')
	
	// dupl from mod  sympred
	p0=pos.start
	p1=pos.end
	d=el.val()

	var head=d.substr(0,p0)
	var tail=d.substr(p1)

	current=head+sym+tail
	// update the map
	var map=morseo.getmap(head+sym)
	console.log("Direct")

	//  update internal state of model
//	morseo.setcontent(current)

	// update HTML
	el.val(current)
	setupmap(morseo,el)
}

// TODO make sizes configurable also change doug.css
// returns range [12,42]
function __v_to_fontsize(v,s,e){
	var sp=typeof(s)=="undefined"?12:s
	var ep=typeof(e)=="undefined"?42:e
	var r=ep-sp
	var v0=v*3
	if(v0>r) v0=r
	if(v0<0) v0=0
	return v0+sp
}

function __v_to_color(v){
	// #fecc00
	var c=new Color(254,204,0)
	var r=1.0-c.y
	var v0=v/40
	if(v0>r) v0=r
//	if(v0<0) v0=0
	c.y+=v0
//	console.log( c.toRGB(true))
	return c.toRGB(true)
}
function __v_to_fontweight(v){
	if(v<1) v=1
	if(v>9) v=9
	v=Math.floor(v)
	return v*100
}
// Toggle fullscreen, takes DOM element as argument
function toggleFullscreen(el){
	if(document.fullscreen) document.exitFullscreen()
	else el.requestFullscreen()
}
function setupKeyBinds(el,morseo){
	var mref=morseo
	el.keydown(function(ev){
		var kc=ev.which
		// FIXMEinefficient to grab at every keypress...
		
		// For dual mode
		var di=el.attr("bind-di")
		var da=el.attr("bind-da")
		// For single key mode 
		var de=el.attr("bind-keycode")

		if(kc==di){
			console.log("di")
			mref.feedDual(".")
			setupmap(morseo,el)


			ev.preventDefault()
		}
		if(kc==da){
			console.log("dah")
			mref.feedDual("-")
			setupmap(morseo,el)

			ev.preventDefault()
		}
	})
}
function setupInpBtns(el,morseo){
	var id=el.attr("id")
	var inps=$("[morse-inp][for='"+id+"'")
	var mref=morseo

	inps.click(function(ev){
		var s=$(this).attr("value")
		console.log(s)

		t72=mref
		mref.feedDual(s)
		
		ev.preventDefault()
	})
	// handle touch input
	inps.on('touchend',function(ev){
		if($(this).is("[delete]")){
			backspace(mref,el)
			return
		}
		if($(this).is("[space]")){
			insert(mref,el," ")
			return
		}
		
		// s is either . or -, set in doug.html
		var s=$(this).attr("value")
		console.log(s)
		mref.feedDual(s)
		ev.preventDefault()
	})
}
// an element with tag doug-map with for linked to  id
// will be set up as a keymap for the bindings
// FIXME
// - over;laps doug
// - multiple maps
function setupmap(morseo,el){
	var id=el.attr("id")
	var map=$("[morse-map][for='"+id+"']")
	if(map.length<1) return
	map.html("")

	var kmap=morseo.getmap(el.val())
	var rows=kmap.length
	var cols=kmap[0].length
	var cw=Math.floor(100/cols)+"%"
	var ch=el.height()/rows
	var cw=(Math.floor(el.width()/cols)-2)+"px"
	var ch0=3*ch/5
	var ch1=ch/5

	console.log("el height: "+el.height())
	console.log("rows:"+rows)

	t32=kmap

	for(var y0=0;y0<kmap.length;y0++){
		var krow=kmap[y0]
		var row=$("<div  />",{class:"row"
			})
		for(var x0=0;x0<krow.length;x0++){
			var fs0=__v_to_fontsize(kmap[y0][x0].v,ch0/5,ch0)
			var fs1=__v_to_fontsize(kmap[y0][x0].v,ch1/5,ch1)
			var c=__v_to_color(kmap[y0][x0].v)
			var fw=__v_to_fontweight(kmap[y0][x0].v)
			var col=$("<div />",
				{class:"col",
					style:"width:"+cw+";height:"+ch+"px;"
					+"color:"+c+";"
				})

			var str=$("<span />",{ class:"str" })
//			var hyph=$("<span />",{ class:"str" })
			var hyph=$("<br />",{ class:"str" })
			var codee=$("<span />",{ class:"codee" })
			var v=$("<span />",{ class:"v" })

			str.css("font-size",fs0+"px")
			str.css("line-height",ch0+"px")
			str.css("height",ch0+"px")
			codee.css("font-size",fs1+"px")
			codee.css("line-height",ch1+"px")
			codee.css("height",ch1+"px")
			

			var s0=kmap[y0][x0].s
			if(s0==" ") s0="&nbsp;"
			str.html(s0)
			var chords=""
			codee.html(kmap[y0][x0].c)

			col.append(str)
			col.append(hyph)
			col.append(codee)

			row.append(col)
		}
		map.append(row)
	}
}

function initMorse(){
	$("[morse]").each(function(){
		console.log("init")
		var el=$(this)
		var zmap=$(this).is("[z-map]")
		var dict_url=$(this).attr("dict")

		var morseo=new Morse(el.val(),{zmap:zmap})
		el.__doug=morseo

		// Connect to dictionary server
		var cli=new Client(dict_url)
		morseo.setDict(cli)

		// as soon as we're connected query for symbol probability scores
		cli.setonconnect(function(){
			console.log("async")
			setupmap(morseo,el)
		})
		// on async response from server update map
		morseo.setOnAsync(function(resp){
			console.log("async")
			setupmap(morseo,el)
		})

		// use this for all callbacks
		morseo.onword=function(sym){
			if(!sym) return
			else console.log(sym)
			// FIXME overlaps doug in web
			var pos=el.selection('getPos')
			
			// dupl from mod  sympred
			p0=pos.start
			p1=pos.end
			d=el.val()

			var head=d.substr(0,p0)
			var tail=d.substr(p1)

			current=head+sym+tail
			// update the map
//			var map=dougo.getmap(head+s)
			console.log("Direct")

			//  update internal state of model
//			dougo.setcontent(current)

			// update HTML
			el.val(current)
			setupmap(morseo,el)
		}

		// set focus
		// TODO reenable?
		//  	- add option, should not be enabled on touch!
		__focus(el)

		// setup map
//		setupmap(morseo,el)

		// setup input buttons
		setupInpBtns(el,morseo)
		setupKeyBinds(el,morseo)

		var  map=morseo.getmap(el.val())
		setupmap(morseo,el)

	})

}

//mobileConsole.init()
$(document).ready(function(){
//	mobileConsole.toggle()

	initMorse()

	// bind menu
	$(".conf").click(showCFG)
	$(".fs").click(function(){
		// FIXME
//		toggleFullscreen($("#fswrap")[0])
	})
})