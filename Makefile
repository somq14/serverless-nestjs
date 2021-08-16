build-ApiHandler:
	docker build -t api-handler:latest .
	$(eval CONTAINER_ID := $(shell docker create api-handler:latest))
	docker cp $(CONTAINER_ID):/work/. $(ARTIFACTS_DIR)
	docker rm $(CONTAINER_ID)
