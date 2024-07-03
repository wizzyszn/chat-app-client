/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css,jsx}"],
  theme: {
    extend: {
      colors :{
        textbg : ' #cbcbcb',
        componentColor : '#001329',
        innerBg : '#002047',
        outerBg1 : '#002249',
        outerBg2 : '#002f68'
      },
    
        gridTemplateRows : {
          "100px" : "100px"
        }

    },
  },
  plugins: [],
}