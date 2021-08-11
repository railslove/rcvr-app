#!/usr/bin/node

var fs = require('fs');

if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' SECRETKEYFILE PUBLICKEYFILE INPUTFILE OUTPUTFILE');
    process.exit(1);
}

var secretKey = fs.readFileSync(process.argv[2]);
var publicKey = fs.readFileSync(process.argv[3]);
var input = fs.readFileSync(process.argv[4]);

var tweetnacl = require('tweetnacl');
tweetnacl.sealedbox = require('tweetnacl-sealedbox-js');

fs.writeFileSync(process.argv[5], tweetnacl.sealedbox.open(input, publicKey, secretKey));
