#!/usr/bin/env python3
"""Gera imagens de perfil de empresários para o site."""

from PIL import Image, ImageDraw, ImageFilter
import random
import os

def generate_profile_image(name, filepath, colors_bg=None, colors_fg=None):
    """Gera uma imagem de perfil abstrata com as iniciais."""
    if colors_bg is None:
        colors_bg = [
            (52, 152, 219),    # Azul
            (155, 89, 182),    # Roxo
            (46, 204, 113),    # Verde
            (230, 126, 34),    # Laranja
            (241, 196, 15),    # Amarelo
        ]
    if colors_fg is None:
        colors_fg = [(255, 255, 255)] * len(colors_bg)
    
    # Criar imagem
    size = 300
    image = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(image)
    
    # Escolher cor de fundo
    bg_color = random.choice(colors_bg)
    fg_color = (255, 255, 255)
    
    # Desenhar fundo com gradiente simulado (círculo)
    for i in range(size // 2, 0, -1):
        ratio = 1 - (i / (size // 2))
        r = int(bg_color[0] * (1 - ratio * 0.1))
        g = int(bg_color[1] * (1 - ratio * 0.1))
        b = int(bg_color[2] * (1 - ratio * 0.1))
        draw.ellipse(
            [(size//2 - i, size//2 - i), (size//2 + i, size//2 + i)],
            fill=(r, g, b)
        )
    
    # Adicionar iniciais
    initials = ''.join([part[0].upper() for part in name.split()])
    
    # Usar fonte grande para as iniciais
    try:
        # Tentar usar Arial se disponível
        font_size = 120
        font = None
        for font_name in ['arial.ttf', 'Arial.ttf', 'C:\\Windows\\Fonts\\arial.ttf']:
            try:
                from PIL import ImageFont
                font = ImageFont.truetype(font_name, font_size)
                break
            except:
                pass
        if font is None:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    # Desenhar as iniciais no centro
    bbox = draw.textbbox((0, 0), initials, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2 - bbox[0]
    y = (size - text_height) // 2 - bbox[1]
    
    draw.text((x, y), initials, fill=fg_color, font=font)
    
    # Aplicar suavização
    image = image.filter(ImageFilter.SMOOTH)
    
    # Salvar imagem
    image.save(filepath)
    print(f"✓ Gerado: {filepath}")

# Dados dos empresários
profiles = [
    {"name": "João Mendes", "file": "profile-joao.png"},
    {"name": "Maria Sousa", "file": "profile-maria.png"},
    {"name": "Carlos Lima", "file": "profile-carlos.png"},
]

# Caminho de destino
assets_path = "src/assets"
os.makedirs(assets_path, exist_ok=True)

# Gerar imagens
for profile in profiles:
    filepath = os.path.join(assets_path, profile["file"])
    generate_profile_image(profile["name"], filepath)

print("\n✅ Todas as imagens foram geradas com sucesso!")
