// TODO not good form
var awaiting_key=false
var awaiting_single=false
var bind_dialog=false
var bind_keyn=-1
var bind_tgt=false

// TODO make sizes configurable also change doug.css
// returns range [12,42]
function __v_to_fontsize(v,s,e){
	var sp=typeof(s)=="undefined"?12:s
	var ep=typeof(e)=="undefined"?42:e
	var r=ep-sp
	var v0=v
	if(v0>r) v0=r
	if(v0<0) v0=0
	return v0+sp
}

// an element with tag doug-map with for linked to  id
// will be set up as a keymap for the bindings
function setupmap(dougo,el){
	var map=$("[doug-map][for='edit']")
	map.html("")
	if(map.length<1) return

	console.log("setup")
	var kmap=dougo.getmap(el.val())
	var rows=kmap.length
	var cols=kmap[0].length
	var cw=Math.floor(100/cols)+"%"
	var ch=el.height()/rows
	var cw=(Math.floor(el.width()/cols)-2)+"px"
	var ch0=2*ch/3
	var ch1=ch/3

	console.log("rows:"+rows)

	for(var y0=0;y0<kmap.length;y0++){
		var krow=kmap[y0]
		var row=$("<div  />",{class:"row"
			})
		for(var x0=0;x0<krow.length;x0++){
			var fs0=__v_to_fontsize(kmap[y0][x0].v,ch0/3,ch0)
			var fs1=__v_to_fontsize(kmap[y0][x0].v,ch1/3,ch1)
			var col=$("<div />",
				{class:"col",
					style:"width:"+cw+";height:"+ch+"px"
				})

			var str=$("<span />",{ class:"str" })
//			var hyph=$("<span />",{ class:"str" })
			var hyph=$("<br />",{ class:"str" })
			var bmap=$("<span />",{ class:"bmap" })
			var v=$("<span />",{ class:"v" })

			str.css("font-size",fs0+"px")
			str.css("line-height",ch0+"px")
			str.css("height",ch0+"px")
			bmap.css("font-size",fs1+"px")
			bmap.css("line-height",ch1+"px")
			bmap.css("height",ch1+"px")

			str.html(kmap[y0][x0].s)
//			hyph.html("&#45")
			bmap.html(kmap[y0][x0].bs)
//			v.html("&#45"+kmap[y0][x0].v.toString().substr(0,3))
//			v.html(fs)

			col.append(str)
			col.append(hyph)
			col.append(bmap)
//			col.append(v)


			row.append(col)
		}
		map.append(row)
	}
}

// TODO might be useful elsewhere
function __focus(el){
	el.focus()
	var p=el.val().length
	el.selection('setPos',{start:p,end:p})
}

//  TODO
//  - overlaps with sympred.js
//  - add delay as element attribute option passable to doug model
function initDoug(){
	$("[doug]").each(function(){
		console.log("init")
		var el=$(this)
		var binds=$(this).attr("bindings")
		var setchange=$(this).attr("bind_setchange")
		var dict_url=$(this).attr("dict")
//		var dict_url=$(this).attr("dict")
		var zmap=$(this).is("[z-map]")
		// FIX
		var bindo=JSON.parse(binds)
		console.log(bindo)

		var dougo=new Doug(el.val(),{zmap:zmap})
		el.__doug=dougo

		// Connect to dictionary server
		var cli=new Client(dict_url)
		dougo.setDict(cli)

		// as soon as we're connected query for symbol probability scores
		cli.setonconnect(function(){
			var map=dougo.getmap(el.val())
			console.log("async")
			setupmap(dougo,el)
		})
		// on async response from server update map
		dougo.setOnAsync(function(resp){
			var map=dougo.getmap(resp.q,resp)
			console.log("async")
			setupmap(dougo,el)
		})

		// set focus
		__focus(el)

		// setup map
		setupmap(dougo,el)

		var  map=dougo.getmap(el.val())

		// get signal finger number from keycode
		// returns -1 if keycode is not bound
		function mapKC(which){
			// make more efficient
			var binds=el.attr("bindings")
			var bindo=JSON.parse(binds)
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
			// update the map
			var map=dougo.getmap(head+s)
			console.log("Direct")

			//  update internal state of model
			dougo.setcontent(current)

			// update HTML
			el.val(current)
		})

		$(window).resize(function(){
			console.log("Resize")

			var pos=el.selection('getPos')
			
			// dupl from mod  sympred
			p0=pos.start
			p1=pos.end
			d=el.val()

			var head=d.substr(0,p0)
			var tail=d.substr(p1)

			// update the map
			var map=dougo.getmap(head)

			setupmap(dougo,el)
		})

		el.keydown(function(ev){ 
			var kc=ev.which
			// Switch set
			if(kc==setchange){
				dougo.nextmap()
				setupmap(dougo,el)
				ev.preventDefault()
				return
			}
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

function bindKCp(keyn,kc){
	var tgt=$("[name="+keyn+"]")
	tgt.attr("keycode",kc)

	bind_dialog.dialog("close")

	setchange=kc

	awaiting_key=false
	awaiting_single=false
}
function bindKC(keyn,kc){
	var binds=bind_tgt.attr("bindings")
	var bindo=JSON.parse(binds)
	bindo[keyn-1]=kc
	bind_tgt.attr("bindings",JSON.stringify(bindo))

	bind_dialog.dialog("close")

	awaiting_key=false
}

// FIXME onclose
function bindDialog(kn){
	var el=$("<div />",{id:"bind_dialog"})
	awaiting_key=true

	el.html("Press key")

	el.dialog()

	el.focus()

	bind_dialog=el
	bind_keyn=kn
}

function initCFG(){
	$("[singlekey]").each(function(){
		var el=$(this)
		var n=el.attr("key")
		var tgt=el.attr("for")
		var te=$("#"+tgt)
		var binding=el.attr("keycode")
		var name=el.attr("name")

		var label=$("<label />",{
			"for":"bindkey_"+name
		})
		label.html(name)
		
		var btn=$("<input />",{
			type:"button",
			value:"bind",
			name:"bindkey_"+name,
			"class":"bind"
		})

		btn.click(function(){
			bind_tgt=te
			awaiting_single=name
			bindDialog(n)
		})

		el.append(label)
		el.append(btn)
	})
	$("[key]").each(function(){
		var el=$(this)
		var n=el.attr("key")
		var tgt=el.attr("for")
		var te=$("#"+tgt)
		var binds=te.attr("bindings")
		// FIXME error handling
		var bindo=JSON.parse(binds)
		
		var label=$("<label />",{
			"for":"bindkey_"+n
		})
		label.html("Key: #"+n)

		var btn=$("<input />",{
			type:"button",
			value:"bind",
			name:"bindkey_"+n,
			"class":"bind"
		})

		btn.click(function(){
			bind_tgt=te
			bindDialog(n)
		})

		el.append(label)
		el.append(btn)
	})
}

function showCFG(ev){
	var cfg=$("#cfg")

	console.log("CFG")

	var ww=$(window).width()/2
	var wh=$(window).height()/2

	var width=ww<320?320:ww
	var height=wh<240?240:wh

	cfg.dialog({
		modal:false,
		width: width,
		height: height,
		buttons:{
			Cancel:function(){
				cfg.dialog("close")
			},
			Apply:function(){
				cfg.dialog("close")
			}
		}
	})
//	ev.preventDefault()
}

function initBind(){
	$(document).keydown(function(ev){
		if(!awaiting_key) return
		var kc=ev.which
		console.log(kc)

		if(awaiting_single) bindKCp(awaiting_single,kc)
		else bindKC(bind_keyn,kc)
		
		if(ev) ev.preventDefault()
	})
}

mobileConsole.init()
$(document).ready(function(){
//	mobileConsole.toggle()
	initDoug()	

	initCFG()

	initBind()

	// bind menu
	$(".conf").click(showCFG)

	showCFG()
})
