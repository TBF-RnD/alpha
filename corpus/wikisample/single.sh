#!/bin/bash
PATH0=$(pwd)/$1
PATH1=$(pwd)/$2
echo $PATH0
echo $PATH1
echo node ../../odin/odin.js single $PATH0 $PATH1
node ../../odin/odin.js single $PATH0 $PATH1
