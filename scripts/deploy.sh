#!/usr/bin/env bash

read -p "Deploy care, health and fresenius? (y/n) " answer

git checkout master
git pull

for env in care health fresenius; do
  echo ""
  echo "Deplopying $env"
  echo "--"
  git checkout env/$env
  git pull origin master
  git push origin env/$env
done

echo ""
