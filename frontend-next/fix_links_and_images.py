import os
import glob
import re

next_app_dir = r'C:\Users\golde\Desktop\projects\skyways\skyways\frontend-next\src\app'
page_files = glob.glob(os.path.join(next_app_dir, '**', 'page.js'), recursive=True)

logo_icon_component = """
const LogoIcon = ({ className = "w-8 h-8" }) => (
  <svg 
    className={	ext-brand-red transform -rotate-45 transition-transform duration-500 } 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
      fill="currentColor"
    />
  </svg>
);
"""

logo_icon_markup = """<div className="flex items-center justify-center gap-2 font-heading text-2xl font-black text-brand-white tracking-wide">
    <LogoIcon />
    <span>Sky<span className="text-brand-red">Ways</span></span>
</div>"""

def determine_href(text):
    t = text.lower()
    if 'agent login' in t: return '/agent/login'
    if 'login' in t or 'sign in' in t: return '/dashboard' # Simulation of successful login
    if 'create account' in t or 'register' in t or 'join network' in t or 'get started' in t: return '/login?tab=register'
    if 'confirm booking' in t or 'pay' in t or 'issue' in t or 'view ticket' in t: return '/confirmation'
    if 'search' in t or 'new booking' in t: return '/search'
    if 'book' in t or 'select' in t or 'continue' in t: return '/booking'
    if 'manage' in t: return '/manage-bookings'
    if 'dashboard' in t or 'portal' in t: return '/dashboard'
    return '#'

for file in page_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Add Link and LogoIcon
    if 'import Link' not in content:
        content = content.replace("import React from 'react';", "import React from 'react';\nimport Link from 'next/link';")
    
    if 'const LogoIcon' not in content:
        content = re.sub(r'(export default function [A-Za-z0-9_]+\(\) \{)', logo_icon_component + r'\n\1', content)

    # 2. Image Replacements
    # Dashboard Mockup
    content = re.sub(r'https://lh3.googleusercontent.com/[^\'"]*wX0YC[^\'"]*', '/dashboard_mockup.png', content)
    # Network Background
    content = re.sub(r'https://lh3.googleusercontent.com/[^\'"]*KXGvjP[^\'"]*', '/network_hd.png', content)
    content = re.sub(r'https://lh3.googleusercontent.com/[^\'"]*zUvNJl[^\'"]*', '/network_hd.png', content)
    # Cabin Background
    content = re.sub(r'https://lh3.googleusercontent.com/[^\'"]*rDmogwP[^\'"]*', '/cabin_hd.png', content)
    # AeroElite Logo -> Replace the whole <img> tag with our SVG component
    content = re.sub(r'<img[^>]*AP1WRL[^>]*>', logo_icon_markup, content)
    content = re.sub(r'<img[^>]*DcG2zq[^>]*>', logo_icon_markup, content)
    content = re.sub(r'<img[^>]*AdPP4z[^>]*>', logo_icon_markup, content)
    # Agent Avatars
    avatar_hashes = ['Az_hyO', 'CyFIYi', 'BMtY', 'A-CtOa', 'BfEIfr']
    for h in avatar_hashes:
        content = re.sub(fr'https://lh3.googleusercontent.com/[^\'"]*{h}[^\'"]*', '/agent_avatar.png', content)

    # 3. Links and Buttons -> <Link>
    # We will find <a ...>...</a> and replace it with <Link ...>...</Link>
    def link_replacer(match):
        attrs = match.group(1)
        inner = match.group(2)
        # get text from inner
        text_only = re.sub(r'<[^>]+>', '', inner).strip()
        href = determine_href(text_only)
        # remove existing href from attrs
        attrs = re.sub(r'href="[^"]*"', '', attrs)
        return f'<Link href="{href}" {attrs}>{inner}</Link>'
    
    content = re.sub(r'<a([^>]*)>(.*?)</a>', link_replacer, content, flags=re.DOTALL)
    
    # Do the same for buttons
    def button_replacer(match):
        attrs = match.group(1)
        inner = match.group(2)
        text_only = re.sub(r'<[^>]+>', '', inner).strip()
        href = determine_href(text_only)
        if href != '#':
            return f'<Link href="{href}" {attrs}>{inner}</Link>'
        return match.group(0) # don't change if we can't determine href
        
    content = re.sub(r'<button([^>]*)>(.*?)</button>', button_replacer, content, flags=re.DOTALL)

    if content != original_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")

print("Done linking and images")
