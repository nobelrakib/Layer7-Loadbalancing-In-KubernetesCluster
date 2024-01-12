tag:=v1.0.6
image_name:=poridhi-svc1
respository:=shajalahamedcse
build:
	@ docker build --platform linux/amd64 -t ${image_name}:${tag} .

docker_push:
	@ echo "Pushing ${respository}/${image_name}:${tag} to docker hub"
	@ docker tag ${image_name}:$(tag) ${respository}/${image_name}:${tag}
	@ docker push ${respository}/${image_name}:${tag}

run:
	@ docker run --name svc1  -p 8081:3000 ${image_name}:$(tag)

rm:
	@ docker stop svc1
	@ docker rm -f svc1

deploy:
	@ kubectl apply -f deployment/deployment.yml