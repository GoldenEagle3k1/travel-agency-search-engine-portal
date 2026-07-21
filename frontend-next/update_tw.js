const fs = require('fs');

const txtPath = 'C:/Users/golde/Desktop/projects/skyways/skyways/STICH DESIGNS/Agent Marketing Landing Page - AeroElite B2B.txt';
const content = fs.readFileSync(txtPath, 'utf8');

const match = content.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\})\s*<\/script>/);
if (match) {
    const configStr = match[1];
    let stitchConfig;
    eval('stitchConfig = ' + configStr);

    const currentConfig = require('./tailwind.config.js');

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

    const newConfigCode = `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(currentConfig, null, 2)};`;
    fs.writeFileSync('./tailwind.config.js', newConfigCode);
    console.log('Merged tailwind config.');
} else {
    console.log('Not found');
}
