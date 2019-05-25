# Chorded keyboards

Chorded keyboards is one of the most discussed alternative approach to keyboards. This is not very surprising as the concept have some very interesting advantages. Several hardware implementations have been made and profficient users see really good input speeds. This is not to surprising since if we take a look at the math we'll find some interesting  

## Left hand for keys, right for mouse
Whereas one thousand symbols seems to be way to many, we can get away with less fingers. Obivously remembering that many combinations seems to be an insurmountable task, but more on nemorisation later.

As a matter of fact some of the early experiments done on User Interfaces done at Xerox, featured chorded keyboards. The setup was created so that the left hand was meant to provide chorded input, leaving the right hand to operate the mouse. These experiments came to define how we use computers for decades, with very little change. At the time the hand operating the mouse had more actions available, to work better in tandem  with the left hand giving digital input. 

## More signals equals more bandwidth?
Let's start out with the most obvious. While using a "plain old keyboard", the user have ten fingers available. However only one key can be entered at the time. While using a chorded keyboard however a combination of button presses gives the selected symbol. As such any given event may be one of 2 to the power of 10, i.e. 1024. This is way over and beyond the required  input signals that we need for entering the 20-30 or so symbols in a given alphabet. 

### When to sample
The astute computer scientist will spot one interesting issue howeer. Since a human being is incapable of performing a physical action simultanously and instantanously, how do we know that an action is completed. So for example if we get the signal (0,0,1,0) how will the software "know" that this is the intended action. Perhaps the user is trying to enter (0,0,1,0), but he might as well be on his way to enter (1,0,1,0), only that his first finger is lagging behind ever so slightly. 

The word chorded might make you think of guitars and this is an interesting analogy. Research into human interface design divides the use of the human hands into two disctinct part. One hand that is performing an action, and one that is holding the object. For instance imagine painting an egg for easter. One hand would hold the hand and the other would do the fine mechanics of creating the art. We see this quite clearly in that very few people are ambidexterous. So given the guitar interface how does it deal with the sampling, yes the left hand enters the input signals and when done the other hand commits by hitting the string. 

When we come to computers I see two options for deciding when to send the signal to the interface.  Both with advantages and disadvantages. The first idea is to have one button to commit the siginal. This means that if we have one hand for writing we'll have one signal less. That is a 5 hand chorded input is only capable of delivering a symbol 4 bits wide instead of 5. Yielding 2 to the power of 4 combinations instead of  2 to the power of 5. That means 16 symbols to choose from instead of 32. However this approach doesn't limit the rate that we can write in. 

The other approach would be to sample the signals at a given time. That is we introduce a delay or to continue our musical analogy introduce the concept of rhytm. If we go with this approach instead we'll have 32 keys. That sounds very well, but now we are limiting the bandwidth by the amouunt of samples that we take per given time. To adjust this to a setting that works across a wide range of users from novices to profficient users will be difficult. 

### No key 
The astute computer scientist will have another remark on my numbers. Obviously a subtraction of one has to be  made to all of the numbers above for no key. If no button is pressed at all, that is a  (0,0,...0)  input signal the keyboard should not enter any symbol.

## Travel distance
One advantage of the chorded method is that it saves space. A device can be made to fit the hand, as a matter of fact it would be contraproductive to make it much larger than a human palm. So we get a space saving feature that makes it versatile and fit for usage with a mobile user. Another advantage of this is that the delay from the physical movement from one key to another is removed.  According to Fitt's law  this reduces the eror rate. As stated earlier Fitt's law defines the rate of error due to travel distance.

## Memorization
So with so many desireable characteristics why are not the chorded keyboards commonplace. Well the thing is that for a user to use the system the user have to memorize so many combinations. The power law distribution tells us that for the most common symbols  this ought not be a problem.  But for letters such as z that have a frequency of well below 1% this poses a great drawback. The error recovery mechcanics of the chorded design is notoriously bad. For every error the user have to look up the chord in a cheatsheet. Here we see a divergence from the guitar analogy. Most songs written for guitars only use a few chords, i.e. a small subset of the alphabet. As such to play a given song the chords can be memorized. Ask a guitar player to play any song and he can't comply until he has trained on that particular song.

## Incompability with touch
Given a multitouch display it would be possible to capture as many fingers necessery to provide the signal input. However in most scenarios 8 of the users 10 fingers are used to phsyically support device. This rules out having one key to determine when to sample the signal, as that would leave one input signal.  Given one signal the need for having a commit  signal  is removed  so that would leave us with the rhymtm based sampling method. Whereas a 2 bit input signal  with some good will could fit a abstract theoretical definition of chorded, it doesn't  seem to fit the spirit of the concept very well.

## Summary 
Whereas for some nieche areas the chorded keyboard is used with great success for end users it seems simply not to be viable in it's current form. The format has it's advocates however and the concept lives on despite it's drawbacks. Given the comming VR/AR paradigm shift the concept is gagining a lot of interest again from a lot of companies.

### Pros
- Theoretically unbeatable peak performance
- Useful for scenarios with mobile users
- compatible with gloves capturing finger positions

### Cons
- Steep learning curve
- Bad User memorization failure recovery characteristics 
- Not compatible with touch

## Proposed improvements
Leaving out tablets and smartphones which in it's  current form seem to be utterly incompatible with chorded input, what can be done to improve the methods viability? Well first of all we can mitigate both the learning curve and the error recovery rate by providing on screen assitance at all times. All of the sudden the power law of symbol frequency distribution works in our favour. The top 20-40% of the keystrokes would quickly be memorized and accessed via neurologically low latency muscle memory. For misses in this "wetware" system, the user refer to an onscreen reference constantly represented on the HUD. So if the user forgets the given chord for an unlikely key such as z, the user only have to  use his eyes to scan the screen to find it. Furthermore the software might predict the most likely incomming chords and might with good accuracy present the most likely incomming symbols with a very high accuracy.   
## TODO:
write about Plover
