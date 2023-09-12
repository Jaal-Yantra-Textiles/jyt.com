module.exports = {
  plugins: {
    tailwindcss: {
      theme: {
        extend: {
          keyframes: {
            spinSlow: {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
            spinReverse: {
              '0%': { transform: 'rotate(360deg)' },
              '100%': { transform: 'rotate(0deg)' },
            }
          },
          animation: {
            'spin-slow': 'spinSlow 10s linear infinite',
            'spin-reverse': 'spinReverse 5s linear infinite',
          }
        }
      },
    },
    autoprefixer: {},
  },
}
