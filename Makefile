SHELL :=/bin/bash
commit:
	@pwd
	${SHELL} ./assets/images/imgcvt.sh
	git add .
	git commit -a -m "post blog"
push:
	git push origin master
