import os
import glob
import re

next_app_dir = r'C:\Users\golde\Desktop\projects\skyways\skyways\frontend-next\src\app'
page_files = glob.glob(os.path.join(next_app_dir, '**', 'page.js'), recursive=True)

for file in page_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    images = re.findall(r'(https://lh3.googleusercontent.com/[^\'"]+)', content)
    if images:
        print(f"\n--- {os.path.relpath(file, next_app_dir)} ---")
        for img in set(images):
            print(img)
