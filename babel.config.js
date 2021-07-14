const presets = [
    [
      "@babel/env",
      {
        targets: {
          edge: "17",
          firefox: "30",
          chrome: "67",
          safari: "11.1",
        },
        useBuiltIns: "usage",
        corejs: "3.6.4",
      },
    ],
  ];
  
  module.exports = { presets };