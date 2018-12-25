const webpack = require('webpack');


const VueTemplateCompiler = require('vue-template-compiler');

const VueTemplateCompilerProxy = {
  ...VueTemplateCompiler,
  compile(template, options) {
    // template = template.replace(/>[^<]+</g, function (substring) {
    //   return substring.replace(/\r?\n?\s*/g, '')
    // })
    template = template.replace(/>[^<]+</g, substring => substring.replace(/\r?\n\s*/g, ''));
    return VueTemplateCompiler.compile(template, options);
  },
};

module.exports = {
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'teste',
    // Set up all the aliases we use in our app.
    resolve: {
      // alias: require('./aliases.config').webpack,
    },
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
  // Configure Webpack's dev server.
  // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md
  devServer: {
    disableHostCheck: true,
  },

  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compiler = VueTemplateCompilerProxy;
        options.compilerOptions.preserveWhitespace = false;
        return options;
      });
  },
};
