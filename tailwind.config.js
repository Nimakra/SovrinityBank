/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#ffcc00',
        black1: {
          "100": "#000",
          "200": "#040404",
          "300": "#080808",
          "400": "#0A0A0A",
        },
        dimgray: {
          "100": "#585b65",
          "200": "#555",
          "300": "#444",
          "400": "#797979",
        },
        "gray-white": "#fff",
        royalblue: "#3050ce",
        black: "#060606",
        gray: {
          "100": "#fdfdfd",
          "200": "#1a1a1a",
        },
        "content-main": "#02234d",
        darkgray: "#a8b2c0",
        whitesmoke: {
          "50": "#f7f7f7",
          "75": "#f2f2f2", 
          "100": "#ededed",
          "200": "#eeeaea",
          "300": "#dddddd",
        },
      },
      spacing: {},
      fontFamily: {
        raleway: "Raleway",
        montserrat: "Montserrat",
        roboto: "Roboto",
        "montserrat-alternates": "'Montserrat Alternates'",
      },
      borderRadius: {
        "31xl": "50px",
      },
    },
    fontSize: {
      lg: "18px",
      base: "16px",
      "5xl": "24px",
      xl: "24px",
      "13xl": "32px",
      //"2xl": "22px",
      "35xl-1": "54.1px",
      smi: "13px",
      "11xl": "30px",
      sm: "14px",
      sm1: "13px",
      inherit: "inherit",
    },
    screens: {
      /*'sm': '640px',
      // => @media (min-width: 640px) { ... }

         sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... } */

      '2xl': '1536px',
      xl: {
        max: "1535px",
      },
      lg: {
        max: "1024px",
      },
      md: {
        max: "768px",
      },
      sm: {
        max: "634px",
      }, 

 
       
    },
  },
  corePlugins: {
    preflight: false,
  },
};
