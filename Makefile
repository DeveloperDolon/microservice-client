start:
	docker compose up
build:
	docker compose build
bash: 
	docker compose exec -it client sh
network:
	docker network create microservice-network