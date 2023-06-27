install:
	npm ci

test:
	npm run test

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
run:
	npm run devstart