#!/bin/sh
cf target -o frp@zurich.ibm.com -s idemix-service-prod
cf push -f ./manifest.yml