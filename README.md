# Taşkınpaşa Köyü — tanıtım sitesi

Ürgüp (Nevşehir) Taşkınpaşa Köyü için iki dilli (TR/EN), mobil uyumlu, haritalı
tek sayfalık tanıtım sitesi. Statik dosyalardan oluşur; sunucu tarafı kod,
derleme adımı veya bağımlılık yüklemesi gerektirmez.

## GitHub Pages'te yayına alma

1. GitHub'da yeni bir depo açın.
2. Bu klasörün **içindekileri** (klasörün kendisini değil) deponun köküne yükleyin.
   `index.html` deponun kökünde olmalıdır.
3. Depoda **Settings → Pages** bölümüne gidin.
4. *Source* olarak **Deploy from a branch**, dal olarak **main**, klasör olarak
   **/ (root)** seçin ve kaydedin.
5. Bir iki dakika içinde site `https://<kullanıcı-adı>.github.io/<depo-adı>/`
   adresinde yayına girer.

`.nojekyll` dosyası, GitHub'ın dosyaları Jekyll ile işlemesini engeller; silmeyin.

Yerel olarak denemek için klasörün içinde:

```
python3 -m http.server 8000
```

sonra tarayıcıda `http://localhost:8000` adresini açın. (Dosyaya çift tıklamak
yerine sunucu kullanın; `file://` üzerinden yazı tipleri yüklenmez.)

## Klasör yapısı

```
index.html                 Tüm içerik, iki dilde
favicon.svg
.nojekyll
assets/
  css/style.css            Sayfa stili
  css/fonts.css            Yazı tipi tanımları
  js/main.js               Dil değişimi, menü, harita
  img/                     Fotoğraflar (1600 px ve 800 px)
  fonts/                   Fraunces ve Archivo (woff2)
  vendor/leaflet/          Harita kitaplığı
```

## Dil

Sayfa iki dili de HTML içinde barındırır; TR/EN düğmesi yalnızca hangisinin
görüneceğini değiştirir. Bu sayede JavaScript kapalıyken de içerik okunur ve
arama motorları her iki dili de görür.

- Ziyaretçinin tercihi tarayıcıda saklanır.
- `?lang=en` veya `?lang=tr` ile doğrudan bağlantı verilebilir.
- İlk ziyarette tarayıcı dili Türkçe ise TR, değilse EN açılır.

## Harita

Leaflet + OpenStreetMap kullanır; API anahtarı gerekmez. Konumlar
`assets/js/main.js` içindeki `PLACES` dizisinde, vadi yürüyüş hattı ise `VALLEY`
dizisinde tutulur. Yeni bir yapı eklemek için `PLACES` dizisine bir satır
eklemek ve `go` alanına ilgili bölümün `id` değerini yazmak yeterlidir.

## İçerik notları

- **Taşkın Paşa portresi temsilîdir**; alt yazısında bu açıkça belirtilir.
  Taşkın Paşa'nın bilinen bir portresi yoktur.
- **Fosil bölümündeki kafatası fotoğrafı** Şenyürek'in 1954 tarihli makalesinden
  alınmıştır ve alt yazıda kaynak gösterilmiştir.
- **Damsa haritası** Osmanlı Arşivi'nden bir haritadır; Latin harfli okumaları
  Aytülü Dirik eklemiştir. Kaynak ve okumayı yapan kişi, görselin alt yazısında
  her iki dilde belirtilmiştir.
- **"Bekar Erkek Hamamı Köprüsü"** haritada yeşil işaretle gösterilir ama
  kendisine ait bir bölüm yoktur; hakkında metin yazılırsa `FOCUS` eşlemesine
  ve ilgili `PLACES` kaydının `go` alanına eklenmelidir.
- Fotoğraflar 1600 px genişliğe indirilmiş, `srcset` ile küçük ekranlarda 800 px
  sürüm sunulmuştur. Özgün dosyalar bu klasörde tutulmaz.

## Hakkında bölümü

Sayfayı hazırlayan kişi, telif notu ve iletişim bilgileri `index.html` içindeki
`#hakkinda` bölümünde ve alt bilgide yer alır. Telefon `tel:` bağlantısıyla
verilmiştir; mobilde dokununca doğrudan arama başlar.

## Metinlerin kaynağı

Sayfadaki bilgiler, sitenin sonundaki kaynakçada listelenen çalışmalara
dayanmaktadır. Fotoğrafların çoğu köyde çekilmiştir; ahşap mihrap ve minber
görselleri Ankara Etnografya Müzesi'ndeki eserlere, Samotherium kafatası
Şenyürek'in 1954 tarihli makalesine, Damsa haritası ise Osmanlı Arşivi'ne aittir
(Türkçeleştiren: Aytülü Dirik).

## Lisans

Yazı tipleri Fraunces ve Archivo, SIL Open Font License 1.1 ile dağıtılmaktadır.
Leaflet BSD-2-Clause lisanslıdır. Harita altlığı © OpenStreetMap katkıcıları
(ODbL); sayfada gerekli atıf gösterilmektedir.
