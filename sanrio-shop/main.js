// ════════════════════════════════════════
//  Kawaii Corner — Sanrio Merch Shop
//  main.js
// ════════════════════════════════════════

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  TRANSLATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━
const LANG = {
  en: {
    tagline:       'Official Sanrio merch — plushies, accessories, collectibles!',
    searchPlaceholder: 'Search products...',
    allProducts:   'All Products',
    allPill:       'All',
    categories:    'Categories',
    shop:          'Shop',
    allLink:       'All Products',
    loginBtn:      'Log In',
    logoutBtn:     'Log Out',
    basketBtn:     '🛒 Cart',
    basketTitle:   '🛒 Cart',
    basketEmpty:   'Log in to use the cart',
    basketLogin:   'Your cart is empty 🛍️',
    total:         'Total:',
    checkoutBtn:   'Place Order',
    loginTab:      'Log In',
    registerTab:   'Sign Up',
    loginIdPlaceholder:   'Username or email',
    loginPassPlaceholder: 'Password',
    loginSubmit:   'Log In',
    regUserPlaceholder:   'Username',
    regPassPlaceholder:   'Password (min. 6 chars)',
    regSubmit:     'Sign Up',
    regSuccess:    'Account created!',
    regSuccessMsg: 'You are now registered. Please log in to continue.',
    regSuccessBtn: 'Go to Login',
    orderSuccess:  'Order Placed!',
    orderMsg:      'Thank you for shopping at Kawaii Corner! Your kawaii items are on their way 🌸',
    orderLabel:    'Order number:',
    inStock:       'In stock:',
    pcs:           'pcs.',
    outOfStock:    'Unavailable',
    addToCart:     'Add to Cart',
    colorLabel:    'Color:',
    noProducts:    'No products found',
    greetToast:    'Welcome back, ',
    registerToast: 'Account created! Welcome, ',
    logoutToast:   'See you later!',
    addedToCart:   'Added to cart!',
    // Product type filters
    typePlushies:  'Plushies',
    typeKeychains: 'Keychains / Charms',
    typePins:      'Pins',
    typeFigurines: 'Figurines',
    typePosters:   'Posters / Prints',
    typeAll:       'All',
    hi:            '👋',
  },
  pl: {
    tagline:       'Oficjalny merch Sanrio — pluszaki, akcesoria, kolekcje!',
    searchPlaceholder: 'Szukaj produktów...',
    allProducts:   'Wszystkie produkty',
    allPill:       'Wszystkie',
    categories:    'Kategorie',
    shop:          'Sklep',
    allLink:       'Wszystkie produkty',
    loginBtn:      'Zaloguj się',
    logoutBtn:     'Wyloguj',
    basketBtn:     '🛒 Koszyk',
    basketTitle:   '🛒 Koszyk',
    basketEmpty:   'Zaloguj się, aby korzystać z koszyka',
    basketLogin:   'Twój koszyk jest pusty 🛍️',
    total:         'Łącznie:',
    checkoutBtn:   'Złóż zamówienie',
    loginTab:      'Logowanie',
    registerTab:   'Rejestracja',
    loginIdPlaceholder:   'Login lub e-mail',
    loginPassPlaceholder: 'Hasło',
    loginSubmit:   'Zaloguj się',
    regUserPlaceholder:   'Nazwa użytkownika',
    regPassPlaceholder:   'Hasło (min. 6 znaków)',
    regSubmit:     'Zarejestruj się',
    regSuccess:    'Konto utworzone!',
    regSuccessMsg: 'Jesteś teraz zarejestrowany/a. Zaloguj się, aby kontynuować.',
    regSuccessBtn: 'Przejdź do logowania',
    orderSuccess:  'Zamówienie złożone!',
    orderMsg:      'Dziękujemy za zakupy w Kawaii Corner! Twoje kawaii są już w drodze 🌸',
    orderLabel:    'Numer zamówienia:',
    inStock:       'Na stanie:',
    pcs:           'szt.',
    outOfStock:    'Niedostępny',
    addToCart:     '🛒 Dodaj do koszyka',
    colorLabel:    'Kolor:',
    noProducts:    'Brak produktów',
    greetToast:    'Witaj, ',
    registerToast: 'Konto utworzone! Witaj, ',
    logoutToast:   'Do zobaczenia!',
    addedToCart:   'Dodano do koszyka! 🛒',
    typePlushies:  'Pluszaki',
    typeKeychains: 'Breloczki / Charmy',
    typePins:      'Przypinki',
    typeFigurines: 'Figurki',
    typePosters:   'Plakaty / Printy',
    typeAll:       'Wszystkie',
    hi:            '👋',
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  PRODUCT VARIANT DATA
//  Each product id maps to an array of { color, label_en, label_pl, image_url, description_en, description_pl }
// ━━━━━━━━━━━━━━━━━━━━━━━━━
const PRODUCT_VARIANTS = {
  // Hello Kitty ids 1-5
  1:  [{ color: '#f5f5f5', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/Hellokitty.avif',            description_en: 'Classic Hello Kitty plush with iconic red bow, 25cm.',    description_pl: 'Klasyczna pluszowa Hello Kitty z czerwoną kokardką, 25cm.' },
       { color: '#8b6e48', label_en: 'Monkey',  label_pl: 'Małpka',    image_url: 'images/hellokittymonkey.webp',       description_en: 'Hello Kitty monkey collab edition plush, 25cm.',           description_pl: 'Hello Kitty edycja małpka, 25cm.' }],
  2:  [{ color: '#f5f5f5', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/hellokittycharm.webp',        description_en: 'Classic Hello Kitty metal keychain charm.',               description_pl: 'Klasyczny metalowy breloczek Hello Kitty.' }],
  3:  [{ color: '#ff8fab', label_en: 'Pink',    label_pl: 'Różowy',    image_url: 'images/hellokittybadgeset.jpg',      description_en: 'Set of 5 Hello Kitty enamel pins.',                       description_pl: 'Zestaw 5 metalowych przypinak Hello Kitty.' }],
  4:  [{ color: '#f5f5f5', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/hellokittyfigurine.webp',     description_en: 'Hello Kitty classic collectible figurine.',               description_pl: 'Klasyczna figurka kolekcjonerska Hello Kitty.' }],
  5:  [{ color: '#ffd6e7', label_en: 'Dress',   label_pl: 'Sukienka',  image_url: 'images/hellokittyfigurine(2).webp',  description_en: 'Hello Kitty figurine in a cute dress.',                   description_pl: 'Figurka Hello Kitty w ślicznej sukience.' }],
  // My Melody ids 6-9
  6:  [{ color: '#e982a6', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/Mymelodyfigurine.jpg',        description_en: 'My Melody classic collectible figurine.',                 description_pl: 'Klasyczna figurka My Melody.' }],
  7:  [{ color: '#e982a6', label_en: 'Pink',    label_pl: 'Różowy',    image_url: 'images/mymelody.jpg',                description_en: 'My Melody plush in her signature pink hood, 30cm.',      description_pl: 'Puszysta My Melody w różowej kapturce, 30cm.' },
       { color: '#e00000', label_en: 'Red',     label_pl: 'Czerwony',  image_url: 'images/mymelodyred.webp',            description_en: 'My Melody red hood limited edition plush, 30cm.',        description_pl: 'My Melody w czerwonej kapturce — edycja limitowana, 30cm.' }],
  8:  [{ color: '#e982a6', label_en: 'Pink',    label_pl: 'Różowy',    image_url: 'images/Mymelodycharm.webp',          description_en: 'Soft rubber My Melody keychain charm, 7cm.',             description_pl: 'Gumowy breloczek My Melody, 7cm.' }],
  9:  [{ color: '#e982a6', label_en: 'Pink',    label_pl: 'Różowy',    image_url: 'images/mymelodypin.jpg',             description_en: 'My Melody steel badgepin.',                               description_pl: 'Stalowa przypinka My Melody.' }],
  // Cinnamoroll ids 10-15
  10: [{ color: '#a8d8ea', label_en: 'Blue',     label_pl: 'Niebieski', image_url: 'images/cinnamonrollcharm.webp',     description_en: 'Cinnamoroll head-shaped silicone keychain.',              description_pl: 'Silikonowy breloczek w kształcie głowy Cinnamoroll.' }],
  11: [{ color: '#f5f5f5', label_en: 'Classic',  label_pl: 'Klasyczny', image_url: 'images/cinnamonroll.webp',          description_en: 'Cinnamoroll classic fluffy white plush, 20cm.',           description_pl: 'Klasyczny biały pluszak Cinnamoroll, 20cm.' },
       { color: '#f7a3c6', label_en: 'Axolotl',  label_pl: 'Aksolotl',  image_url: 'images/cinnamonrollaxolotl.webp',  description_en: 'Cinnamoroll x Axolotl collab edition plush, 20cm.',      description_pl: 'Cinnamoroll edycja aksolotl, 20cm.' },
       { color: '#c8a87a', label_en: 'Capybara', label_pl: 'Kapibara',  image_url: 'images/cinnamonrollcapibara.webp', description_en: 'Cinnamoroll x Capybara collab edition plush, 20cm.',     description_pl: 'Cinnamoroll edycja kapibara, 20cm.' }],
  12: [{ color: '#a8d8ea', label_en: 'Blue',     label_pl: 'Niebieski', image_url: 'images/cinnamonrollkeychain.webp',  description_en: 'Soft silicone Cinnamoroll keychain charm.',               description_pl: 'Gumowy breloczek Cinnamoroll.' }],
  13: [{ color: '#a8d8ea', label_en: 'Blue',     label_pl: 'Niebieski', image_url: 'images/cinnamonrollpin.webp',       description_en: 'Set of 9 Cinnamoroll enamel pins.',                       description_pl: 'Zestaw 9 przypinak Cinnamoroll.' }],
  14: [{ color: '#a8d8ea', label_en: 'Classic',  label_pl: 'Klasyczny', image_url: 'images/cinnamonrollfigurine.webp',  description_en: 'Cinnamoroll figurine with a little crown.',               description_pl: 'Figurka Cinnamoroll z małą koroną.' }],
  15: [{ color: '#a8d8ea', label_en: 'Blue',     label_pl: 'Niebieski', image_url: 'images/cinnamonrollpin(2).webp',    description_en: 'Cinnamoroll single enamel pin.',                          description_pl: 'Pojedyncza przypinka Cinnamoroll.' }],
  // Kuromi ids 16-19
  16: [{ color: '#2a2a2a', label_en: 'Black',  label_pl: 'Czarny',    image_url: 'images/kuromi.webp',                 description_en: 'Kuromi classic black plush with skull motif, 25cm.',    description_pl: 'Klasyczna czarna Kuromi z czaszką, 25cm.' },
       { color: '#9b59b6', label_en: 'Purple', label_pl: 'Fioletowy', image_url: 'images/kuromipurple.webp',           description_en: 'Kuromi purple velvet edition plush, 25cm.',              description_pl: 'Kuromi edycja fioletowy aksamit, 25cm.' },
       { color: '#db64ff', label_en: 'Velvet', label_pl: 'Aksamit',   image_url: 'images/kuromivelvet.webp',           description_en: 'Kuromi dark red velvet limited edition, 25cm.',          description_pl: 'Kuromi ciemnoczerwony aksamit — edycja limitowana, 25cm.' }],
  17: [{ color: '#2a2a2a', label_en: 'Black',  label_pl: 'Czarny',    image_url: 'images/kuromicharm.webp',            description_en: 'Kuromi rubber skull keychain charm.',                    description_pl: 'Gumowy breloczek Kuromi z czaszką.' }],
  18: [{ color: '#9b59b6', label_en: 'Purple', label_pl: 'Fioletowy', image_url: 'images/Kuromifigurine.webp',         description_en: 'Kuromi collectible PVC figurine.',                       description_pl: 'Figurka kolekcjonerska Kuromi PVC.' }],
  19: [{ color: '#9b59b6', label_en: 'Maid',   label_pl: 'Pokojówka', image_url: 'images/Kuromifigurine(2).webp',      description_en: 'Kuromi in maid dress figurine.',                         description_pl: 'Figurka Kuromi w stroju pokojówki.' }],
  // Pompompurin ids 20-23
  20: [{ color: '#f9ca24', label_en: 'Yellow', label_pl: 'Żółty',    image_url: 'images/pompompurin.jpg',              description_en: 'Pompompurin classic golden retriever plush in beret, 20cm.', description_pl: 'Klasyczny Pompompurin w żółtym berecie, 20cm.' },
       { color: '#c8842a', label_en: 'Brown',  label_pl: 'Brązowy',  image_url: 'images/pompompurinbrown.webp',        description_en: 'Pompompurin brown caramel edition plush, 20cm.',            description_pl: 'Pompompurin edycja brązowa karmel, 20cm.' },
       { color: '#e8c4d0', label_en: 'Shirt',  label_pl: 'Koszulka', image_url: 'images/pompompurinshirt.webp',        description_en: 'Pompompurin in cute shirt outfit edition, 20cm.',           description_pl: 'Pompompurin w koszulce — edycja specjalna, 20cm.' }],
  21: [{ color: '#f9ca24', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/pompomfigurine.jpg',         description_en: 'PVC Pompompurin figurine with pudding base, 8cm.',        description_pl: 'Figurka PVC Pompompurin z podstawką, 8cm.' }],
  22: [{ color: '#f9ca24', label_en: 'Yellow', label_pl: 'Żółty',    image_url: 'images/pompompurincharm.jpg',         description_en: 'Pudding-shaped Pompompurin rubber keychain.',            description_pl: 'Gumowy breloczek Pompompurin w kształcie puddingu.' }],
  23: [{ color: '#f9ca24', label_en: 'Yellow', label_pl: 'Żółty',    image_url: 'images/pompompin.webp',               description_en: 'Pompompurin small steel badgepin.',                      description_pl: 'Mała stalowa przypinka Pompompurin.' }],
  // Keroppi ids 24-26
  24: [{ color: '#4caf50', label_en: 'Green', label_pl: 'Zielony',  image_url: 'images/Keroppi.jpeg',                  description_en: 'Keroppi classic green frog plush, 18cm.',               description_pl: 'Klasyczna zielona żabka Keroppi, 18cm.' },
       { color: '#c0392b', label_en: 'Red',   label_pl: 'Czerwony', image_url: 'images/Kerropired.jpg',                description_en: 'Keroppi red special edition plush, 18cm.',              description_pl: 'Keroppi edycja czerwona, 18cm.' }],
  25: [{ color: '#55ff00', label_en: 'Green', label_pl: 'Zielony',  image_url: 'images/keroppicharm.jpg',              description_en: 'Translucent green Keroppi rubber keychain.',            description_pl: 'Przeźroczysty zielony breloczek Keroppi'}],  
  26: [{ color: '#4caf50', label_en: 'Green', label_pl: 'Zielony',  image_url: 'images/keroppipin.jpg',                description_en: 'Small, steel pin with Keroppi frog.',                   description_pl: 'Przeźroczysty zielony breloczek Keroppi.' },
       { color: '#366944', label_en: 'Dark Green', label_pl: 'Ciemno Zielony', image_url: 'images/keroppibadge.jpg',   description_en: 'Small, steel, dark green pin with Keroppi frog.',       description_pl: 'Mała, stalowa, ciemnozielona broszka z żabą Keroppi.'}
  ],

  // Chococat ids 27-30
  27: [{ color: '#3e2723', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/chococat.webp',              description_en: 'Chococat classic black cat plush with big eyes, 22cm.', description_pl: 'Klasyczny czarny kot Chococat z wielkimi oczami, 22cm.' },
       { color: '#1565c0', label_en: 'Blue',    label_pl: 'Niebieski', image_url: 'images/chococatblue.webp',          description_en: 'Chococat blue galaxy limited edition plush, 22cm.',     description_pl: 'Chococat edycja blue galaxy, 22cm.' }],
  28: [{ color: '#3e2723', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/chococatcharm.webp',         description_en: 'Chococat rubber antenna keychain charm.',               description_pl: 'Gumowy breloczek Chococat z antenką.' }],
  29: [{ color: '#3e2723', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/chococatfigurine.webp',      description_en: 'Chococat PVC collectible figurine, 8cm.',               description_pl: 'Figurka kolekcjonerska Chococat PVC, 8cm.' }],
  30: [{ color: '#3e2723', label_en: 'Pink',    label_pl: 'Różowy',    image_url: 'images/chococatpin.webp',           description_en: 'Chococat pink badgepin.',                               description_pl: 'Różowa przypinka Chococat.' }],
  // Badtz-Maru ids 31-34
  31: [{ color: '#212121', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/badtz-maru.webp',            description_en: 'Badtz-Maru classic penguin plush with spiky hair, 20cm.', description_pl: 'Klasyczny pingwin Badtz-Maru, 20cm.' }],
  32: [{ color: '#212121', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/badtz-marucharm.webp',       description_en: 'Badtz-Maru rubber expression keychain.',               description_pl: 'Gumowy breloczek Badtz-Maru.' }],
  33: [{ color: '#212121', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/badtz-marufigurine.webp',    description_en: 'Badtz-Maru collectible PVC figurine, 10cm.',           description_pl: 'Figurka PVC Badtz-Maru, 10cm.' }],
  34: [{ color: '#212121', label_en: 'Black',   label_pl: 'Czarny',    image_url: 'images/badtz-marupin.jpg',          description_en: 'Badtz-Maru steel badgepin.',                           description_pl: 'Stalowa przypinka Badtz-Maru.' }],
  // Pochacco ids 35-38
  35: [{ color: '#f5f5f5', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/pochacco.webp',              description_en: 'Pochacco classic white puppy plush, 22cm.',            description_pl: 'Klasyczny biały piesek Pochacco, 22cm.' },
       { color: '#c0392b', label_en: 'Red',     label_pl: 'Czerwony',  image_url: 'images/pochaccored.jpg',            description_en: 'Pochacco red sporty edition plush, 22cm.',             description_pl: 'Pochacco edycja sportowa czerwona, 22cm.' }],
  36: [{ color: '#f5f5f5', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/pochaccocharm.webp',         description_en: 'Pochacco rubber keychain charm.',                      description_pl: 'Gumowy breloczek Pochacco.' }],
  37: [{ color: '#f5f5f5', label_en: 'Classic', label_pl: 'Klasyczny', image_url: 'images/pochaccofigurine.jpg',       description_en: 'Pochacco collectible PVC figurine, 8cm.',              description_pl: 'Figurka kolekcjonerska Pochacco, 8cm.' }],
  38: [{ color: '#42a5f5', label_en: 'Blue',    label_pl: 'Niebieski', image_url: 'images/pochaccopin.jpg',            description_en: 'Pochacco small steel pin.',                            description_pl: 'Mała stalowa przypinka Pochacco.' }],
  // Collabs ids 39-42
  39: [{ color: '#39c5bb', label_en: 'Teal',      label_pl: 'Miętowy',  image_url: 'images/HatsuneMikuCinnamonRoll.webp',   description_en: 'Hatsune Miku x Cinnamoroll figurine vol.1 — teal.',      description_pl: 'Figurka Hatsune Miku x Cinnamoroll vol.1 — miętowa.' }],
  40: [{ color: '#f8b4d9', label_en: 'Bow',       label_pl: 'Kokardka', image_url: 'images/HatsuneMikuxCinnamoroll(2).webp', description_en: 'Hatsune Miku x Cinnamoroll figurine vol.2 — bow & clouds.', description_pl: 'Figurka Hatsune Miku x Cinnamoroll vol.2 — kokardki i chmurki.' }],
  41: [{ color: '#1a237e', label_en: 'Dark Navy', label_pl: 'Granatowy',image_url: 'images/HatsuneMikuxCinnamoroll(3).webp', description_en: 'Hatsune Miku x Cinnamoroll figurine vol.3 — dark school.', description_pl: 'Figurka Hatsune Miku x Cinnamoroll vol.3 — edycja szkolna.' }],
  42: [{ color: '#4caf50', label_en: 'Green',     label_pl: 'Zielony',  image_url: 'images/keroppifigurine.webp',            description_en: 'Keroppi Funko POP collectible figurine.',                description_pl: 'Figurka Funko POP Keroppi.' }],
  // Character Mix ids 43-46
  43: [{ color: '#ff8fab', label_en: 'Vol. 1', label_pl: 'Zestaw 1', image_url: 'images/stickerpack.webp',    description_en: 'Sanrio sticker pack vol. 1 — 30 stickers.', description_pl: 'Zestaw naklejek Sanrio vol. 1 — 30 naklejek.' }],
  44: [{ color: '#ff8fab', label_en: 'Vol. 1', label_pl: 'Vol. 1',   image_url: 'images/print.jpg',           description_en: 'Official Sanrio A3 art print vol. 1.',       description_pl: 'Oficjalny plakat Sanrio A3 vol. 1.' }],
  45: [{ color: '#a8d8ea', label_en: 'Vol. 2', label_pl: 'Zestaw 2', image_url: 'images/stickerpack(2).webp', description_en: 'Sanrio sticker pack vol. 2 — 30 stickers.', description_pl: 'Zestaw naklejek Sanrio vol. 2 — 30 naklejek.' }],
  46: [{ color: '#a8d8ea', label_en: 'Vol. 2', label_pl: 'Vol. 2',   image_url: 'images/print(2).jpg',        description_en: 'Official Sanrio A3 art print Sweet Edition.', description_pl: 'Oficjalny plakat Sanrio A3 edycja Sweet.' }],
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  PRODUCT TYPE MAPPING
// ━━━━━━━━━━━━━━━━━━━━━━━━━
function getProductType(name) {
  const lower = ' ' + name.toLowerCase() + ' ';
  if (lower.includes('figurine'))  return 'figurines';
  if (lower.includes('plush'))     return 'plushies';
  if (lower.includes('keychain') || lower.includes('charm')) return 'keychains';
  if (lower.includes('badgepin') || lower.includes('pins set') || lower.match(/ pin[s]? /)) return 'pins';
  if (lower.includes('poster') || lower.includes('print')) return 'posters';
  if (lower.includes('sticker'))   return 'stickers';
  return 'keychains';
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━
let currentLang    = 'en';
let currentUser    = null;
let allProducts    = [];
let allCategories  = [];
let activeCat      = '';
let activeType     = '';
let currentProduct = null;
let currentVariant = null;
let modalQty       = 1;
let basketOpen     = false;
let menuOpen       = false;

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  INIT
// ━━━━━━━━━━━━━━━━━━━━━━━━━
async function init() {
  await checkAuth();
  await loadCategories();
  await loadProducts();
  applyLang();
}
init();

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  LANGUAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━
function t(key) { return LANG[currentLang][key] ?? LANG.en[key] ?? key; }

function toggleLang() {
  currentLang = currentLang === 'en' ? 'pl' : 'en';
  document.getElementById('lang-btn').textContent = currentLang === 'en' ? '🇵🇱 PL' : '🇬🇧 EN';
  applyLang();
  renderProducts(allProducts);
}

function applyLang() {
  document.getElementById('hero-tagline').textContent      = t('tagline');
  document.getElementById('search-input').placeholder      = t('searchPlaceholder');
  document.getElementById('auth-open-btn').textContent     = t('loginBtn');
  document.getElementById('logout-btn').textContent        = t('logoutBtn');
  document.getElementById('basket-btn-label').textContent  = t('basketBtn');
  document.getElementById('basket-panel-title').textContent= t('basketTitle');
  document.getElementById('basket-total-label').textContent= t('total');
  document.getElementById('checkout-btn').textContent      = t('checkoutBtn');
  document.getElementById('tab-login').textContent         = t('loginTab');
  document.getElementById('tab-register').textContent      = t('registerTab');
  document.getElementById('login-identifier').placeholder  = t('loginIdPlaceholder');
  document.getElementById('login-password').placeholder    = t('loginPassPlaceholder');
  document.getElementById('login-submit').textContent      = t('loginSubmit');
  document.getElementById('reg-username').placeholder      = t('regUserPlaceholder');
  document.getElementById('reg-password').placeholder      = t('regPassPlaceholder');
  document.getElementById('reg-submit').textContent        = t('regSubmit');
  document.getElementById('order-success-title').textContent = t('orderSuccess');
  document.getElementById('order-success-msg').textContent   = t('orderMsg');

  // Type pills
  const pills = document.getElementById('type-pills');
  if (pills) {
    pills.querySelectorAll('.pill').forEach(p => {
      const key = p.dataset.type;
      if (key === '') { p.textContent = t('typeAll'); }
      else if (key === 'plushies')  { p.textContent = t('typePlushies'); }
      else if (key === 'keychains') { p.textContent = t('typeKeychains'); }
      else if (key === 'pins')      { p.textContent = t('typePins'); }
      else if (key === 'figurines') { p.textContent = t('typeFigurines'); }
      else if (key === 'posters')   { p.textContent = t('typePosters'); }
    });
  }

  // Nav menu labels
  document.querySelectorAll('.nav-section h3').forEach((h, i) => {
    h.textContent = i === 0 ? t('categories') : t('shop');
  });
  const allLink = document.querySelector('#nav-cat-list-extra a');
  if (allLink) allLink.textContent = t('allLink');

  // Reg success box
  const rsTitle = document.getElementById('reg-success-title');
  const rsMsg   = document.getElementById('reg-success-msg');
  const rsBtn   = document.getElementById('reg-success-btn');
  if (rsTitle) rsTitle.textContent = t('regSuccess');
  if (rsMsg)   rsMsg.textContent   = t('regSuccessMsg');
  if (rsBtn)   rsBtn.textContent   = t('regSuccessBtn');

  if (!currentUser) {
    setBasketEmpty(t('basketEmpty'));
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  THEME (changes per category)
// ━━━━━━━━━━━━━━━━━━━━━━━━━
const CAT_THEMES = {
  'hello-kitty':      { accent: '#ff8fab', accentL: '#ffd6e7', accentD: '#e05c80', gradA: '#ffd6e7', gradB: '#ffe8f0', gradC: '#fff0f5' },
  'my-melody':        { accent: '#f4a4c0', accentL: '#fce4ee', accentD: '#c9557a', gradA: '#fce4ee', gradB: '#f9d0e2', gradC: '#fde8f5' },
  'cinnamoroll':      { accent: '#5eb8d4', accentL: '#caf0f8', accentD: '#2d8fa6', gradA: '#caf0f8', gradB: '#d6f0fc', gradC: '#e8f8ff' },
  'kuromi':           { accent: '#9b59b6', accentL: '#e8d5ff', accentD: '#6c3483', gradA: '#e8d5ff', gradB: '#d7b9f5', gradC: '#f3e8ff' },
  'pompompurin':      { accent: '#f0b800', accentL: '#fff4c2', accentD: '#b8860b', gradA: '#fff4c2', gradB: '#ffe080', gradC: '#fffde0' },
  'keroppi':          { accent: '#4caf50', accentL: '#c8e6c9', accentD: '#2e7d32', gradA: '#c8e6c9', gradB: '#b2dfdb', gradC: '#e8f5e9' },
  'chococat':         { accent: '#795548', accentL: '#d7ccc8', accentD: '#4e342e', gradA: '#d7ccc8', gradB: '#efebe9', gradC: '#faf5f3' },
  'badtz-maru':       { accent: '#212121', accentL: '#e0e0e0', accentD: '#000000', gradA: '#e0e0e0', gradB: '#eeeeee', gradC: '#f5f5f5' },
  'pochacco':         { accent: '#42a5f5', accentL: '#bbdefb', accentD: '#1565c0', gradA: '#bbdefb', gradB: '#c5cae9', gradC: '#e3f2fd' },
};

const DEFAULT_THEME = { accent: '#ff8fab', accentL: '#ffd6e7', accentD: '#e05c80', gradA: '#ffd6e7', gradB: '#e8d5ff', gradC: '#caf0f8' };

function applyTheme(slug) {
  const theme = CAT_THEMES[slug] || DEFAULT_THEME;
  const root = document.documentElement;
  root.style.setProperty('--accent',    theme.accent);
  root.style.setProperty('--accent-l',  theme.accentL);
  root.style.setProperty('--accent-d',  theme.accentD);
  root.style.setProperty('--bg-grad-a', theme.gradA);
  root.style.setProperty('--bg-grad-b', theme.gradB);
  root.style.setProperty('--bg-grad-c', theme.gradC);
  document.body.classList.toggle('themed', !!slug);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  AUTH
// ━━━━━━━━━━━━━━━━━━━━━━━━━
async function checkAuth() {
  const res  = await fetch('pages/auth.php', {
    method: 'POST',
    body: new URLSearchParams({ action: 'status' })
  });
  const data = await res.json();
  if (data.logged_in) setUser(data.username);
  else clearUser();
}

function setUser(username) {
  currentUser = username;
  document.getElementById('user-info').textContent = t('hi') + ' ' + username;
  document.getElementById('auth-open-btn').style.display = 'none';
  document.getElementById('logout-btn').style.display = '';
  refreshBasket();
  refreshBasketCount();
}
function clearUser() {
  currentUser = null;
  document.getElementById('user-info').textContent = '';
  document.getElementById('auth-open-btn').style.display = '';
  document.getElementById('logout-btn').style.display = 'none';
  setBasketEmpty(t('basketEmpty'));
  document.getElementById('basket-count').textContent = '0';
}

function openAuth() {
  document.getElementById('auth-modal').classList.add('open');
  hideRegSuccess();
}
function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('open');
}
function switchTab(tab) {
  document.getElementById('form-login').style.display    = tab === 'login'    ? '' : 'none';
  document.getElementById('form-register').style.display = tab === 'register' ? '' : 'none';
  document.getElementById('tab-login').classList.toggle('active',    tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  hideRegSuccess();
}

function hideRegSuccess() {
  document.getElementById('reg-success-box').classList.remove('show');
  document.getElementById('form-register').style.display = document.getElementById('tab-register').classList.contains('active') ? '' : 'none';
}

async function doLogin() {
  const identifier = document.getElementById('login-identifier').value.trim();
  const password   = document.getElementById('login-password').value;
  const msg        = document.getElementById('login-msg');
  msg.textContent  = '';
  const res  = await fetch('pages/auth.php', {
    method: 'POST',
    body: new URLSearchParams({ action: 'login', identifier, password })
  });
  const data = await res.json();
  if (data.success) {
    setUser(data.username);
    closeAuthModal();
    showToast(t('greetToast') + data.username + '! 💕');
  } else {
    msg.textContent = data.message;
    msg.className = 'auth-msg error';
  }
}

async function doRegister() {
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value;
  const msg      = document.getElementById('reg-msg');
  msg.textContent = '';
  const res  = await fetch('pages/auth.php', {
    method: 'POST',
    body: new URLSearchParams({ action: 'register', username, password })
  });
  const data = await res.json();
  if (data.success) {
    // Show "registered, now log in" message
    document.getElementById('form-register').style.display = 'none';
    document.getElementById('reg-success-box').classList.add('show');
  } else {
    msg.textContent = data.message;
    msg.className = 'auth-msg error';
  }
}

function goToLoginAfterRegister() {
  hideRegSuccess();
  switchTab('login');
}

async function doLogout() {
  await fetch('pages/auth.php', { method: 'POST', body: new URLSearchParams({ action: 'logout' }) });
  clearUser();
  showToast(t('logoutToast'));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  CATEGORIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━
async function loadCategories() {
  const res  = await fetch('pages/products.php?action=categories');
  allCategories = await res.json();

  // Nav menu list
  const list = document.getElementById('nav-cat-list');
  allCategories.forEach(cat => {
    const li  = document.createElement('li');
    const dot = `<span class="cat-dot" style="background:${cat.color}"></span>`;
    li.innerHTML = `<a href="#" onclick="filterCat('${cat.slug}'); closeMenu(); return false;">${dot}${cat.emoji} ${cat.name}</a>`;
    list.appendChild(li);
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  PRODUCTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━
async function loadProducts(slug = '', search = '') {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';

  let url = `pages/products.php?action=list`;
  if (slug)   url += `&category=${encodeURIComponent(slug)}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;

  const res  = await fetch(url);
  allProducts = await res.json();
  renderProducts(allProducts);
}

function getFilteredProducts() {
  if (!activeType) return allProducts;
  return allProducts.filter(p => getProductType(p.name) === activeType);
}

function renderProducts(products) {
  const filtered = activeType
    ? products.filter(p => getProductType(p.name) === activeType)
    : products;

  const grid  = document.getElementById('products-grid');
  const title = document.getElementById('section-title');

  if (!filtered.length) {
    grid.innerHTML = `<p style="color:var(--mid);font-size:1.1rem;padding:32px">${t('noProducts')}</p>`;
    return;
  }

  const catName = activeCat
    ? allCategories.find(c => c.slug === activeCat)?.name ?? t('allProducts')
    : t('allProducts');
  const cat = activeCat ? allCategories.find(c => c.slug === activeCat) : null;
  title.textContent = (cat?.emoji ?? '') + ' ' + catName;

  grid.innerHTML = '';
  filtered.forEach((p, i) => {
    const variants = PRODUCT_VARIANTS[p.id];
    const card = document.createElement('div');
    card.className = 'product-card' + (p.stock < 1 ? ' out-of-stock' : '');
    card.style.animationDelay = `${i * 0.04}s`;

    let swatchHtml = '';
    if (variants && variants.length > 1) {
      swatchHtml = `<div class="card-colors">` +
        variants.map((v, vi) =>
          `<span class="color-swatch${vi===0?' selected':''}" style="background:${v.color}"
            title="${currentLang==='pl'?v.label_pl:v.label_en}"
            data-product="${p.id}" data-vi="${vi}"
            onclick="cardSwatchClick(event, this)"></span>`
        ).join('') + `</div>`;
    }

    card.innerHTML = `
      <img class="card-img" src="${variants?.[0]?.image_url ?? p.image_url}" alt="${p.name}" loading="lazy" id="card-img-${p.id}">
      <div class="card-body">
        <div class="card-type">${p.emoji ?? ''} ${p.category_name}</div>
        <div class="card-name">${p.name}</div>
        ${swatchHtml}
        <div class="card-footer">
          <span class="card-price">${formatPrice(p.price)}</span>
          <button class="add-btn" title="${t('addToCart')}" onclick="quickAdd(event, ${p.id})">+</button>
        </div>
      </div>`;
    card.addEventListener('click', e => {
      if (!e.target.classList.contains('add-btn') && !e.target.classList.contains('color-swatch'))
        openProduct(p);
    });
    grid.appendChild(card);
  });
}

function cardSwatchClick(e, el) {
  e.stopPropagation();
  const productId = parseInt(el.dataset.product);
  const vi = parseInt(el.dataset.vi);
  const variants = PRODUCT_VARIANTS[productId];
  if (!variants) return;
  // Update image
  const img = document.getElementById('card-img-' + productId);
  if (img) img.src = variants[vi].image_url;
  // Update selected state
  el.closest('.card-colors').querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

function filterCat(slug) {
  activeCat = slug;
  activeType = '';
  document.querySelectorAll('#type-pills .pill').forEach(p => p.classList.toggle('active', p.dataset.type === ''));
  document.getElementById('search-input').value = '';
  applyTheme(slug);
  loadProducts(slug);
}
function showAll() { filterCat(''); }

function filterType(type) {
  activeType = type;
  document.querySelectorAll('#type-pills .pill').forEach(p => p.classList.toggle('active', p.dataset.type === type));
  renderProducts(allProducts);
}

function handleSearch() {
  const q = document.getElementById('search-input').value;
  loadProducts(activeCat, q);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  PRODUCT DETAIL MODAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━
function openProduct(p) {
  currentProduct = p;
  currentVariant = (PRODUCT_VARIANTS[p.id]?.[0]) ?? null;
  modalQty = 1;

  const variants = PRODUCT_VARIANTS[p.id];
  const imgSrc = currentVariant?.image_url ?? p.image_url;
  const desc   = currentVariant
    ? (currentLang === 'pl' ? currentVariant.description_pl : currentVariant.description_en)
    : p.description;

  document.getElementById('modal-img').src         = imgSrc;
  document.getElementById('modal-cat').textContent = `${p.emoji ?? ''} ${p.category_name}`;
  document.getElementById('modal-cat').style.color = p.color;
  document.getElementById('modal-name').textContent= p.name;
  document.getElementById('modal-desc').textContent= desc;
  document.getElementById('modal-price').textContent= formatPrice(p.price);
  document.getElementById('modal-stock').textContent=
    p.stock > 0 ? `${t('inStock')} ${p.stock} ${t('pcs')}` : t('outOfStock');
  document.getElementById('modal-qty').textContent = 1;
  document.getElementById('modal-add-btn').textContent = t('addToCart');
  document.getElementById('modal-add-btn').disabled = p.stock < 1;

  // Color swatches in modal
  const colorsWrap = document.getElementById('modal-colors');
  if (variants && variants.length > 1) {
    colorsWrap.innerHTML =
      `<span class="modal-colors-label">${t('colorLabel')}</span>` +
      variants.map((v, vi) =>
        `<span class="modal-swatch${vi===0?' selected':''}" style="background:${v.color}"
          title="${currentLang==='pl'?v.label_pl:v.label_en}"
          onclick="selectModalVariant(${p.id}, ${vi}, this)"></span>`
      ).join('');
    colorsWrap.style.display = 'flex';
  } else {
    colorsWrap.style.display = 'none';
  }

  document.getElementById('product-modal').classList.add('open');
}

function selectModalVariant(productId, vi, el) {
  const variants = PRODUCT_VARIANTS[productId];
  if (!variants) return;
  currentVariant = variants[vi];
  // Update image with fade
  const img = document.getElementById('modal-img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = currentVariant.image_url;
    img.style.opacity = '1';
  }, 200);
  // Update description
  const desc = currentLang === 'pl' ? currentVariant.description_pl : currentVariant.description_en;
  document.getElementById('modal-desc').textContent = desc;
  // Update selected swatch
  document.getElementById('modal-colors').querySelectorAll('.modal-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('open');
}
function changeQty(delta) {
  if (!currentProduct) return;
  modalQty = Math.max(1, Math.min(currentProduct.stock, modalQty + delta));
  document.getElementById('modal-qty').textContent = modalQty;
}
async function addToBasketFromModal() {
  if (!currentProduct) return;
  await addToBasket(currentProduct.id, modalQty);
  closeProductModal();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  BASKET
// ━━━━━━━━━━━━━━━━━━━━━━━━━
async function quickAdd(e, productId) {
  e.stopPropagation();
  await addToBasket(productId, 1);
}
async function addToBasket(productId, qty = 1) {
  if (!currentUser) { openAuth(); return; }
  const res  = await fetch('pages/basket.php', {
    method: 'POST',
    body: new URLSearchParams({ action: 'add', product_id: productId, quantity: qty })
  });
  const data = await res.json();
  if (data.auth_required) { openAuth(); return; }
  if (data.success) {
    showToast(data.message ?? t('addedToCart'));
    refreshBasketCount();
    if (basketOpen) refreshBasket();
  } else {
    showToast(data.message ?? 'Error 😢');
  }
}

async function refreshBasketCount() {
  if (!currentUser) return;
  const res  = await fetch('pages/basket.php?action=count');
  const data = await res.json();
  const el   = document.getElementById('basket-count');
  el.textContent = data.count;
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 300);
}

async function refreshBasket() {
  if (!currentUser) return;
  const res  = await fetch('pages/basket.php?action=get');
  const data = await res.json();
  const container = document.getElementById('basket-items');
  if (!data.success || !data.items.length) {
    setBasketEmpty(t('basketLogin'));
    document.getElementById('basket-total-val').textContent = formatPrice(0);
    return;
  }
  container.innerHTML = '';
  let total = 0;
  data.items.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'basket-item';
    div.innerHTML = `
      <img class="basket-item-img" src="${item.image_url}" alt="${item.name}">
      <div class="basket-item-info">
        <div class="basket-item-name">${item.name}</div>
        <div class="basket-item-price">${formatPrice(item.price * item.quantity)}</div>
        <div class="basket-item-qty">
          <button class="bqty-btn" onclick="updateBasket(${item.product_id}, ${item.quantity - 1})">−</button>
          <span>${item.quantity}</span>
          <button class="bqty-btn" onclick="updateBasket(${item.product_id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button class="basket-item-remove" onclick="removeFromBasket(${item.product_id})" title="Remove">✕</button>`;
    container.appendChild(div);
  });
  document.getElementById('basket-total-val').textContent = formatPrice(total);
}

function setBasketEmpty(msg) {
  document.getElementById('basket-items').innerHTML = `
    <div class="basket-empty">
      <span class="big-emoji">🛍️</span>${msg}
    </div>`;
}

async function updateBasket(productId, qty) {
  await fetch('pages/basket.php', {
    method: 'POST',
    body: new URLSearchParams({ action: 'update', product_id: productId, quantity: qty })
  });
  refreshBasket();
  refreshBasketCount();
}
async function removeFromBasket(productId) {
  await fetch('pages/basket.php', {
    method: 'POST',
    body: new URLSearchParams({ action: 'remove', product_id: productId })
  });
  refreshBasket();
  refreshBasketCount();
}
function toggleBasket() {
  basketOpen = !basketOpen;
  document.getElementById('basket-panel').classList.toggle('open', basketOpen);
  if (basketOpen && currentUser) refreshBasket();
}

async function doCheckout() {
  if (!currentUser) { openAuth(); return; }
  const res  = await fetch('pages/basket.php', {
    method: 'POST',
    body: new URLSearchParams({ action: 'checkout' })
  });
  const data = await res.json();
  if (data.success) {
    toggleBasket();
    document.getElementById('order-id-text').textContent = `${t('orderLabel')} #${data.order_id}`;
    document.getElementById('order-success-modal').classList.add('open');
    refreshBasketCount();
    loadProducts(activeCat);
  } else {
    showToast(data.message ?? 'Order error 😢');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  NAV MENU
// ━━━━━━━━━━━━━━━━━━━━━━━━━
document.getElementById('menu-btn').addEventListener('click', () => {
  menuOpen = !menuOpen;
  document.getElementById('nav-menu').classList.toggle('open', menuOpen);
});
function closeMenu() {
  menuOpen = false;
  document.getElementById('nav-menu').classList.remove('open');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━
//  HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━
function formatPrice(val) {
  return parseFloat(val).toFixed(2).replace('.', ',') + ' zł';
}
function closeModal(e) {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove('open');
    if (e.currentTarget.id === 'product-modal') currentProduct = null;
  }
}

let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// Close menu on outside click
document.addEventListener('click', e => {
  if (menuOpen && !e.target.closest('#nav-menu') && !e.target.closest('#menu-btn'))
    closeMenu();
});
