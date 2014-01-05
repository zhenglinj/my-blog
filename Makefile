commit:_post/*.md
	. ./assets/images/imgcvt.sh
	git add .
	git commit -a -m "post blog"
push:
	git push origin master
