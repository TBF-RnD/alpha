# Sigma - an erudite project

The sigma project was a serious attempt to test out prototypes of input methods. In an now abandoned attempt to gauge the learning curve and speed of users. As such it was implemented as a game in a rather playful manner. In spite of the  somewhat silly appearance some very interesting conclusions are to be drawn from  the project. Don't judge a book by it's cover. 

The methods that where investigated where the following:
- plain old, by cursor
- tree board
- quad board
- linear

Plain  old keyboard is added as a comparison to see if improvement could be done. Linear is an attempt to do a worst case scenario namely a linear  search.  

## Quadboard / Beta - project
Beta was an attempt to help people with disabilities. It is by design usable by only one hand. However it had other characteristics that might make it useful for other applications, following the principles of Universal Design. 

 - 10 foot interfaces
Basically in it's original setup it is meant to be usable using only a numpad or say the buttons of a remote control. In the spirit of generalization this could also be applied to game pads. 
- International input
Whereas chorded keyboards and plain old keyboards among current technologies have the highest input rates they have done trade offs to reach there. First of all they require a user to start training at an early age and still he can only master one language at the time. 
- Mathematical input
Where this method finds it's sweet spot is probably in math editing. Where the limiting factor isn't speed, while mathematical notation  already is very compressed. Furthermore it's hard to draw statistical relationships between symbols and what is to come next. Presenting a multilayer tree over 12 keys gives the following effect. One grid can be assigned as a numpad with the symbols 0-9, there's  a loss of one button press. Another grid could have 12 related trigonometric symbols at the first level. Deeper levels can  be added to make room for hundreds of more symbols easily. In conjunction with a mouse it results in a well optimized workflow. 

### Initial implementation
The first implementation was done rather quickly and implemented in C running on Ubuntu Linux. The selection logic itself is rather simple to implement however the X11 code seemed to be a hurdle. Implementing a software keyboard poses some interesting challenges and as such rules of thumb that applies elsewhere might need reconsideration. 

First of all low resource usage is off essence. Also it's necessary to access low level operating system procedures. These things made C the seemingly perfect choice. 

Careful consideration has to be taken to input delay and  low resource usage. Since the software is meant to be running all the time it ought not hog up system resources. Consistent delay is  almost as  important as  low delay as inconsistency increases user frustration. 

C turned out to be a really bad language for quickly prototyping especially given that there where no suitable cross platform rendering engine.  As such further efforts are made in JavaScript where rendering engine of DOM elements  and text is readily available. It also leads to a ease  of demonstration. I'd strongly advice against using C for prototyping similar projects. 

The problem-space itself seemed to be a good fit for the tree based DOM nature of JavaScript development along with  readily available datastructre to ease development. 

### Quadbord math editor
Given the digitization of nation wide tests worldwide there is a serious need to adjust input. As such a demo of the beta-method/Quadboard was put together to edit latex commands. A good balance between ease of use and power is achieved by having the latex commands in  tandem  with a live preview. No clear standard for math input exists however, Microsoft is here going the route of UTF-8 symbols. The Quadboard  method is quite agnostic to the underlying  structures however.

### UI conclusions
It's of great importance to create a window that is out of the way for the user. To make this happen the following features are used:
- Stay  on  top
Window always above other windows
- Transparent
The window is see through
- Move by hotkey
Use standard X11 feature to use  alt + drag to move window
- Resize by hotkey
Use standard X11 feature to use  alt + right click drag to resize window
- change opacity
Use alt + scroll wheel to adjust opacity 

The UI considerations make the program much less intrusive given that the user are aware of them. Mitigating the problem of the onscreen keyboard taking up valuable screen estate. 

### Suggested Improvements
For text entry itself the results where not that impressive, however note that this is without having word prediction. Following the left  right hand task division that we've learned from  Bill Buxton, we can envision a system that works like this: the left hand selects single letters whereas the right hand selects from word predictions. The limitation with touchscreen QWERTY text-completion is 
A: few options 
B: context switch. 
with a tree based prediction many more predictions can be shown, easily 144 with two key presses. This  could be on a sub-word level,  word level or phrase level.

Furthermore the menu system used for selecting symbols could via a mode switch button be used for any tree of input. That means that a key press on shift would give you access to the applications menu presented in a very search  optimized manner.

## Tree board
Look closely on the definition of the Quadboard above and you'll find that in fact is nothing but a graph. As such the Quadboard is in fact an edge case of the tree  board for purposes of search time calculations. It performs better than both the Quadboard and the onscreen  

### Huffman coding
After realizing that the quadboard in fact was a tree. It seemed obvious to investigate having unbalanced trees and also trees  with different amounts of nodes per branch. If we sort the symbols  by frequency what  we end up with is Huffman encoding done by the user.  This correlates to what I later found out that had been the idea behind the Dasher project. The dasher project however used the more recent arithmetical coding and focused on continuous input rather than discrete. 

## Linear board
This was meant as a worst case scenario. Interestingly enough when combined with a static menu to the left and a dynamic menu to the left it is quite usable. The PPM-like n-gram symbol  detection system gives good predictions. So the word is seeded by the static  left  menu and then only small movements 1-3 symbols are needed on  the right.   

## Usefulness of dynamic highlighting based on estimated value
By using a highlighting system based on the PPM-model symbols where not moved according to their probability. Instead they where given a brighter color from their predicted value scaled through a log function. The same goes for the size of the letters. The improvement that this entailed can not be understated. In one unpublished experiment the quadboard was successfully used  against a  classic Chinese text  with thousands of letters. These could be found from the brightness using 12 keys at around 20wpm. This allows for a synthesis of muscle memory, i.e. relating a where on the screen to an action with dynamic feedback.

## Conclusion
Whereas the most interesting prospect for the systems above might be the integration with more advanced prediction system and integration with operating system facilities on a frequency based tree level  some very interesting conclusions can be drawn. More so a dual system  where one finger handles symbol  selection  and the other word prediction might be of interest.  

##  Online resources
[Sigma site](http://sigma.eruditenow.com)

[Theory](http://sigma.eruditenow.com/theory)

[github](https://github.com/richard-jansson/sigma)


## Videos
[Videos](https://www.bitchute.com/channel/eruditenow/)

[Keyboard vs. Tree-method](https://www.bitchute.com/video/aKl7jUrtcOt8/)

[Introduction video:](https://www.bitchute.com/video/FklGhgQGbuDk/)

[Gamepad  support](https://www.bitchute.com/video/jqM0f6r06Kwx/)

[Linear](http://depts.washington.edu/ewrite/)
