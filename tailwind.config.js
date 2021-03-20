const plugin = require('tailwindcss/plugin')

module.exports = {
    purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function({ addUtilities }) {
            const newUtilities = {
              '.max-h-1000px': {
                maxHeight: 1000,
              },
            }
      
            addUtilities(newUtilities, ['responsive', 'hover'])
        }),
        require('@tailwindcss/forms')],
}
