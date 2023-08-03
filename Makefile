install:
	npm ci

build:
	npm run build

start:
	npm run dev

lint:
	cd frontend && npx eslint .