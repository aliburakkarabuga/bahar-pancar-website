# Bahar Pancar | Psikolog

> Psikolog Bahar Pancar için tasarlanmış kişisel website. Gerçek kartvizitinden ilham alınan lacivert & altın renk paleti, yüksek kaliteli animasyonlar ve tam mobil uyumluluk ile inşa edildi.

---

##  Site Yapısı

Site tek sayfalık (single-page) bir yapıya sahip olup şu bölümlerden oluşur:

| Bölüm | Açıklama |
|---|---|
| **Hero** | Tam ekran giriş, parçacık animasyonu, 3D dönen kartvizit |
| **Stats** | Danışan sayısı, deneyim yılı, uzmanlık alanı sayaçları |
| **Hizmetler** | 6 uzmanlık alanı — Bireysel Terapi, Kaygı & Stres, İlişki Terapisi, Travma & Yas, Online Seans, Öz Farkındalık |
| **Hakkında** | Fotoğraf, alıntı, diploma ve uzmanlık bilgileri |
| **İletişim** | E-posta, telefon, lokasyon bilgileri ve randevu butonu |

---

##  Animasyonlar & Efektler

### Sayfa Açılışı
- **Page Loader** — "B. PANCAR" yazısı soldan açılır, altında ince altın çizgi uzar, "Psikolog" belirir. 2.5 saniye sonra site açılır. Harici kaynaklar yüklenmese bile timeout ile açılma garantisi vardır.

### Hero Bölümü
- **Canvas Particle System** — Fare hareketine tepki veren altın parçacıklar birbirine yaklaşınca bağlantı çizgileri oluşturur. Mobilede performans için sadeleştirilmiş versiyonu çalışır.
- **Parallax Başlık** — "Bahar" ve "Pancar" yazıları scroll'da farklı hızlarda hareket ederek derinlik hissi yaratır (`data-speed` attribute ile kontrol edilir).
- **Floating Orbs** — Arka planda yüzen blur'lu ışık topları, mouse parallax efektiyle hareket eder.
- **Grid Pan** — Hero arka planındaki ince ızgara sürekli yavaşça kayar.

### 3D Kartvizit
- Hover'da mouse pozisyonuna göre `rotateY` + `rotateX` ile gerçek kartvizit gibi eğilir.
- Tıklayınca / dokunca `rotateY(180deg)` ile arka yüze döner — ön yüz lacivert (kartvizit ön), arka yüz krem rengi (kartvizit arka, iletişim bilgileri ile).
- `backface-visibility: hidden` ve sabit transform değerleri ile titreme sorunu çözülmüştür.
- Mobilde touch event'leri ile çalışır, ghost click problemi `touchend` → `e.preventDefault()` ile engellenir.

### Scroll Animasyonları
- **Clip-path Reveal** — Her bölüm `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)` geçişiyle perde açılır gibi ekrana gelir. `IntersectionObserver` ile tetiklenir.

### Hizmet Kartları
- Hover'da `perspective(600px) rotateX rotateY` ile 3D tilt efekti.
- Alt kenarda soldan sağa uzayan altın gradient çizgi (`::before` pseudo-element, `scaleX` animasyonu).

### Butonlar
- **Magnetic Effect** — Mouse pozisyonuna göre butonu hafifçe çeker (`transform: translate`).
- **Wipe Fill** — Hover'da altın renk soldan sağa kayarak butonu doldurur (`translateX` animasyonu).

### Cursor (yalnızca desktop)
- Özel altın nokta cursor, link ve kart hover'larında büyüyerek şeffaf daireye dönüşür.

### Nav
- Sayfa en üstteyken şeffaf, scroll'da `backdrop-filter: blur(20px)` ile buzlu cam efekti alır.

---

##  Dosya Yapısı

```
bahar-pancar-website/
├── index.html            ← Tüm HTML yapısı ve bölümler
├── vercel.json           ← Vercel routing config
├── README.md
└── public/
    ├── style.css         ← Tüm CSS (reset, değişkenler, layout, animasyonlar, responsive)
    ├── main.js           ← Tüm JavaScript (loader, particles, card, cursor, parallax, reveal)
    └── images/           ← Görseller (fotoğraf buraya eklenecek)
```

---

##  Teknoloji

- **Vanilla HTML / CSS / JavaScript** — Sıfır bağımlılık, sıfır framework
- **Google Fonts** — Cormorant Garamond (display) + Jost (body)
- **Canvas API** — Parçacık sistemi
- **CSS Custom Properties** — Renk ve geçiş değişkenleri
- **CSS clip-path** — Scroll reveal animasyonları
- **Intersection Observer API** — Performanslı scroll tetikleyici
- **CSS backdrop-filter** — Nav buzlu cam efekti

---

##  Responsive

| Breakpoint | Davranış |
|---|---|
| `> 900px` | Desktop — tüm efektler aktif |
| `≤ 900px` | Tablet — hero dikey, about tek kolon |
| `≤ 640px` | Mobil — hamburger menü, kartlar tek kolon, parçacık sayısı azaltılmış |

Mobilde mouse bazlı efektler (magnetic button, cursor, parallax) devre dışı bırakılır. `window.matchMedia('(hover: none)')` ile tespit edilir.

iPhone notch desteği için `env(safe-area-inset-*)` uygulanmıştır.

---

##  Kurulum & Çalıştırma

```bash
git clone https://github.com/aliburakkarabuga/bahar-pancar.git
cd bahar-pancar
```

Bağımlılık yoktur. VSCode Live Server ile aç ya da doğrudan `index.html` dosyasını tarayıcıya sürükle.

---

##  İçerik Güncellemeleri

| Alan | Dosya | Satır |
|---|---|---|
| Fotoğraf | `index.html` | `<img src="" id="aboutImg">` → src ekle |
| Diploma bilgisi | `index.html` | `credential-value` → "Eklenecek" yaz |
| Hakkında paragrafı | `index.html` | `about-body` class'lı `<p>` |
| Stats rakamları | `index.html` | `data-target` attribute'ları |

---

##  İletişim

**Bahar Pancar** — Psikolog  
Uzmanlık: BDT · Mindfulness · Oyun Terapisi  
Lokasyon: Manisa · Online  
psikologbaharpancar@gmail.com  
 0530 610 45 12
