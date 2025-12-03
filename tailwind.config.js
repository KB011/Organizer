import animate from 'tailwindcss-animate';

export default {
  content: ['./src/client/public/index.html', './src/client/src/**/*.{ts, tsx}'],

  theme: {
    extend: {},
  },

  plugins: [animate],
};
