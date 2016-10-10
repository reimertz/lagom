◩ lagom
====

> simplistic presentation generator

[![Build Status](https://travis-ci.org/reimertz/lagom.svg?branch=master)](https://travis-ci.org/reimert/lagom)
[![NPM version](https://img.shields.io/npm/v/lagom.svg)](https://www.npmjs.com/package/lagom)
[![Join gitter channel](https://badges.gitter.im/reimertz/lagom.svg)](https://gitter.im/reimertz/lagom)


## installation

```
npm install lagom -g --production
```

## usage

### create a presentation
```
lagom create
```

### work on a presentation / do a presentation
```
cd <lagom project folder>
lagom server
```

### deploy presentation
```
lagom deploy
> http://lagom.hook.io?c=<code>
```

## development
```
git clone https://github.com/reimertz/lagom.git
cd lagom
npm install

#then
npm run bin <command> #to run lagom cli

webpack -w # to auto-build everything on filechanges
npm run bin server # to serve index.html in folder
```

## todo

- tests (!)
- iterate on the scss backend

