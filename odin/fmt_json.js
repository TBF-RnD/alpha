// Exports dictionary object as json
function format(dobj){
	return JSON.stringify(dobj.d)
}

function format_dict(lobj){
	return JSON.stringify(lobj)
}

exports.format = format
exports.format_dict = format_dict
