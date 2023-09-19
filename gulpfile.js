'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));

const path = require("path");

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    if (!generatedConfiguration.resolve.alias) {
      generatedConfiguration.resolve.alias = {};
    } 

    // common setup for all projects
    generatedConfiguration.resolve.alias["@common"] = path.resolve(
      __dirname,
      "lib/common/"
    );

    // application setup for all projects
    generatedConfiguration.resolve.alias["@app"] = path.resolve(
      __dirname,
      "lib/apps/"
    );

    // asset setup for all projects
    generatedConfiguration.resolve.alias["@assets"] = path.resolve(
      __dirname,
      "lib/assets/"
    );

    return generatedConfiguration;
  },
});
