/* Taşkınpaşa Köyü — etkileşim
   Dil değişimi CSS ile yapılır; buradaki iş yalnızca <html data-lang> değerini
   ayarlamak, menüyü açıp kapamak ve haritayı kurmaktır. */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- dil ---------- */
  var STORE = 'taskinpasa-lang';

  function readLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'tr' || q === 'en') return q;
    try {
      var saved = localStorage.getItem(STORE);
      if (saved === 'tr' || saved === 'en') return saved;
    } catch (e) { /* özel mod */ }
    return (navigator.language || 'tr').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }

  function setLang(lang, remember) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.title = lang === 'tr'
      ? 'Taşkınpaşa Köyü · Ürgüp, Nevşehir'
      : 'Taşkınpaşa Village · Ürgüp, Nevşehir';
    document.querySelectorAll('[data-setlang]').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.setlang === lang);
      b.setAttribute('aria-pressed', String(b.dataset.setlang === lang));
    });
    if (remember) {
      try { localStorage.setItem(STORE, lang); } catch (e) { /* yok say */ }
    }
    if (window.__redrawPopups) window.__redrawPopups(lang);
  }

  setLang(readLang(), false);

  document.querySelectorAll('[data-setlang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.setlang, true); });
  });

  /* ---------- mobil menü ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- görünen bölümü menüde işaretle ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.topbar__nav a'));
  var watched = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && watched.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-here', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    watched.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- harita ---------- */
  var PLACES = [
    { id: 'cami',                lat: 38.49191, lng: 34.94697, tr: 'Taşkınpaşa Camii',            en: 'Taşkınpaşa Mosque',        go: 'cami' },
    { id: 'medrese',             lat: 38.49531, lng: 34.94985, tr: 'Taşkınpaşa Medresesi',        en: 'Taşkınpaşa Medrese',       go: 'medrese' },
    { id: 'dervis',              lat: 38.49447, lng: 34.94731, tr: 'Derviş Evi (Dergâh)',         en: 'The Dervish House',        go: 'dervis-evi' },
    { id: 'namazgah',            lat: 38.49277, lng: 34.94984, tr: 'Namazgâh',                    en: 'Namazgâh',                 go: 'namazgah' },
    { id: 'kilise12',            lat: 38.49342, lng: 34.94689, tr: '1 ve 2 Nolu Kiliseler',       en: 'Churches No. 1 and 2',     go: 'kilise-1' },
    { id: 'kilise3',             lat: 38.49611, lng: 34.94714, tr: '3 Nolu Kilise',               en: 'Church No. 3',             go: 'kilise-3' },
    { id: 'kilise4',             lat: 38.49269, lng: 34.94958, tr: '4 Nolu Kilise',               en: 'Church No. 4',             go: 'kilise-4' },
    { id: 'iceribag',            lat: 38.49097, lng: 34.94450, tr: 'İçeribağ (Damsa) Kilisesi',   en: 'İçeribağ (Damsa) Church',  go: 'iceribag-kilisesi' },
    { id: 'sapel',               lat: 38.49086, lng: 34.94347, tr: 'Haçlı Şapel',                 en: 'The Cross Chapel',         go: 'hacli-sapel' },
    { id: 'kesikbas',           lat: 38.49307, lng: 34.94989, tr: 'Kesikbaş Türbesi',             en: 'Kesikbaş Tomb',            go: 'kesikbas-turbesi' },
    { id: 'refik',               lat: 38.49248, lng: 34.95010, tr: 'Refik Başaran Anıt Mezarı',   en: 'Refik Başaran’s grave',    go: 'refik-basaran' },
    { id: 'kopru',               lat: 38.49069, lng: 34.94431, tr: 'Bekar Erkek Hamamı Köprüsü',  en: 'Bekar Erkek Hamamı bridge', other: true }
  ];

  /* İçeribağ Vadisi yürüyüş hattı (yaklaşık 800 m) */
  var VALLEY = [
    [38.49121,34.94253],[38.49110,34.94267],[38.49116,34.94293],[38.49107,34.94295],
    [38.49100,34.94303],[38.49092,34.94314],[38.49082,34.94327],[38.49076,34.94335],
    [38.49070,34.94348],[38.49063,34.94367],[38.49063,34.94396],[38.49073,34.94429],
    [38.49080,34.94450],[38.49077,34.94473],[38.49072,34.94490],[38.49072,34.94512],
    [38.49071,34.94524],[38.49070,34.94545],[38.49071,34.94567],[38.49074,34.94584],
    [38.49083,34.94615],[38.49106,34.94664],[38.49126,34.94704],[38.49138,34.94722],
    [38.49154,34.94742],[38.49178,34.94781],[38.49186,34.94802],[38.49189,34.94823],
    [38.49198,34.94875],[38.49209,34.94905],[38.49221,34.94916],[38.49260,34.94937],
    [38.49276,34.94946],[38.49292,34.94966],[38.49300,34.94978]
  ];

  var mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  var map = L.map(mapEl, { scrollWheelZoom: false }).setView([38.4932, 34.9470], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  var valleyLine = L.polyline(VALLEY, {
    color: '#40533F', weight: 4, opacity: .85, dashArray: '1 7', lineCap: 'round'
  }).addTo(map);
  valleyLine.bindPopup(function () {
    return root.getAttribute('data-lang') === 'tr'
      ? '<strong>İçeribağ Vadisi</strong>Yaklaşık 800 m yürüyüş güzergâhı.'
      : '<strong>İçeribağ Valley</strong>A walking route of roughly 800 m.';
  });

  var markers = [];

  PLACES.forEach(function (p) {
    var icon = L.divIcon({
      className: '',
      html: '<span class="pin' + (p.other ? ' pin--other' : '') + '"></span>',
      iconSize: [25, 25],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
    var m = L.marker([p.lat, p.lng], { icon: icon, title: p.tr }).addTo(map);
    m.__place = p;
    m.bindPopup(popupHtml(p, root.getAttribute('data-lang')));
    markers.push(m);
  });

  function popupHtml(p, lang) {
    var name = lang === 'tr' ? p.tr : p.en;
    var link = p.go
      ? '<a href="#' + p.go + '">' + (lang === 'tr' ? 'Bölüme git' : 'Go to section') + '</a>'
      : '<span style="color:#4E4941">' + (lang === 'tr' ? 'Haritada işaretli' : 'Marked on the map only') + '</span>';
    return '<strong>' + name + '</strong>' + link;
  }

  window.__redrawPopups = function (lang) {
    markers.forEach(function (m) { m.setPopupContent(popupHtml(m.__place, lang)); });
  };

  var group = L.featureGroup(markers.concat([valleyLine]));
  map.fitBounds(group.getBounds().pad(0.12));

  /* "Haritada göster" bağlantıları ilgili işareti açar */
  document.querySelectorAll('[data-focus]').forEach(function (a) {
    a.addEventListener('click', function () {
      var target = a.dataset.focus;
      var hit = markers.filter(function (m) { return m.__place.go === target; })[0];
      if (!hit) return;
      setTimeout(function () {
        map.setView(hit.getLatLng(), 17, { animate: true });
        hit.openPopup();
      }, 420);
    });
  });
})();
