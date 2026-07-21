import re
import json
import os

txt_path = r'C:\Users\golde\Desktop\projects\skyways\skyways\STICH DESIGNS\Agent Marketing Landing Page - AeroElite B2B.txt'
with open(txt_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the tailwind.config object
match = re.search(r'tailwind\.config\s*=\s*(\{.*?\})\s*</script>', content, re.DOTALL)
if match:
    config_str = match.group(1)
    
    merge_script = '''
const fs = require('fs');
const currentConfig = require('./tailwind.config.js');
const stitchConfig = ''' + config_str + ''';

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

const newConfigCode = /** @type {import('tailwindcss').Config} */\nmodule.exports = ;;
fs.writeFileSync('./tailwind.config.js', newConfigCode);
console.log('Merged tailwind config.');
'''
    with open('merge_tailwind.js', 'w', encoding='utf-8') as f:
        f.write(merge_script)
    os.system('node merge_tailwind.js')
else:
    print('Tailwind config not found in txt.')
