module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#09326C',
      },
    },

  },
   plugins: [
    require('@tailwindcss/line-clamp'),
    // Other Tailwind CSS plugins
  ],
}

