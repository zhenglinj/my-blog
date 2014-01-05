SHELL :=/bin/bash
commit:
	@pwd
	@cd ./assets/images/ && pwd && sh imgcvt.sh
	git add .
	git commit -a -m "post blog"
push:
	git push origin master
