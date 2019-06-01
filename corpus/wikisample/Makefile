SINGLE=bash ./single.sh
COMPILE=bash ./compile.sh
JSONOUT=en.json gr.json sv.json

all: lib

%.html: links
	wget -i links

%.txt: %.html
	elinks -dump $< | grep "Visible links" -B10000 > $@

%.json: %.txt
	$(SINGLE) $< $@
	
lib: $(JSONOUT)
	$(COMPILE) lib.js $(JSONOUT)

clean:
	rm -f *txt *json *html *js
