SHELL :=/bin/bash
amend:
	@pwd
	@echo "convert images..."
	@cd ./assets/images/ && pwd && ${SHELL} imgcvt.sh
	@echo " image(s) converted"
	git add .
	git commit -C HEAD -a --amend
commit:
	@pwd
	@echo "convert images..."
	@cd ./assets/images/ && pwd && ${SHELL} imgcvt.sh
	@echo " image(s) converted"
	git add .
	git commit -a -m "post blog"
push:
	git push origin master || git push origin master -f