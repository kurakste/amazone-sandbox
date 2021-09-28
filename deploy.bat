echo Начал сборку контейнера
docker build --no-cache -t kurakste78/amazon-app-img:%1 .

echo Отправляю на докерхаб
docker push kurakste78/amazon-app-img:%1
