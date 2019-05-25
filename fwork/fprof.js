function getFreq(k){
		  return this.data[k]
}

// Frequency profile / statistics engine
function FProf(pname){
		  console.log("Loading  " + pname)
		  var profile=profiles[pname]

		  // Convert from percent encoded
		  if(profile.format=="percent"){
					 for(k in profile.data){
								profile.data[k]=profile.data[k]/100
					 }
		  }
		  this.data=profile.data

		  // Sort alphabetically
		  var data=profile.data
		  var keys=Object.keys(data)
		  this.sorted=keys.sort()

		  // methods
		  this.f=getFreq
}
