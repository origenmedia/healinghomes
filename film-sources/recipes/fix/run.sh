#!/bin/bash
# Run every spec given (or all v4/spec_*.json) in parallel, logging each.
S=/tmp/claude-0/-home-user-healinghomes/603ebc98-7834-51bc-972c-046d2502793b/scratchpad
cd $S
specs="$@"; [ -z "$specs" ] && specs=$(ls v4/spec_*.json)
for f in $specs; do n=$(basename $f .json); (timeout 900 python3 tools/fal.py $f > v4/log_$n.txt 2>&1; echo "$n exit $?" >> v4/done.txt) & done
wait
