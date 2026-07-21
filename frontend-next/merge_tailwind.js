
const fs = require('fs');
const currentConfig = require('./tailwind.config.js');
const stitchConfig = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-container-low": "#1c1b1b",
                      "outline": "#ac8884",
                      "on-secondary-fixed": "#1c1b1b",
                      "on-primary-container": "#fff6f5",
                      "on-tertiary": "#2f3131",
                      "on-tertiary-fixed-variant": "#454747",
                      "surface-tint": "#ffb4ab",
                      "on-secondary-container": "#b7b5b4",
                      "tertiary-fixed": "#e2e2e2",
                      "on-secondary-fixed-variant": "#474746",
                      "on-tertiary-container": "#f8f8f8",
                      "surface-container": "#201f1f",
                      "on-error-container": "#ffdad6",
                      "on-error": "#690005",
                      "outline-variant": "#5c403c",
                      "surface-variant": "#353534",
                      "surface-dim": "#131313",
                      "secondary-fixed": "#e5e2e1",
                      "primary-container": "#dc2626",
                      "inverse-surface": "#e5e2e1",
                      "inverse-on-surface": "#313030",
                      "surface-container-high": "#2a2a2a",
                      "on-surface": "#e5e2e1",
                      "tertiary-fixed-dim": "#c6c6c7",
                      "on-primary-fixed-variant": "#93000b",
                      "primary-fixed": "#ffdad6",
                      "primary": "#ffb4ab",
                      "secondary-container": "#474746",
                      "primary-fixed-dim": "#ffb4ab",
                      "on-primary": "#690005",
                      "surface": "#131313",
                      "error": "#ffb4ab",
                      "tertiary-container": "#717272",
                      "tertiary": "#c6c6c7",
                      "on-surface-variant": "#e6bdb8",
                      "on-background": "#e5e2e1",
                      "inverse-primary": "#bf0715",
                      "on-primary-fixed": "#410002",
                      "surface-container-lowest": "#0e0e0e",
                      "on-tertiary-fixed": "#1a1c1c",
                      "on-secondary": "#313030",
                      "error-container": "#93000a",
                      "background": "#131313",
                      "surface-bright": "#3a3939",
                      "secondary-fixed-dim": "#c8c6c5",
                      "surface-container-highest": "#353534",
                      "secondary": "#c8c6c5"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {
                      "base": "8px",
                      "max-width": "1440px",
                      "gutter": "16px",
                      "container-padding": "24px",
                      "section-gap": "48px"
              },
              "fontFamily": {
                      "label-md": [
                              "Inter"
                      ],
                      "headline-md": [
                              "Outfit"
                      ],
                      "headline-lg": [
                              "Outfit"
                      ],
                      "body-lg": [
                              "Inter"
                      ],
                      "body-md": [
                              "Inter"
                      ],
                      "mono-data": [
                              "Inter"
                      ],
                      "display-lg": [
                              "Outfit"
                      ],
                      "headline-lg-mobile": [
                              "Outfit"
                      ]
              },
              "fontSize": {
                      "label-md": [
                              "14px",
                              {
                                      "lineHeight": "20px",
                                      "letterSpacing": "0.05em",
                                      "fontWeight": "600"
                              }
                      ],
                      "headline-md": [
                              "24px",
                              {
                                      "lineHeight": "32px",
                                      "fontWeight": "600"
                              }
                      ],
                      "headline-lg": [
                              "32px",
                              {
                                      "lineHeight": "40px",
                                      "letterSpacing": "-0.01em",
                                      "fontWeight": "600"
                              }
                      ],
                      "body-lg": [
                              "18px",
                              {
                                      "lineHeight": "28px",
                                      "fontWeight": "400"
                              }
                      ],
                      "body-md": [
                              "16px",
                              {
                                      "lineHeight": "24px",
                                      "fontWeight": "400"
                              }
                      ],
                      "mono-data": [
                              "14px",
                              {
                                      "lineHeight": "20px",
                                      "fontWeight": "500"
                              }
                      ],
                      "display-lg": [
                              "48px",
                              {
                                      "lineHeight": "56px",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "700"
                              }
                      ],
                      "headline-lg-mobile": [
                              "24px",
                              {
                                      "lineHeight": "32px",
                                      "fontWeight": "600"
                              }
                      ]
              }
      },
          },
        };

if (!currentConfig.theme) currentConfig.theme = {};
if (!currentConfig.theme.extend) currentConfig.theme.extend = {};

const mergeObj = (target, source) => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], mergeObj(target[key], source[key]))
    }
  }
  Object.assign(target || {}, source)
  return target
}

currentConfig.theme.extend = mergeObj(currentConfig.theme.extend, stitchConfig.theme.extend);
currentConfig.darkMode = 'class';

const newConfigCode = /** @type {import('tailwindcss').Config} */
module.exports = ;;
fs.writeFileSync('./tailwind.config.js', newConfigCode);
console.log('Merged tailwind config.');
