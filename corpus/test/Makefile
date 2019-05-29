SINGLE=bash ./single.sh
SRC=Morse_Code.txt quickfox.txt foobar.txt
JSON=Morse_Code.json quickfox.json foobar.json
MD=Morse_Code.md quickfox.md foobar.md

all: json markdown

%.json:  %.txt
	$(SINGLE) $< $@

%.md:  %.txt
	$(SINGLE) $< $@

json: $(JSON)
	echo "JSON complete"

markdown: $(MD)
	echo "Markdown complete"

clean:
	rm -f *md *json
