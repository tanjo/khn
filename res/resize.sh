#!/bin/sh
cd `dirname $0`
pwd
cp icon.png ../app/icons/128.png
cp icon.png ../app/icons/48.png
cp icon.png ../app/icons/16.png
pushd ../app/icons
sips -Z 128 128.png
sips -Z 48 48.png
sips -Z 16 16.png
popd