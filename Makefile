SHELL :=/bin/bash
commit:
	@pwd
	@cd ./assets/images/ && pwd && ${SHELL} imgcvt.sh
	@echo "convert images..."
	git add .
	@echo "converted"
	git commit -a -m "post blog"
push:
	git push origin master
