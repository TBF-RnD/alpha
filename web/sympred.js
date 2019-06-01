// Console for mobile development
mobileConsole.init()

					

//  Not extremely good practice but it works
var dictbtnstring_head='<div class="btn-group-toggle" data-toggle="buttons"><label  class="btn btn-outline-secondary active btn-group-toggle"><input type="checkbox">'
var  dictbtnstring_tail='</label>'

function renderDicts(dictinfo){
	var cgroup=$("#dicts")
	cgroup.html("")
	for(var name in dictinfo){
		var w=dictinfo[name].w
		console.log(name+" "+w)
		var row=$("<div  />")
		cgroup.append(row)

		var btn=$(dictbtnstring_head+name+dictbtnstring_tail)
		row.append(btn)

		/*
		var btnlbl=$("<label />",{class:"btn-group-toggle"}).html(name)
		var btn=$("<input  />",{class:"btn btn-outline-secondary"})
		btnlbl.append(btn)
		row.append(btnlbl)

		var cbox=$("<input  />",{type:"checkbox"})
		row.append(cbox)
		console.log(cbox)
		console.log(cbox)
		var name=$("<div>").html(name)
		var weight=$("<div>").html(w)
//		var wbar=$("<div>",{class:"pbar"}).progressbar({value:w*100})
		var wbar=$("<div>",{class:"pbar"})

		row.append(cbox)
		row.append(name)
		row.append(weight)
		row.append(wbar)

		*/
		cgroup.append(row)
	}
}

// update positioning of "suggestionBox"
function updateSuggest(el){
	if(!el.is(":focus")){
		$("#suggest").hide()
		return
	}else{
		$("#suggest").show()
	}
	var pos=el.selection('getPos')
	var coord=getCaretCoordinates(el[0],pos.start)

	var suggest=$("#suggest")
	suggest.show(0)

	suggest.css("top",(coord.top+18)+"px")
	suggest.css("left",coord.left+"px")
}

function setSuggestions(list){
	var ul=$("<ul />>")
	var sbox=$("#suggest")
	for(var k in list){
		var sym=list[k]
		var li=$("<li />").html(sym)
		ul.append(li)
	}
	sbox.html("")
	sbox.append(ul)
}

function initSymPred(){
	//  create library object  containing dictionaries
	var libo=new Library()

	libo.loadData(library)

	var dictinfo=libo.getDictInfo()
	console.log(dictinfo)
	renderDicts(dictinfo)

	// Find all DOM elements with sympred attribute and set up  event bindings to the model
	$("[sympred]").each(function(){
		var  el=$(this)
		updateSuggest(el)

		var spred=new SymPred(el.val())
		spred.setLibrary(libo)

		spred.onupdate(function(cnt,list){ 
			el.val(cnt)
			setSuggestions(list)
			updateSuggest(el)
		})

		el.change(function(){
			console.log("Changed")
		})

/*		el.on("input","input:text",function(){
			console.log("input...")
			spred.setCurr(el.val())
		}) */

		//  handles backspace, ctr-c,ctrl-v etc
		//  todo get predictions from new cursor pos
		$(document).on("input",function(){
			var pos=el.selection('getPos')

			updateSuggest(el)
		})

		el.keypress(function(ev){
			var el=$(this)
			var pos=el.selection('getPos')
			var s=String.fromCharCode(ev.which)
			var d=el.val()

			spred.insert(s,pos.start,pos.end,d)

			ev.preventDefault()
		})

		el.focus(function(e){ updateSuggest($(this)) })
		el.blur(function(e){ updateSuggest($(this)) })
		el.keydown(function(e){ 
		//	updateSuggest($(this)) 
		})
		
		el.keyup(function(e){
//			var el=$(this)
		})
	})
}
$(document).ready(function(){
	initSymPred()	
})
