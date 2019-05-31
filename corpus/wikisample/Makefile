SINGLE=bash ./single.sh
JSONOUT=en.json gr.json sv.json

%.html: links
	wget -i links

%.txt: %.html
	elinks -dump $< > $@

%.json: %.txt
	$(SINGLE) $< $@
	
all: $(JSONOUT)
	echo "Done"

clean:
	rm -f *txt *json *html
