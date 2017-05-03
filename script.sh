#!/usr/bin/env bash
installfile='.installcontainers.txt'
imagefile='.images.txt'
runfile='.runningcontainers.txt'
im0='servernode:latest'
im1='mysql:latest'
#im2='rgroszewski/nodejs-hello-world-express:latest'
im3='phpmyadmin/phpmyadmin:latest'
export CURRENT_PATH=`pwd`
#export DERBY_HOME="$CURRENT_PATH/DB/db-derby-10.13.1.1-bin"
#export CLASSPATH="$CLASSPATH:$DERBY_HOME/lib/derby.jar:$DERBY_HOME/lib/derbytools.jar:$DERBY_HOME/lib/derbynet.jar:$DERBY_INSTALL/lib/derbyclient.jar"
if ! type docker > /dev/null ; then
  echo "Please install DOCKER"
else
  if [ "$1" == "build" ]; then
    ./script.sh rmi
    #docker build ./mysql -t $im1
    docker build ./servernode -t $im0 -f servernode/Dockerfile
    #docker build ./phpmyadmin
    echo $im0 >> $CURRENT_PATH/$imagefile
    #sleep 6
    echo "BUILD"
  elif [ "$1" == "stop" ]; then
    filelines=`cat $runfile`
    for line in $filelines ; do
        echo "stop $line"
        docker stop $line
        #kill $line
    done
    rm $CURRENT_PATH/$runfile
    #rm $CURRENT_PATH/derby.log
    #rm -r $CURRENT_PATH/sample
    echo "STOP"
  elif [ "$1" == "rm" ]; then
    filelines=`cat $installfile`
    for line in $filelines ; do
        echo "Rm $line"
        docker rm $line
        #kill $line
    done
    rm $CURRENT_PATH/$installfile
    #rm $CURRENT_PATH/derby.log
    #rm -r $CURRENT_PATH/sample
    echo "RM containers"
  elif [ "$1" == "install" ]; then
    #./script.sh rm

    docker run --rm -e "MYSQL_ROOT_PASSWORD=uzengoMDP" -p 3306:3306 --name uzengo $im1&
    sleep 4
    docker run --name nodeserver -d --link uzengo:db -p 3000:3000 $im0&
    docker run --name myadmin -d --link uzengo:db -p 8080:80 $im3&
    sleep 4
    echo 'nodeserver' >> $CURRENT_PATH/$installfile
    echo 'myadmin' >> $CURRENT_PATH/$installfile
    echo 'uzengo' >> $CURRENT_PATH/$installfile
    cat $CURRENT_PATH/$installfile >> $CURRENT_PATH/$runfile
    if [ "$OSTYPE" == "darwin*" ]; then
      #statements
      echo "coucou"
    elif [ "$OSTYPE" == "linux*" ]; then
      #statements
      echo "coucou"
    else
        sleep 20
    fi
    #fi
  elif [ "$1" == "start" ]; then
    ./script.sh stop
    #if [ "$#" != 4 ]; then
    #  echo "Enter name for your 3 containers"
    #else
    docker start uzengo
    docker start nodeserver
    docker start myadmin
    echo 'nodeserver' >> $CURRENT_PATH/$runfile
    echo 'myadmin' >> $CURRENT_PATH/$runfile
    echo 'uzengo' >> $CURRENT_PATH/$runfile
  elif [ "$1" == "rmi" ]; then
    filelines=`cat $imagefile`
    for line in $filelines ; do
        echo "rmi $line"
        docker rmi $line
        #kill $line
    done
    rm $CURRENT_PATH/$imagefile
  elif [[ "$1" == "exec" ]]; then
    docker exec -i uzengo mysql -uroot -puzengoMDP <./DB/uzengo.sql
  elif [ "$1" == "auto" ]; then
    ./script.sh stop
    ./script.sh rm
    ./script.sh rmi
    ./script.sh build
    ./script.sh install
    sleep 8
    ./script.sh exec
  elif [ "$1" == "help" ]; then
    echo "script.sh [command]"
    echo "list of commands:"
    echo "  help    display that text"
    echo "  build   build the images for containers"
    echo "  install mount the images and containers"
    echo "  start   start the containers"
    echo "  stop    stop the containers"
    echo "  rm      remove the containers"
    echo "  rmi     remove the images build"
    echo "  auto    reboot the system and build properly"
  else
  echo "Usage : script.sh help | build | install | start | stop | rm | rmi | auto"
  #echo "Logs and informations are in logs.txt"
  fi
fi
