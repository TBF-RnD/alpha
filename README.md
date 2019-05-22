_This is work in progress and only outlines the scope of what I am trying to achieve_

# Alpha - the Study of Esoteric Input Methods
The alpha project is an attempt to create a framework for research and experimentation on Esoteric input methods. 

As to make the results and technologies available to as many as possible, the code is developed using HTML5+javascript. 

This leads to platform independence and and ease of demonstration. The motive of the project is not so much to create the end all be all solution for text input, but rather to inspire programmers and computer enthusiasts alike to think outside of the box. 

As such the need for a quick way to demonstrate new technologies for an audience with an ever shortening attention span. 

## Motivation
So why try to reinvent the wheel? Aren't keyboards good enough already, especially for people who have spent years and years learning to type efficiently? Well there are some paradigm shifts that are already happening and some that are on the horizon. 

((The motivation part will be expanded and turned into a chapter / post of it's own)

###  VR / AR
Few people would question the inevitabilty of VR becomming common place  in the near future. However how do control the system. Simply using virtual versions of physical keyboards doesn't seem as a good fit. Why not leverage the paradigm shift to make a new attempt based on state of the art information theory. From the dasher project there are a lot of resources concerning how to create a mathematically and information theoretically sound method for this. 

Let's face it, carrying a keyboard with you in VR/AR would break immersion. Using a single cursor to type  on a virtual keyboard would mean immense frustration and hinder actual work from being performed. Voice seems an attractive choice on the surface  but  look closer and  you'll find huge obstacles  whhen it comes  to  error correction and also it's quite unsuitable for  work that is not closely related to language. Such as computer programming. _Let us try to avoid having VR becomming a consumption only medium_.

### Let's make tablets productive
Speaking of consumption only devices, the advent of obiqitous smartphones is an immense step forward in terms of IT-availabilty. In third words a huge amount of people have entered the IT-arena via such devices, skipping past desktops and laptops. Sadly the devices are hardly suitable for productive work, leaving the consumer with a device suitable for choosing what to consume. 

### 10" interfaces
This is one of the original goals of the project and much of  my own work is focused on button interfaces such as gamepads and remote controls. I believe that gamepads have evolved by market preassure to a state where they can utilize the full bandwidth of the human hand. (See dasher chapter for more on the bandwidth of a human hand in terms of bits per  second). _Imagine sitting comfortable in your coach, coding away with a gamepad_. With new software and the increase of remote work this might be closer than you think!

### Disabilities, the human aspect
Furthermore everyone is not able to use keyboards. To present them with an option to work on equal terms as the rest of us could open up a new world to them. If we at the same time can gain access to more communication bandwidth is it not worth it?

### Side effects in UI
Perhaps doing investigation of the most overlooked part of computer system, can  lead us to  new  insights into User interfaces. By thinking out of the Box and question the very fundamentals.

## Perspectives
With the aim of providing an as complete as possible overview of the subject, the area will be studied out of several angles. Starting with going through a list of input methods that seems suitable. 

In the first part Software algorithm the _how_ will be discussed. In the second part on hardware, the _with what_ will be investigated. The third part will focus on what is to be done, i.e. the _why_. As such a matrix of all the parts of the universe we are trying to map out can  be combined and methodologically examined. The fourth part is the meta part, that discusses the finer theoretical points  behind the various methods. Whereas the fifth part deals with the technique of implementing and putting the code into use.  

### Terminology / frequent concepts

### Software algorithms
- Dasher
- morse  code
- Chorded
- Fractal Dasher
- Quadboard
	 - Z-mapping, linear - two dimensional locality, recursive Z
	 - locality with dictionaries / corpuses as dimension
- Treeboard
- Linear Search Onscreen / 10" / VR
- Audio input
	 [dasher  googgle  talk 39:56 140 wpm  -> 14wpm, with keyboard]
- Plain old Keyboard
	 - different layouts
	 - half
- phone
- half qwerty
- T9
- audio note detection
- smartphone + word pred
- swipe  wordsg
- Velocitap
- Shape recognition [Per  Ola Kristensson]

### Hardware / Devices
- Plain old keyboard
- gamepad 
- remote control
- touchpad
- one/two signal input
- type with mouse
- eyetracker
	 - opengazer
	 - with dasher -> P.O. Kristensson
	 - akavel
- VR finger tracking
- audio note
- make use of rhytm /  timing
- custom hardware
- smartwatches (Keith Vertanen)

### Application / Use cases
- people with disabilities
- ergonomics
- education
- noisy / shaky environments
- 10" interfaces
- increased typing speed / user input bandwidth
- typing while gaming
- prima materia of computational usage, the universal alphabet, applied to UI
- turning a tablet from a consumption only device to a portable workstation
- how to type in VR
- Art write statistically as 
- Autoverse / autorhyme
- One language in, many out 
- taxonomy of thought, from sub-symbool to taxonomy
	 ->  also relating  to  languages  such as Korean,   Japaanese 2k, Chinese 6k see gtalk 46 ish

### Theoretical point of view
- Zipfs law
- Fitt's law
- compression algorithms
- user input bandwidth 
- text input models
- neurological latencies
- word 2 vec
- Languages - dialects
- change of mode  cognitive  cost [googgle talk 13;15]
- Shannon
- semantic primes

### Technique - a framework for comparision
- Windows integration
- X11 integration
- Android integration
- Protocol for universal symbol emission
- Efficient text rendering
- Marketing novel user interfaces to a broad audiance
- Implementation of math editor
- Web browser extension for 10" interface leveraging readily available consumer hardware
- The UNIX shell as an alphabet, moving the language into the keyboard
- Asychronous sending of statistical data along with prediction, delays and bandwidth constraints

## I: Dasher, zoom through the tree of all possible books
The first implementation that is being investigated is the Dasher input method. 

[Chapter 1: Dasher](https://github.com/TBF-RnD/alpha/blob/master/Ch_1.1_Dasher.md)

## II: Chorded, multiple keys at the same  time 
[Chapter 2: Chorded keys](https://github.com/TBF-RnD/alpha/blob/master/Ch_1.2_Chorded.md)

### Proposed improvements  
- Non-linear use of two dimensional screen estate
- Sorting symbols according frequency instead of alphabetic order
- In accordance with Fit's law present more likely symbols closer to the cursor

## II: Chorded
Going back all the way to the mother of all demos, this input method refuses to go away.  

### Pros
- Good bandwidth 
- Small space requiremenets

### Cons
- Steep learning curve, worse with different languages

### Proposed improvements
- Make use of HUD as fall back on user memorization miss
- Velocitap style correction, present tree with suggested error correction
- multidimensionality by dictionary, tree node size

## Targets
- Web - HTML5/js
- Win
- Ubuntu
- Mac
- Android
- Android TV

# Resources
- Dasher
[Inference group Dasher](http://inference.org.co.uk/dasher)
[Google Tech talk on Dasher](https://m.youtube.com/watch?v=wpOxbesRNB)
[David Wards thesis](http://www.inference.org.uk/djw30/papers/thesis.html)
- Bill Buxton
[Microsoft Research Profile](https://www.microsoft.com/en-us/research/people/bibuxton/)
- Stephen Hawking
[Hawkings typing software as open source](https://www.wired.co.uk/article/stephen-hawking-software-open-source-intel)
- Akavel
[http://akavel.com/](Precise Eye Tracking)
- Keith Vertanen,  smartwatches, velicotap a lot of good data sets  participated  on Dasher a lot of excellent papers
[https://www.keithv.com/software/](keithv.com)
- Per Ola Kristensson
[http://pokristensson.com/](Short hand writingg, velicotap)
