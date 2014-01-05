#!/bin/bash

n=0
for fn in $(ls ./)
do
    if [[ $fn != "imgcvt.sh" ]] && [ -f $fn ];then
        imgw=`imageinfo --width $fn`
        if ((${imgw}>700));then
            cp -f $fn ./bigpic/
            r=$((70000/$imgw))                                      # 700px
            convert -resize $r% $fn $fn
            n=$((n+1))
        fi
    fi
done
echo -n $n
