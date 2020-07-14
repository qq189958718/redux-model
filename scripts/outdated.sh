for file in $(ls packages)
do
  if [ file != 'core' ]
  then
    cd packages/$file
    yarn outdated
    cd $OLDPWD
  fi
done

yarn outdated
