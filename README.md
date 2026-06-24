# Bahar Pancar — Psikolog Website

## Proje Yapısı

```
bahar-pancar/
├── index.html          ← Ana sayfa
├── vercel.json         ← Vercel config (dokunma)
├── README.md
└── public/
    ├── style.css       ← Tüm tasarım
    ├── main.js         ← Animasyonlar & etkileşimler
    └── images/
        └── foto.jpg    ← Fotoğrafı buraya koy
```

## Fotoğraf Eklemek

1. Fotoğrafı `public/images/` klasörüne at (örn: `foto.jpg`)
2. `index.html` içinde şu satırı bul:
   ```html
   <img src="" alt="Bahar Pancar" id="aboutImg">
   ```
3. `src=""` → `src="public/images/foto.jpg"` yap

## Vercel'e Deploy (ücretsiz)

### Yöntem 1 — GitHub üzerinden (önerilen)
1. [github.com](https://github.com) → New repository → `bahar-pancar`
2. Tüm dosyaları yükle (Upload files)
3. [vercel.com](https://vercel.com) → "Add New Project"
4. GitHub reposunu seç → Deploy
5. Her değişiklikte GitHub'a push → Vercel otomatik günceller

### Yöntem 2 — Vercel CLI
```bash
npm i -g vercel
cd bahar-pancar
vercel
```

## Güncelleme Yapılacaklar
- [ ] Fotoğraf ekle
- [ ] Diploma / sertifika bilgisi
- [ ] Telefon numarası
- [ ] E-posta adresi
- [ ] Hakkında paragrafı
- [ ] Özel domain (isteğe bağlı)
