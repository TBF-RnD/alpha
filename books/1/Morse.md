# Genalogy of digital communication
What can we learn from a almost two hundred year old standard of communcations today?Well, quite a lot it turns out. First of all I'd say that it should put the idea of the IT/-age. It is possible to trace UTF-8, through ASCII all the way back to morse code. Continuing from there we had light speed communication before that with semaphores mirrors or even fire. So rather than a quantum leap into doing something completely different, we are in fact dealing with a continous improvement, that is doing the same thing  but faster. 

## Compression
Take a look at the morse code table and you'll find tha the most common letters have shorter codes. This is quite clever and is done to cut down the amount of signals that you have to send. 

-----------------
| letter| freq.  |
|-------|--------|
|   E   |  12.02 |
|   T   |  9.10  |
|   A   |  8.12  |
|   O   |  7.68  |
|  ...  |  ...   |
|   Q   |  0.11  |
|   J   |  0.10  |
|   Z   |  0.07  |
-----------------
[Cornell university](http://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html)

Study the frequencies of english words above. Given that there is a 12.02 % chance that an E will appear  and a 0.07 % chance that a Z will appear, wouldn't it make sense to have a shorter series for the A than the Z. Creating a map that assigns shorter series to more frequent letter is in fact a form of compression. Which is impressive for a system designed in the beginning of the 19-th century.  

## Limitations 
Morse code have some few variations. It supports A-Z, the arabic numbers and a few more symbols. Notable exceptions are "!". Support for other languages do exist but requires that the users memorize a totally new table. 

## Memorization 
The obvious drawback of the system is that it requires the user to memorize a complete set of new signals. As such the learningg curve is quite steep. Whereas for a veteran telegraphist it happens naturally, in it's raw form it's totally impractical for application  on  a new user interface  paradigm.  

## Bandwidth 
So in the jargon of telegraphists, the act of receiving and understanding morse code is refered to as copying. This doesn't involve transcribing but rather just to interpret the message and have it in one's head. Skilled typists can receive data with a copy speed of 40 wpm. The record was set in 1939 and is 75.2 wpm.

Communcation requires several involved parties however. What limits the bandwidth  of the system as such is therefore the bandwidth of the slowest recipients. Otherwise that one will not copy and there'll have to be one round trip time  of delay and a  retransmission, perhaps at a lower speed. 

So in reality the bar is set a fair  bit lower. The FCC awards a first  class license to anybody capable of over 20 wpm.

## A proposal for a 0-learning curve morse text editor
In order to demonstrate some of my findings from eariler projects. Most notably the erudite.now sigma project. I  would like to suggest the following morse code editor. 
-----------------
|               |
| entered text  |
|               |
----------------
|               |
|  α-ΜORSE      |  
|               |
----------------
|  the button   |
-----------------

1. the entered text, where output ends up
2. α-ΜORSE, morse reference as defined below
3. Button to send morse

### α-Morse
The reference would display a reference table of each available symbol along  with the code that describes it in Morse. The reference receives no input whatsoever.
- z-ordering 
In order to have as small  distance between letters close visualy a recursive z-ordering is applied

a b e f q r u v 
c d g h s t x y
i j k l
m n o p

Groups similar letters close to each other making them easier to spot. Compare to

a b c d e f g h i j k l
m n o p q r s t u v x y
z 0 1 2 3 4 5 6 7 8 9 

Here the letters 0 and 9 while intuitiely similar are quite far from   each other.  Compare a d, which in the first version have a distance of 1 but in  the  second of 3, and so forth. 

Also z-ordering saves space. 
- Ordering by frequency, statically 
The first mode would be to statically order the references according to their averageg occurence. This would mean  that the user would quickly  learn  the top 8 or so which more  or less would account for 80% of the letters,  quite quickly. So there is a 20% chance that he has to do a lookup. 
- Color by probability 
Whereas still maintaing a static ordering, it is still possible to change the size and color of the more frequent letters. 
- Ordering by frequency, dynamically 
By creating a n-gram model of the language on a suitable data set. A PPM-like  system would give a new ordering  based on  the latest n-characters.  
- Hybrid mode
Given big enough screen, a static reference could be offered next to a dynamic. Given a miss in one system the user can quickly recover by looking at the other. 

# Further reading
[https://en.wikipedia.org/w/Morse_Code](Wikipedia article)
[https://pcarleton.com/2017/03/07/morse-to-emoji/](Morse to emoji)
[https://support.google.com/accessibility/android/answer/9011881?co=GENIE.Platform%3DAndroid&hl=en](enable morse in gboard)
