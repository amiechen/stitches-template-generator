.PHONY: build run help
.DEFAULT_GOAL := help

define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef
export PRINT_HELP_PYSCRIPT

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

build: ## Build the docker container
	npm run build:service && npm run build:app && npm run build:css
	docker build -t webapp .

run: ## Run stitches in docker
	docker run -itp 3000:3000 -v $$(pwd):/app webapp run start:dev
