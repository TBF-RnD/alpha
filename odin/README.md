# Odin 

Analyze text files to generate PPM like data usable for text prediction on a symbol level. Exports the data to json file for use for javascript based input methods. Can also output markdown  tables for visualisations here and in the chapters.   

## Usage
Use the engine to generate a json formated output on a single  file.
```
node odin.js single <INPUT> <OUTPUT>.json
```
Can also be used to generate a markdown table representation:
```
node odin.js single <INPUT> <OUTPUT>.json
```
When you have json files containing dictionaries these can be combined into a library. 
```
node odin.js compile <OUT> <input 0>.json  <input 1>.json ... <input 2>.json
```
While compiling they are simply packed together and the data is not merged. As such the filesize of the library will be approximately the sum of the input files. 

##  Example
For example given the string:
```
foobarfoofoobar!
```

We get the following results. The data is hardly useful for anything  except for giving predictions of a user trying to type foo or bar.


## Switches 
```
node odin.js --combination single in.txt out.json
```
So with a combination the order of the previous string doesn't  matter whereas by default i.e. using a permutation the order does matter.  Turned out to be a really badidea, you are probably much better off using permutations. 

### 1-gram
|   | a | b | f | o | r | 
|---|---|---|---|---|---|
| f | 0 | 0 | 0 | 3 | 0 |
| o | 0 | 2 | 1 | 3 | 0 |
| b | 2 | 0 | 0 | 0 | 0 |
| a | 0 | 0 | 0 | 0 | 2 |
| r | 0 | 0 | 1 | 0 | 0 |

 - 3 occurences of o after f and o
 - b comes after o 2 times
 - ...

### 2-gram
|   | a | b | f | o | r | 
|---|---|---|---|---|---|
| fo | 0 | 0 | 0 | 3 | 0 |
| oo | 0 | 2 | 1 | 0 | 0 |
| ob | 2 | 0 | 0 | 0 | 0 |
| ba | 0 | 0 | 0 | 0 | 2 |
| ar | 0 | 0 | 1 | 0 | 0 |
| rf | 0 | 0 | 0 | 1 | 0 |
| of | 0 | 0 | 0 | 1 | 0 |

 - o after fo 3 times
 - b ater o 2 times
 - ...

### 3-gram
|   | a | b | f | o | r | 
|---|---|---|---|---|---|
| foo | 0 | 2 | 1 | 0 | 0 |
| oob | 2 | 0 | 0 | 0 | 0 |
| oba | 0 | 0 | 0 | 0 | 2 |
| bar | 0 | 0 | 1 | 0 | 0 |
| arf | 0 | 0 | 0 | 1 | 0 |
| rfo | 0 | 0 | 0 | 1 | 0 |
| oof | 0 | 0 | 0 | 1 | 0 |
| ofo | 0 | 0 | 0 | 1 | 0 |
| ar! | 0 | 0 | 0 | 0 | 0 |
 
 - b after foo, 2 times, beginning of "bar"
 - r after  oba 2 times
 - ...

### Build examples
The examples are built using make. Go  to corpus/test and run  
```
make
```
To build json and markdown representations. On  slightly larger texts and  with longer memory these tend to get quite memory and cpu intensive. 

It might be useful to run 
```
make -j4 json
```
to only build json  files on a 4-core CPU. Bear in mind however that another bottleneck  is memory. If you heighten   the degree  that is length of the  string  before the the memory goes through the rough quite quickly.  

What happens is that since for each level given a 26 letter alphabet the size of the frequency representation increases by 26. Obviously 26 to the power of l, increases quite quickly. For  practical usecases 26 is quite the low estimate as  well. So even if the hash maps used in javascript  are sparesly populated the memory usage gets quite large quite quickly. 

Thankfully a memory of  5-10 is quite sufficient for usable predictions. If you really want to test the limit you can always add more swap memory to your OS. In linux as below:

```
dd  if=/dev/zero  bs=1G count=512 of=swap
mkswap  swap
swapon swap
```
Adds an insane amount of swap to your OS. Change count in   the dd command to something that suits your purposes.   

### Run as a server hosting files
To run oeim as a http server that hosts js files for a model and also provides the model with predictioms over websocket:
```
node odin.js doug ../corpus/wikisample/en.json
```
For five fingered chord example, will tuen up at http://localhost:22357
```
node odin.js doug ../corpus/wikisample/en.json
```
For morse demo same host and port as previous example.

##  Requirements
npm install websocket
