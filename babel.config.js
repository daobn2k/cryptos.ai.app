module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],

    plugins: [
      [ 
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@screen': './src/screen',
            '@assets': './assets',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@request': './src/request',
            '@hooks': './src/hooks',
            '@store': './src/store',
          },
        },
      ],
    ],
  };
};
