<p align="center">
  <a href="https://github.com/reimertz/lagom">
    <img alt="Yarn" src="lagom.png" width="500">
  </a>
</p>

<p align="center">
  simplistic presentation generator
</p>

<p align="center">
  <a href="https://travis-ci.org/reimertz/lagom">
    <img src="https://travis-ci.org/reimertz/lagom.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://www.npmjs.com/package/lagom">
    <img src="https://img.shields.io/npm/v/lagom.svg" alt="NPM version">
  </a>
  <a href="https://gitter.im/reimertz/lagom">
    <img src="https://badges.gitter.im/reimertz/lagom.svg" alt="Join gitter channel">
  </a>
</p>

---

**Ease:** `lagom create` and you have created a folder with a presentation in it.

**Simplicity:** one `<section>`, one slide.

**Maintainable:** `lagom server` boots up your presentation in the browser. it comes with livereloading for easy edits.

**Magic:** `lagom deploy` will inline all the content of the presentation into one single file, deploy it freely and anonymously on github and finally generate a short url.

## Features
- 0 online dependencies: no more OMG!! moments because of bad wifi
- live-reloading server
- Presentation mode: just press p to initiate presentation mode
- Speaker notes
- Synced Aspect ratio
- Synced mouse pointer
- Mirrored highlighting


## install lagom
```
yarn global lagom
# or
npm install lagom -g --production
```

## usage
```
$ lagom
lagom create              create a new presentation
lagom server              start live-reloading server
lagom deploy <filename>   deploy presentation to a gist
lagom help                show this help
```

## example presentations
These is a list of example presentations, please PR this readme if you'd like to add presentation you created.

- https://reimertz.github.io/lagom/
- http://lagom.hook.io/?c=vPRgE

## todo

- tests (!)
- iterate on the scss backend

