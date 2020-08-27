module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: false,
      autoprefixer: true,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'not-pseudo-class': true,
      },
    },
  },
};
