module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 0.3 infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: { 
          '0%, 100%' : { transform: 'scale(1.2) rotate(7deg)' },
          '50%': { transform: 'scale(0.8) rotate(-7deg)' },
        }
      },
    },
  },
  variants: {},
  plugins: [],
}
