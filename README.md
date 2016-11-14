# Dashboard

Administrative app for Pernix.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.0.2.

## Styleguide
Refer to AngularJS John Papa Styleguide: https://github.com/johnpapa/angular-styleguide

## Set Up
NPM and bower have to be installed in order to set up the project.

Run bower and npm to get all dependencies needed.
```sh
  npm install
  bower install
```

## Syntax
Run `gulp review`

## Adding a new library
When installing a new library with bower or npm, add it to the array in the gulp task `build-index` and also in respective task `move-bower-components`or `move-node-modules`.
The gulp file is located in the root of the project.

## Build & development
For running the app use `gulp run` this will run the following tasks:
* `clean-less`
* `less`
* `build-index`
* `review`
* `grunt-serve`

This will generate a general file to handle the css, which is located in app -> assets -> styles -> gash.css

## Adding new library
Whe adding new library with either npm or bower use the `--save` or `--save-dev` option.
Also add the new file's path to the gulp task `build-index` in the sources array specifically.
Then run the following command to inject those files into the index `gulp build-index`

## Testing
Running `grunt test` will run the unit tests with karma.

## Publish on heroku  
* `git checkout -b new-branch-name`
* `gulp clean`
* `gulp build-production`
* `git add .`
* `git commit -m "New Release <Date>"`
* `git push heroku new-branch-name:master -f`

For more information please refer to:
http://johnlivingston.io/blog/yeoman-heroku

----------
Crafted by:
[![Pernix-Solutions.com](http://pernix.cr/static/images/pernix-logo.svg)
](http://Pernix-Solutions.com)
