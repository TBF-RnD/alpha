/*
 * Format dict object as markdown tables
 *
 */

function header(alphabet){
	var retA="|      |"
	var retB="|------| "

	for(var k in alphabet){
		retA+= alphabet[k] + " | "
		retB+= "---"
	}
		
	return retA+"\n"+retB+"|\n"
}
function rows(rows,alphabet){
	var ret=""
	for(var k0 in rows){
		ret+="| "+k0+" |"
		for(var k1 in alphabet){
			console.log("finding  " + alphabet[k1])
			var  f=rows[k0][alphabet[k1]]
			if(typeof(rows[k0][alphabet[k1]])=="undefined") f="X"
			ret+=f+" |"
		}
		ret+="\n"
	}
	return ret
}

function format(dobj){
	var alphabet=dobj.getAlphabet()
	var  ret = ""
	for(var i=0;i<=dobj.degree;i++){		
		console.log(i+"/"+dobj.degree)
		ret+=header(alphabet)
		
		var level=dobj.d[i]
		/*
		console.log("level")
		console.log(level)

		*/
		ret+=rows(level,alphabet)
			
		ret+="\n"
	}

	return ret
}

exports.format=format
