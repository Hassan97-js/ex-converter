// jshint esversion:6

module.exports = {
  pwa: {
    manifestOptions: {
      background_color: "#ea4150",
      short_name: "ExConverter"
    },
    name: "Ex-converter",
    themeColor: "#ea4150",
    workboxOptions: {
      runtimeCaching: [
        {
          handler: "NetworkFirst",
          options: {
            networkTimeoutSeconds: 5
          },
          //urlPattern: "https://api.exchangeratesapi.io/latest"
          urlPattern: /^https:\/\/api\.exchangeratesapi\.io\/latest.*$/
        }
      ]
    },
    exclude: [ /_redirects/ ]
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/ex-converter/" : "/"
};
