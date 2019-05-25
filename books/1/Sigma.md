It's so nice to be able to inspire someone! I'd love to take this further,  if you have the time. Let's strike while the iron is hot! Unfortunately I only have an Android tablet to work with right now and while I do have a usb gamepad controller I can see from  termux I can not access it while the no-brand device is not rooted. 

Would it be to much for you to ask of a quick screencast of your project. If you don't want to publish it publicly ask for my e-mail via PM.

I'd argue for using HTML5+javascript to create a demo. Javascript gamepad support is really good and it gives you platform  independence.  Using web tech also allows for ease of demonstration in the age of goldfish-like attentionspans. 

So what I am doing software wise is to try to create a framework for experimentation on input methods. Providing the following:
- os integration, not only keyevents also OS functions, shell access etc
- text prediction
- statistical analysis, side by side analysis on performance
- configuration
- shell commands along with arguments could be provided as alphabet to provide a quick and actually useful way to control a computer!!!

The individual parts would be tied together by a simple JSON/websocket protocol modeled after javascript events. Providing least  common denominator access and giving browser access to a daemon controlling the OS. Also a cloud server with access to a huge shared public n-gram  dataset could provide predictions in combination with a local personalized dataset.  

I do see a lot of potential in your idea to be honest. I  have as a matter of fact been working quite a lot with gamepads in particular (See links below). There are applications
- better posture, you naturally lean towards the keyboard laptop screen 
- code in your coach in front of 60" TV

What my earlier attempt was was to create a type fast game doing a side by side comparison of four different algorithms.




My sigma experiment constructed as a  typing speed game to get data on performance. That is actions/inputs per character/word  along  with wpm score.

Does side by side comparison  of  four algorithms
- linear (worst case linear search)
- keyboard  (reference keyboard implementation)
- tree (somewhat similar  to MessagEase  mentioned  earlier at list concerning  theoretical efficiency)
-  quad (my initial idea, turned out  a disappointment apart from being  useful  for entering math formulas using latex roosevelt.eruditenow.com/bootstrap.html check youtube video) 

Try it  out:
http://sigma.eruditenow.com
Theory:
http://sigma.eruditenow.com/theory

Videos screencasts etcetera
https://www.bitchute.com/channel/eruditenow/

most  watched; keyboard v.s. most succesfull method:
https://www.bitchute.com/video/aKl7jUrtcOt8/
(positive outcome)

Introduction video:
https://www.bitchute.com/video/FklGhgQGbuDk/

Video on gamepad  support:
https://www.bitchute.com/video/jqM0f6r06Kwx/

The linear worst case  model actually had  some  good scores when put in dynamic prediction mode.  Courtesy of having a ngram prediction engine:
https://www.bitchute.com/video/DH97lqy3TH0Z/

of course there is a github
https://github.com/richard-jansson/sigma
