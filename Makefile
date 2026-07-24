.PHONY: install build build-frontend build-backend start clean

install:
	npm install

build:
	npm run build

build-frontend:
	npm run build:frontend

build-backend:
	npm run build:backend

start:
	npm run start

clean:
	rm -rf dist node_modules

