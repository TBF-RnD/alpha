#!/bin/bash
DEST=$1
shift 1
echo node ../../odin/odin.js compile $DEST $@
node ../../odin/odin.js compile $DEST $@
