SHELL :=/bin/bash

all: commit

commit:
	@echo "convert images..."
	@cd ./assets/images/ && pwd && ${SHELL} imgcvt.sh
	@echo " image(s) converted"
# 	if [[ `find ./_posts -ctime 1 -type f -name "*.md"` ]]; then /
# # new posts
# 	    git add . /
# 	    git commit -a -m "post blog" /
# 	elif [[ `find ./ -mtime 1 -type f` ]]; then /
# 	    git add . /
# 	    git commit -a -m "change configure files" /
# 	else /
# 	    git commit -C HEAD -a --amend /
# 	fi

# amend:
# 	@pwd
# 	@echo "convert images..."
# 	@cd ./assets/images/ && pwd && ${SHELL} imgcvt.sh
# 	@echo " image(s) converted"
# 	@pwd
# 	git add .
# 	git commit -C HEAD -a --amend
# commit:
# 	@pwd
# 	@echo "convert images..."
# 	@cd ./assets/images/ && pwd && ${SHELL} imgcvt.sh
# 	@echo " image(s) converted"
# 	git add .
# 	git commit -a -m "post blog"

push:
	git push origin master || git push origin master -f