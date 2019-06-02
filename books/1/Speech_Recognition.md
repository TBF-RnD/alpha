# Speech Recognition
Speech recognition is like written  word recognition one of the most looked at methods of input. Due to the vastness of human language especially in it's spoken form it's a monumental challenge. Still given that it gets so much attention a breakthrough will happen sooner or later.  My bet  would be on  sooner rather than  later, but it is seemingly inevitable. Also the success varies from implementation  to implementation and also from language to language.

## Ambiguity & Error correction
Speech recognition is a matter of probabilities. Given a certain audio clip as input most algorithms will have several options and will assign them different probabilities. There might be two really close matches but only one of them can be presented. Within the Dasher sphere an attempt  to demonstrate mitigate this particular problem has been put forward. 

The real problem happens after the error. Speech recognition clearly demonstrates the worst case scenario for error recovery. What will happen is that after the error the user has to tell the computer to replace the word,  by no means an efficient operation  in terms of bits compared to for instance selecting  with a mouse.  

When the painstaking selection process is over alternatively a complete rephrasing of the sentence, we have the next problem. If the engine did not understand it the first time why would it do it the next time? The only way out is to spell out the letters individually.

## Contextual understanding
Human beings have a very developed and complex way of communication  inter-personally. A lot of it can happen without even speaking. Common sense plays a large part of this and given an ambiguity of whether you heard say "right" or "wright",  you can easily deduce from the context which is the correct  one.  

Rule based analysis as assistance. Grammar plays an important role here. If a good model of the grammar is built up it can serve as a sanity check / checksum on however the prediction was good enough. This would probably have to be in combination with a statistical approach as grammar never is applied as neatly as linguists would have hoped. Grammar still serves as a useful tool to narrow down the subset of words that might be viable. Also it can be done quite cheaply in terms of resource usage.

## Universal design
Following the concept of universal design, we can easily define scenarios where each and any of us would have a speech impediment. The most obvious would be a noisy background. Walking even has been shown to have an effect of speech recognition software. Also imagine trying to use   a  speech recognition engine that is trained for a different language than yours.

## Use for programming
A case where speech recognition in a specialized implementation might fare very well is programming. Programming languages can easily be transformed into an Abstract Syntax Tree, a structure defining the relations between the elements. C for example would have a vocabulary of about 80 reserved  keywords.  So ambiguity is  greatly reduced  compared  to the 100'000 or so words in English. Variables and constants will add to this however but upon definition the speech recognizing software will now that it is dealing with a new word  and upon a variable statement it has a definitive set of options. Here the situation is very black and white the software will have a good, if not better idea of  what is right and wrong. This all depends on a tight integration with the compiler, versioning system and perhaps even issue tracking systems.

## Internationalization
Current methods of speech recognition depends on huge amounts of audio clips of spoken word along with the words being spoken in text format.   Given this algorithms can be trained to learn how to correlate the audio to the text. 

Needless to say this causes some issues. First of all not only do we have to collect data of vast amount of people along with what they are saying in a text format, it also has to be done in all the different  languages. Whereas international usage is not exclusively prohibited by this fact, it will cause a delay in adoption.  

To make matters worse not only  would  training sets need to be done for English for  example.  But also for English spoken with a Russian,  Swedish, German accent and so forth. Even within the U.S. and  Great Britain you'll find  vast differences in  pronunciation. Input methods are  supposed to expand our way to express  ourselves not confine us to a particular set of rules, narrowly defined by machine limitations and lack of cultural perspective.

## Remote analysis
Currently due to the complexity of the issue a lot of the speech recognizing analysis is done remotely, in  "the cloud" so to speak. That having a microphone constantly relaying off audio to a remote server is a major potential  privacy catastrophe is  hardly an understatement. Apart from that it introduces a delay and what is worse it requires an up-link to work. Imagine a society growing to dependent on  ubiquitous network connection that is heavily reliant on cloud based speech recognition  - what would happen during a power outage, would they be able to use computers at all?

Furthermore if a huge data-set is required for efficient data usage, a monopoly situation that is comparable to the windows lock in of the 90's and 00's. Network effects would make one provider the only viable solution and giving them total control. Even had there been alternatives the investments required for them to surpass the leaders  advantage might be insurmountable. Investments made by government even might not suffice to create viable competitors. Even though not inherently malevolent, the odds of an organization keeping good track of the data gets lower and lower as a function of time and growth of the organization. 
