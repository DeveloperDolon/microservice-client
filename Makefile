start:
	docker compose up
build:
	docker compose build
bash: 
	docker compose exec -it client bash
network:
	docker network create microservice-network