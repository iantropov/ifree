#!/bin/bash

tempfilename="all.$1"

rm -f $tempfilename
touch $tempfilename

while read file
do
		cat $file >>$tempfilename
		echo "" >>$tempfilename
		echo $file
done < $2

 /c/Program\ Files/Java/jdk1.6.0_21/bin/java.exe -jar C:/Users/iantropov/Work/i-Free/yuicompressor-2.4.6/build/yuicompressor-2.4.6.jar $tempfilename -o $3

rm $tempfilename