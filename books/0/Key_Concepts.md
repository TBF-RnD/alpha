Here we discuss some key concepts, that will be used in discussing and analyzing the various input methods.  

# User memorization failure recovery 
Writing text is unfortunately not error free and no method can be said to be completely without error. So when investigating errors we have to  look at two things.  First of all the likelyhood of an error appearing. The second thing is the time that is spent on recovery. For a well trained plain old  keyboard user this is done by second nature and probably is done without reflection. Method's such as speech recognition however perform very badly in terms of error recovery as a whole word or a sentence have to be respoken. Often it's necessery to specify commands for which words to correct. Not only do we here find a worse expected error recovery time, that would be defined as error probability times average recovery times than a keyboard, even though the keyboard had a higher error recovery rate. To correct an error with a keyboard can be done without an expensive context switch.  

# Fitt's law & Steerings law
Fitt's law is somewhat of a pillar in user interface design. It states that the likelyhood of an error occuring when a user is to select an element increases when the size of the object get's smaller and the distance increases. This might seem obvious but the formula can be used to  calculate mathematically the error rate for a given set of actions. Steerings law is a continuation of this however it is used to calculate the difficulty of steering through a path, i.e. selecting several elements after each other.  

# Statistical distribution of letters and words in text
Zipf's law named after linguist George Kingsley Zipf states that the frequency of a word from a given corpus in a text is inveresly proportinal to it's position in a list of words sorted by frequency. That means that words such as the and by have a likelyhood of a couple of percent. This quickly decreases and around one houndred words would constitute half of the written text.

If we take a look at letters instead of words we'll find a similar distribution. The 4 most probable words in a language might account for 20% of the characters. Z in English for example have a probability of a fraction of a percent. 

Two conclusions can be drawn from this. One all symbols are not equal and it would make sense to make it easier to write the more frequent symbols. Two, given a system based on memorization it'll be easy for a user to memorize the most frequent symbols and or words however the less frequent will appear more seldom and will be much more prone to be forgotten.

Furthermore given two languages using the same or reminiscent alphabets, lets say English and German - there will be a different ordering on the frequencies at which they appear. As such this profile can be used to discern between languages. 

# Muscle memory versus assisted method
One way to discriminate between methods are however they rely upon "muscle memory" or if they rely upon data that has to be processed by vision first. While writing on a plain old keyboard for example, nothing changes between the keypresses and as such there is no delay in  the "wetware" caused by having to process visual stimuli. 

On the other hand we have assisted methods which moves some of the complexity of the system into the computer itself, as such the user has to get updated information for example visually before knowing what symbols will be produced by a given action. Examples of this would be the Dasher method and some of the Sigma methods. 

Obviously the disadvantage of the assisted method is that it causes a delay. So why use a method that requires a more advanced response. Well for a number of reasons. First of all with a dynamic table that relays few input signals to several options fewer input signals can be used for the same task. Furthermore by using the computers vast computational power the delay can be compensated for by providing what effectivly is data compression. The hope here being that with a more advanced model of text the net gain will be increased bandwidth.  

Assisted method to ease learning curve. By presenting the available symbols along with the actions required to get there, a user that fails to remember a certain symbol can quickly recover by looking at the screen. In a way a plain old keyboard already does this, if you fail to remember where say "[" is on your keyboard a quick glance at your keyboard will remind you. With the data onscreen at all times all that it would take is to move your eyes a few degrees. Metods such as morse code and or chorded stenography does not offer this respite and this explains at least in part why they are not widely in use,  despite their advantages. 

Whereas the plain old keyboard method has a form of assistance built into it, this does not translate universally. For example if an English-speaking user where to switch to a Greek keyboard layout he'd  be without this feature. Allowing for a universal principle here would not only allow the user to write greek but also to quickly formulate equations using Greek symbols.

When it comes to QWERTY on touch we often see predictions on top of the screen in modern implementations. This can be seen as a prime example of assisted writing. 
