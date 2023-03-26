const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // Pour définir le futur sous répertoire de l'application
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_PUBLIC_PATH
    : '/',

  // Dossier d'export
  outputDir: 'docs'
})
