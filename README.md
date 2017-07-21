DistrictEuro App
=====================

## Quick Start

Install Cordova, Gulp and then:

```sh
$ npm install -g ionic
$ git clone git@github.com:APPSTER-CL/DistrictEuro_Mobile.git
```

## Using this project

To install and run the solution:

```bash
$ npm install
$ bower install
$ gulp sass
$ ionic state reset
```

Then change the configuration.js to point to the correct environment and run:

```bash
$ ionic serve
```

## Compiling to Android and iOS

If you want to compile the application to Android or iOS then you should run this:

```sh
$ ionic build android
```

```sh
$ ionic build ios
```

This will create a project for each platform in the platforms folder with all the
files from the application ready to run.
