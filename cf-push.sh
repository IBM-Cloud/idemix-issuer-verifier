#!/bin/sh
cf target -o frp@zurich.ibm.com -s idemix-bluemix-dev
cf push -f ./manifest.yml