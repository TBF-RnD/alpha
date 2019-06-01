# Dasher input method
Whereas most input methods here at least have roots that go very far back, a relatively recent attempt, is the Dasher method. With its theoretical heritage in Information Theory, it provides an excellent source of thinking strategies that are useful when dealing with text input.

[![Demonstration](https://img.youtube.com/vi/0d6yIquOKQ0/hqdefault.jpg)](https://youtu.be/0d6yIquOKQ0)
[Demonstration](https://youtu.be/0d6yIquOKQ0)

It was originally developed by David JC McKay and David Ward. David Ward wrote his PhD on the subject - which you can find below. Currently it is being administered by the inference group and is supported by the Gatsby Foundation and the European Commission. 

At first glance, the Dasher input method looks very strange. However, if you think of it as a top down racing game, you'll understand it quite quickly. For comparison: imagine the shock for someone who was used to writing with a pen for his entire life when presented with a typewriter\*. When presented with using the method however, most people catch on quite quickly. Once you get a short introduction to the Why behind the setup, you'll catch on without much difficulty; something that has been demonstrated scientifically as well.

Some offshoots of the Dasher Tree of Methods look really interesting. A lot of the people involved with the project have after participating done a lot of interesting work in the field. So where you won't see Dasher being commonly used, it is fertile soil for further investigation. Where it really has shown its usefulness is within its application for people with disabilities - where it has helped a lot of people to gain a level of communication that most of us take for granted.

Coming from a very technologically solid point of view, the algorithm can be controlled via basically any input deivce. It can be used with a two axis input or with as little as one input signal. Showcasing the usefulness of having good abstractions and then looking through all possible generalizations. 

## The Math Magic
Still, to fully understand Dasher, a bit of math is necessary. Each of the symbols in the alphabet is presented in alphabetical order (more on this later). They are however of different sizes. The size that they are given are calculated on the basis on their probability of appearing after what you have just written.   

Without taking the previous letter into account, the letter E has a probability of around 10-12% in English text. Z on the other hand is the least probable, with a probabilty of only 0.07%. This means that if we make it easier for the user to select an E than a Z, given the correct frequency distribution we will on average see an improvement in writing speed.  

The genius here is that the onscreen representation basically is Arithmetic coding, where symbols that are frequent are replaced with short replacements and less frequent ones with longer ones. This only works if the distribution has the correct properties, of course. For completely random input where each symbol has the same probability, it would lead to an increase in size. With a power law distribution that we find in written language, it gives us an advantage however, with the hitboxes for the more frequent letters being bigger. 

When applying Fitt's law on this, it plays along quite nicely. Where Fitt's law states that for a low probability of error, the box should be as close and as big as possible. As such, there would be a low frequency of errors on the probable letters. 

This chapter is not to meant to be a source of explanation of either Arithmetic coding, nor Fitt's law. Other minds have made better and are much more suited to provide easily understandable explanations on the subjects. For this context, a rudimentary understanding is more than sufficient. Look for more info under Further Reading.

## How it works in practice
The user controls a cursor with, say, a mouse. When moving the cursor to a box containing a letter, said letter is selected. This box in turn contain more letters, however the sizes of these are dependent on the probability of the child letters coming after the parent letter (to be precise, all the ancestors).  

Basically the horizontal controls adjust the zoom and the vertical controls adjust where the zooming is to be done. Interestingly enough, the space which you operate on is not cartesean but rather hyperbolic, so that you can zoom through a tree of books that just keeps on expanding.

One way of understanding writing with Dasher that is useful for understanding the genius behind the system, is to see it as navigating through the tree of all possible books. More probable letters given the book, they are easier to find on the account of them being bigger. 

As you are typing with Dasher, you'll quickly find series of letters that are the words that you are trying to write, allowing you to "dash" through those in order to write the text.

## PPM-model 
The scope of this chapter doesn't allow for going into the ins and outs of the PPM prediction model. What it does in essence however is to predict the probability of a letter appearing after a series of other letters. 

It's an old model that is used for arithmetic coding and can among other things be used to deterimine the language of a text (source needed).


## Theoretical throughput
Keyboard clocks in at around 6.3 bits per gesture by selecting from around 80 bits. English language ought to have a theoretical bandwidth of 1 bit per character however. So comparatively it is off by a factor of 6. 

Compared to the 1 bit per character predicted by Shannon, PPM typically produces a compression to 2 bit per character. As such given a better algorithm, it would be possible to theoretically double the input speed.

A keyboard is also limited by the reason that it can only input in two steps. Whereas the human finger is capable of analog input. Utilizing various levels would obviously mean higher througput if this is practically doable. 

Bandwidth of visually oriented pointing according to Drury and Hoffman, ought to be 14 bits per second. That means that with a perfect model of the English langage, the system would be able to enter text at 14 characters per second. Multiply that with 60 and you have no less than 840 characters per minute or around 170 words per minute. Bear in mind that this is only using one finger.  

## Practical throughput
In UIST2000, it is claiemd that a typical keyboard user would output around 40-60 wpm. However I'd say for people who are working profesionally with computers would score at least twice of that. Most programmers would score at least 80 and at best around 120 wpm (citation needed). Dasher's top score however would be 34 wpm, which is not bad considering that it only uses two input axes. So this means that a skilled Dasher "typist" could almost write as quick as a slow keyboard typist, using only his thumb! Compare the Dasher scores with the input bandwidth of keyboards of modern smartphones, which I'd estimate at around 20 wpm.

## A system with a bias toward coherent text
Consider giving Dasher totally random input. The system has a bias towards writing statistically likely words. As such random input is likely to produce somewhat recognizable sentences. As such if you just put in a vector as input, you'll have output that sometimes resambles intellegent communication. Compare this to how text can be generated by using Markov Chains, where words are the subject instead of letters. Here, we are doing what spam bots are doing, but we operate on a symbol level rather than on a word level. Compare this to randomly bashing at your keyboard or doing random voices. This is a way to understand the system, it is more likely to do what you want. If we follow this trajectory, then we begin to understand what truly can be achieved if we extend this mode of thought as far as we dare. Where the model step by step is modeled to create better predictions of what we are trying to communicate.

## Use in conjunction with speech input
One very interesting application is an attempt to use Dasher in conjunction with speech input. The problem with speech recognition is how devastiting the occurence of an error is in terms of recoverability. Compared to what happens if you press the wrong key on a keyboard by mistake, where one press at the backspace button replaces the new key, and you are good to go again. The experienced user might do it hundreds of times during the course of the day without even noticing. When we are dealing with audio input however, the probability of an error is quite high to begin with. What makes it devastating from a usability point of view is that two words might sound similar. A setup with Dasher where the algorithm presents the potential matches scaled according to frequency creates a usable tandem system, which mitigates the problem. See Keith V, below.

## Use for eye tracking
What impresses me with David McKay and the other people behind the Dasher project is their ability to solve problems by making generalizations. So given one of anything they try to replace the constant and go for the extremes, thus mapping out the extremes of the terrain where proper solutions might be solved. As such, they think of not only _one_ input signal, but in terms of _any_ input signal. As such, any input method can be used. Therefore eye tracking is a given. Check out the youtube videos below for the human aspects of their work, which is not to be forgotten.

## Use for the blind
Correlating very closely to the original idea that got me interested in the subject, a proposal has been made for the blind, where in practice a binary search is used over a frequency tree. This would in fact instead of being arithmetic encoding be an implementation of Huffman encoding. More on the use of Huffman coding and text-input in a latter stage where I'll present an algorithm based on N-ary Huffman trees. This is not explored very much elsewhere, but is described in the Google Talk youtube-video.

## Comparisions with other methods

| System       | WPM       |
|--------------|----------:|
| Half-QWERTY  | 34.7      |
| Chorded TCK  | 16        |
| Touch QWERTY | 32.5-21.1 |
| hex-grid     | 43.7      |

## Potential usecases
First of all, let's take a look at how dramatic an improvement this software can have on human lives. A subject with ALS was able to achieve his bachelor thesis due to the help of Dasher.

A place where it would seem to be a good fit would be for writing text on smartwatches.

Dasher can take the menu information from a GNOME appplication and present it as an alphabet. Controversial as it may have been, Unity made a very underestimated step forward in UI, in allowing users to type alt or meta and search in the application or on the system after that. It lives on in Windows interfaces, however in a more primitive form, and without the feature of searching within applications.  Something that comes in handy very well when looking for a rarely used feature in say libreoffice. 

## Propposed improvement
One problem with the Dasher system is that small letters disappear. This creates two issues. First of all, if you are writing in a foreign language, say Greek, you might not be familiar with the letters' order. So there is an assumption that the alphabetic ordering is given where it really is not. With the help of alphabetic ordering, the correct letter can be found. For someone typing in Korean for example there is a color coding system, but if you are an English speaker trying to start writing in Russian, you're out of luck.   

What the problem boils down to in essence is the use of screen estate. What happens here is that we are trying to fit as many things on a 2d surface on a line. This is obviously inefficient. Rather than doing that, a more 2d-esque approach would be helpful. Where we at best with a linear approach could go from the top left corner to the bottom right to get a diagonal line, we could with a circle or an ellipse make better use of the 2d surface - as we can make a circle with a larger circumference than we can create a straight line.

By following this reasoning, I would suggest instead an approach based on fractals. Every other edge would be a symbol and the next "edge" would be a recursive continuation, showing more letters and holes filled with continuations on the fractal. See below for someone elses ideas on Radial Dasher - which in essence mirrors my idea.

There exists an Android app for this, which you can find on Google Play Store. Since Dasher is designed before capacative touchscreen become commonplace however, there is a drawback. While putting the finger where you are supposed to go, you hide the displayed data behind. This is easily fixed by adding a control rectangle elsewhere, in the same fashion as controls are made for games on smartphones/tablets. 

## A dual mode for gamepads or left or right thumb 
It would be interesting to see a dual Dasher input system. The left thumb for exammple could select with a Dasher tree from a set of probable words whereas the right thumb would select the letters. This would double the input bandwidth. The other system also could be tied to using commands, say for example to map one of the modes in the VIM editor to the left thumb. To take this even further and use all fingers for cursors seems improbable however, but worth consideration. This really plays into the left-right hand holding-painting dualism that is applicable in so many areas of HID.

One line of thought that I find really interesting in UI, is giving elements a physical feel. So if you slide down a menu, it has a momentum that gives it a natural "feel". Implementing a newtonian vehicle, like feel to the cursor, might have advantages. Partly because it would help by using what I suspect is natural prediction mechanism built into the brain. From a theoretical point of view stringing letters upon a curve would give us additional input bandwidth. 

Last but not least I'd say that it's time to take Dasher into 3D. Selection here would probably give us more than 14 bits per second. The extra dimension could for instance:
- Show the same tree but with more symbols in the map
	- so at the top 1-symbol, at row 24 the 24 most probable characters
- Different trees along z-axis
	- movinig up and down would move to another dictionary / language
- Instead showing all symbols in next layer on a surface 
	- the user flies through in first person 
	- draw back that symbols behind might be obscured, fixable via transparency

See videos below or a stab at 3D implementation, not applying my theories or my work!


## Online resources
[Data Entry Interface Using Continuous Gestures and Language Models](http://www.inference.org.uk/djw30/papers/uist2000.html)
[Implementation of Dasher](https://www.academia.edu/362275/Implementation_of_Dasher_An_Information_Efficient_Input_Mechanism)
- comparision with 
	- T9
	- chorded,ternary (TCK) @ ~ 16 wpm
	- half qwerty @ ~
	- qwerty on touch [large / small] @ [32.5 - 21.1 wpm]
- more on reference [10]
	- predicted speed @ ~ 43.7 wpm?

[Google Tech talk on Dasher](https://m.youtube.com/watch?v=wpOxbesRNB)
[Dasher in VR](https://youtu.be/FFQgluUwV2U)
[How "Dasher" has touched lives - The human ascpect](https://youtu.be/QxFEUk3J89Q)

[Dasher Radial Menu](https://m.youtube.com/watch?v=5oSfEM8XpH4)	
[Similar thoughts as my ideas](https://forums.tigsource.com/index.php?topic=960)
[HN Post](https://news.ycombinator.com/item?id=17105728)

[Keith V](https://www.keithv.com/software/speechdasher/)
[Alan Blackwell](https://www.cl.cam.ac.uk/~afb21/publications/index.html)
[P.O. Kristensson](http://pokristensson.com/publications.html)
