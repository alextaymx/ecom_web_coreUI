docker build -t ecom-web -f Dockerfile .
docker image prune -f
docker system prune -f