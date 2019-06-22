function __focus(el){
	el.focus()
	var p=el.val().length
	el.selection('setPos',{start:p,end:p})
}

