#!/bin/sh
cf target -o frp@zurich.ibm.com -s idemix-service-examples
cf push -f ./manifest.yml