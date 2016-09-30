# lagom
lagom: a simplistic presentation generator

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

### deploy presentation (not working)
```
lagom deploy
> http://git.io/N2sk2l4
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

- lagom deploy
- tests (!)
- iterate on the scss backend

