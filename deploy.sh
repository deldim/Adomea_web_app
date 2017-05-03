#!/usr/bin/env bash
installfile='.installcontainers.txt'
imagefile='.images.txt'
runfile='.runningcontainers.txt'

export CURRENT_PATH=`pwd`

if ! type docker > /dev/null ; then
  echo "Please install DOCKER"
else
  case "$1" in

    "build")
    rm -r servernode/node_*
    docker build servernode/ -t servernode:latest -f servernode/Dockerfile
    echo "servernode:latest" >> $CURRENT_PATH/$imagefile
    echo "mariadb:latest" >> $CURRENT_PATH/$imagefile
    ;;

    "start")
    docker run -p 127.0.0.1:80:3000 -p 127.0.0.1:3306:3306 --name uzengo servernode:latest&
    echo "uzengo" >> $CURRENT_PATH/$runfile
    cat $CURRENT_PATH/$runfile >> $CURRENT_PATH/$installfile
    sleep 35
    ./deploy.sh execution
    ;;

    "execution")
    docker exec -i uzengo mysql -h 127.0.0.1 -uroot -puzengoMDP <./DB/uzengo.sql&
    docker exec -d uzengo /home/bin/www&
    ;;

    "stop")
    filelines=`cat $runfile`
    for line in $filelines ; do
        echo "Stop $line"
        docker stop $line
    done
    rm $CURRENT_PATH/$runfile
    ;;

    "rmi")
    filelines=`cat $imagefile`
    for line in $filelines ; do
        echo "rmi $line"
        docker rmi $line
    done
    rm $CURRENT_PATH/$imagefile
    ;;

    "rm")
    ./deploy.sh stop
    filelines=`cat $installfile`
    for line in $filelines ; do
        echo "rm $line"
        docker rm $line
    done
    rm $CURRENT_PATH/$installfile
    ;;

    "auto")
    ./deploy.sh stop
    ./deploy.sh rm
    ./deploy.sh rmi
    ./deploy.sh build
    ./deploy.sh start
    ;;

    "myadmin")
    docker run --name myadmin -d --link uzengo:db -p 8080:80 phpmyadmin/phpmyadmin:latest
    echo "myadmin" >> $CURRENT_PATH/$runfile
    echo "myadmin" >> $CURRENT_PATH/$installfile
    echo "phpmyadmin/phpmyadmin:latest" >> $CURRENT_PATH/$imagefile
    ;;


    "help")
    echo "deploy.sh [command]"
    echo "list of commands:"
    echo "  help    display that text"
    echo "  build   build the images for containers"
    echo "  start   start the containers"
    echo "  stop    stop the containers"
    echo "  rm      remove the containers"
    echo "  rmi     remove the images build"
    echo "  auto    reboot the system and build properly"
    ;;

    *)
    echo "Usage : deploy.sh help | build | start | stop | rm | rmi | auto"
    ;;
  esac
fi
