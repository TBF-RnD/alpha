all: blog 

blog: 
	./fetchrss.sh blog.rss

wiki:
	./fetchwiki.sh wiki_mirror.urls

%.xml: blog

%.txt: %.xml
	elinks -dump $<  > $@

convertxml: %.txt
	echo "Converted to txt"

clean: 
	rm -f *.txt *.xml
