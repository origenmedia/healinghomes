#!/bin/bash
S=/tmp/claude-0/-home-user-healinghomes/603ebc98-7834-51bc-972c-046d2502793b/scratchpad
cd $S
for n in "$@"; do (timeout 1500 python3 tools/leg3.py v4/film/legs.json $n > v4/film/log_$n.txt 2>&1; echo "$n exit $?" >> v4/film/done.txt) & sleep 2; done
wait
echo ALL >> v4/film/done.txt
