#!/bin/bash
echo $1
if [ ! $1 ]; then
	echo "$0 error: No URL list"
	exit 1
fi
URL_FILE=$1
N=0
for l in $(cat $URL_FILE);do
	echo "Downloading $l into $N.txt"
	elinks -dump $l  > $N.txt
	N=$(( N+1 ))
done
exit 0
