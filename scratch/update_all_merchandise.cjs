const fs = require('fs');

const merchandise = [
  // 1. Invincible (Comics) - USER UPLOADED
  {
    id: "merch-invincible-omni-man-figure",
    name: "Invincible: Omni-Man 1/6 Scale Articulated Collector Figure",
    category: "comics",
    franchise: "Invincible",
    price: 179.99,
    originalPrice: 210.00,
    priceRange: "$180 - $210",
    image: "/images/merch/omni-man-figure.jpg",
    description: "Officially licensed 12-inch museum-grade articulated action figure of Nolan Grayson / Omni-Man, featuring tailored fabric suit, flowing red cape, signature Viltrumite mustache, and interchangeable hands.",
    badge: "Official",
    inStock: true,
    rating: 5.0,
    itemType: "Figures"
  },
  // 2. Stranger Things (TV Shows) - USER UPLOADED
  {
    id: "merch-stranger-things-monopoly",
    name: "Stranger Things: Upside Down Collector Edition Monopoly Board Game",
    category: "tv-shows",
    franchise: "Stranger Things",
    price: 39.99,
    originalPrice: 48.00,
    priceRange: "$40 - $48",
    image: "/images/merch/stranger-things-monopoly.jpg",
    description: "Official Netflix collector edition board game featuring Hawkins and Upside Down double-sided gameplay, custom zinc metal tokens (Walkie-Talkie, Demogorgon, Eggo Waffle, Bicycle), and 80s retro packaging.",
    badge: "Best Seller",
    inStock: true,
    rating: 4.9,
    itemType: "Collectibles"
  },
  // 3. I Love K-Pop (K-Pop) - USER UPLOADED
  {
    id: "merch-kpop-hoodie",
    name: "\"I Love K-Pop\" (애정) Heavyweight Graphic Streetwear Hoodie",
    category: "k-pop",
    franchise: "K-Pop Universe",
    price: 52.00,
    originalPrice: 65.00,
    priceRange: "$52 - $65",
    image: "/images/merch/i-love-kpop-hoodie.jpg",
    description: "Ultra-cozy 420gsm premium black cotton fleece hoodie featuring bold 'I ❤️ 애정 K-POP' red heart graphic print with Hangul calligraphy and ribbed cuffs.",
    badge: "Fan Favorite",
    inStock: true,
    rating: 4.8,
    itemType: "Apparel"
  },
  // 4. Jujutsu Kaisen (Anime) - USER UPLOADED
  {
    id: "merch-jjk-ramen-bowl",
    name: "Jujutsu Kaisen: Cursed Clash Ceramic Ramen Bowl with Chopsticks Set",
    category: "anime",
    franchise: "Jujutsu Kaisen",
    price: 29.99,
    originalPrice: 38.00,
    priceRange: "$30 - $38",
    image: "/images/merch/jjk-ramen-bowl.jpg",
    description: "Authentic Japanese ceramic ramen bowl featuring Yuji Itadori, Aoi Todo, Megumi, and Gojo battle artwork, complete with integrated chopstick notch and wooden chopsticks.",
    badge: "Best Seller",
    inStock: true,
    rating: 5.0,
    itemType: "Drinkware"
  },
  // 5. My Hero Academia Hoodie - USER UPLOADED
  {
    id: "merch-mha-all-might-hoodie",
    name: "My Hero Academia: All Might 'Symbol of Peace' Japanese Graphic Hoodie",
    category: "anime",
    franchise: "My Hero Academia",
    price: 64.99,
    originalPrice: 79.99,
    priceRange: "$65 - $80",
    image: "/images/merch/mha-all-might-hoodie.png",
    description: "Premium charcoal fleece hoodie featuring high-impact vintage graphic print of All Might's iconic smiling face with Japanese calligraphy lettering.",
    badge: "Fan Favorite",
    inStock: true,
    rating: 5.0,
    itemType: "Apparel"
  },
  // 6. My Hero Academia Class 1-A Tee - USER UPLOADED
  {
    id: "merch-mha-class-1a-tee",
    name: "My Hero Academia: Class 1-A Heroes Frontline Graphic T-Shirt",
    category: "anime",
    franchise: "My Hero Academia",
    price: 34.00,
    originalPrice: 42.00,
    priceRange: "$34 - $42",
    image: "/images/merch/mha-class-1a-tee.png",
    description: "Heavyweight black cotton graphic tee showcasing Deku, Bakugo, Todoroki, and the UA High Class 1-A heroes ready for battle.",
    badge: "Best Seller",
    inStock: true,
    rating: 4.9,
    itemType: "Apparel"
  },
  // 7. My Hero Academia Duck Figure - USER UPLOADED
  {
    id: "merch-mha-duck-figure",
    name: "My Hero Academia: TUBBZ All Might Cosplaying Duck Official Boxed Figure",
    category: "anime",
    franchise: "My Hero Academia",
    price: 24.99,
    originalPrice: 29.99,
    priceRange: "$25 - $30",
    image: "/images/merch/mha-all-might-duck-figure.png",
    description: "Official TUBBZ first edition boxed vinyl collectible featuring All Might transformed into a cosplaying duck with signature hair tufts and costume.",
    badge: "Official",
    inStock: true,
    rating: 4.9,
    itemType: "Figures"
  },
  // 8. My Hero Academia Pop Keychains - USER UPLOADED
  {
    id: "merch-mha-pop-keychains",
    name: "My Hero Academia: Funko Pocket Pop! Deku & Heroes Collector Keychains",
    category: "anime",
    franchise: "My Hero Academia",
    price: 18.50,
    originalPrice: 22.00,
    priceRange: "$18 - $22",
    image: "/images/merch/mha-pocket-pop-keychains.png",
    description: "Authentic Funko Pocket Pop vinyl figure keychains featuring Izuku Midoriya in hero suit, Hawks, and Hatsume with sturdy metal clasps.",
    badge: "Official",
    inStock: true,
    rating: 4.8,
    itemType: "Accessories"
  },
  // 9. My Hero Academia Tumbler - USER UPLOADED
  {
    id: "merch-mha-deku-tumbler",
    name: "My Hero Academia: Deku One For All Full Cowl Carnival Travel Tumbler with Straw",
    category: "anime",
    franchise: "My Hero Academia",
    price: 26.00,
    originalPrice: 32.00,
    priceRange: "$26 - $32",
    image: "/images/merch/mha-deku-tumbler.png",
    description: "24oz insulated clear travel carnival tumbler with green lid and yellow straw, featuring Deku in full action pose and Hero Course typography.",
    badge: "Official",
    inStock: true,
    rating: 4.9,
    itemType: "Drinkware"
  },
  // 10. Grand Theft Auto VI Hoodie
  {
    id: "merch-gta-vi-hoodie",
    name: "Grand Theft Auto VI: Vice City Palms Heavyweight Streetwear Hoodie",
    category: "gaming",
    franchise: "Grand Theft Auto VI",
    price: 68.00,
    originalPrice: 85.00,
    priceRange: "$68 - $85",
    image: "/images/merch/gta-vi-hoodie.jpg",
    description: "Heavyweight 450gsm fleece hoodie featuring the official Vice City neon pink and turquoise sunset palm logo with GTA VI typography.",
    badge: "Pre-Order",
    inStock: true,
    rating: 5.0,
    itemType: "Apparel"
  },
  // 11. Grand Theft Auto VI Travel Mug
  {
    id: "merch-gta-vi-travel-mug",
    name: "Grand Theft Auto VI: Vice City Neon Stainless Steel Travel Mug",
    category: "gaming",
    franchise: "Grand Theft Auto VI",
    price: 28.00,
    originalPrice: 35.00,
    priceRange: "$28 - $35",
    image: "/images/merch/gta-vi-travel-mug.jpg",
    description: "Double-walled insulated matte black stainless tumbler featuring glowing neon Vice City skyline and GTA VI sunset palm graphics.",
    badge: "Pre-Order",
    inStock: true,
    rating: 4.9,
    itemType: "Drinkware"
  },
  // 12. The Blacklist Hoodie
  {
    id: "merch-blacklist-hoodie",
    name: "The Blacklist: Raymond Reddington Silhouette Graphic Hoodie",
    category: "tv-shows",
    franchise: "The Blacklist",
    price: 64.00,
    originalPrice: 78.00,
    priceRange: "$64 - $78",
    image: "/images/merch/blacklist-hoodie.jpg",
    description: "Midnight black fleece hoodie with high-definition screen print of Raymond Reddington's fedora and sunglasses silhouette and crimson logo.",
    badge: "Official",
    inStock: true,
    rating: 4.9,
    itemType: "Apparel"
  },
  // 13. The Blacklist Mug
  {
    id: "merch-blacklist-mug",
    name: "The Blacklist: Raymond Reddington 'Concierge of Crime' Matte Ceramic Mug",
    category: "tv-shows",
    franchise: "The Blacklist",
    price: 21.99,
    originalPrice: 26.00,
    priceRange: "$22 - $26",
    image: "/images/merch/blacklist-mug.jpg",
    description: "15oz matte black ceramic mug featuring James Spader's fedora portrait, 'Concierge of Crime' typography, and red Blacklist logo.",
    badge: "Official",
    inStock: true,
    rating: 4.9,
    itemType: "Drinkware"
  },
  // 14. The Mentalist Mug
  {
    id: "merch-mentalist-mug",
    name: "The Mentalist: Red John Smiley & Patrick Jane CBI Ceramic Tea Mug",
    category: "tv-shows",
    franchise: "The Mentalist",
    price: 22.50,
    originalPrice: 28.00,
    priceRange: "$22 - $28",
    image: "/images/merch/mentalist-mug.jpg",
    description: "Authentic ceramic tea mug featuring Red John's blood-red smiley face insignia, the California Bureau of Investigation gold badge, and show logo.",
    badge: "Fan Favorite",
    inStock: true,
    rating: 5.0,
    itemType: "Drinkware"
  },
  // 15. Solo Leveling Hoodie
  {
    id: "merch-solo-leveling-hoodie",
    name: "Solo Leveling: Shadow Monarch 'Arise' Glowing Eye Heavyweight Hoodie",
    category: "anime",
    franchise: "Solo Leveling",
    price: 66.00,
    originalPrice: 82.00,
    priceRange: "$66 - $82",
    image: "/images/merch/solo-leveling-hoodie.jpg",
    description: "Streetwear hoodie featuring Sung Jinwoo surrounded by shadow extraction mana with glowing blue eyes, Korean typography, and 'ARISE'.",
    badge: "Best Seller",
    inStock: true,
    rating: 5.0,
    itemType: "Apparel"
  },
  // 16. One Piece Hoodie
  {
    id: "merch-one-piece-hoodie",
    name: "One Piece: Straw Hat Jolly Roger Japanese Typography Hoodie",
    category: "manga",
    franchise: "One Piece",
    price: 65.00,
    originalPrice: 80.00,
    priceRange: "$65 - $80",
    image: "/images/merch/one-piece-hoodie.jpg",
    description: "Premium fleece pullover with detailed Straw Hat Pirates Jolly Roger embroidery and 'I will become the King of the Pirates!' Japanese kanji.",
    badge: "Best Seller",
    inStock: true,
    rating: 4.9,
    itemType: "Apparel"
  },
  // 17. The Batman Tee
  {
    id: "merch-batman-tee",
    name: "The Batman: 'I Am Vengeance' Armored Vigilante Washed Graphic Tee",
    category: "movies",
    franchise: "The Batman",
    price: 38.00,
    originalPrice: 46.00,
    priceRange: "$38 - $46",
    image: "/images/merch/batman-tee.jpg",
    description: "Vintage mineral-washed black cotton tee featuring Robert Pattinson's Batman silhouette with distressed crimson Bat insignia and 'I AM VENGEANCE'.",
    badge: "Official",
    inStock: true,
    rating: 4.9,
    itemType: "Apparel"
  },
  // 18. The Batman Figure
  {
    id: "merch-batman-figure",
    name: "The Batman: 1/6 Scale Armored Vigilante Collector Figure",
    category: "movies",
    franchise: "The Batman",
    price: 249.99,
    originalPrice: 290.00,
    priceRange: "$250 - $290",
    image: "/images/merch/batman-figure.jpg",
    description: "Museum-quality 12-inch articulated action figure featuring screen-accurate fabric undersuit, magnetic chest batarang, and grapple gun accessories.",
    badge: "Limited Edition",
    inStock: true,
    rating: 5.0,
    itemType: "Figures"
  },
  // 19. Dune Part Two Tee
  {
    id: "merch-dune-tee",
    name: "Dune: Part Two: Arrakis Shai-Hulud Sandworm Desert Graphic Tee",
    category: "movies",
    franchise: "Dune: Part Two",
    price: 36.00,
    originalPrice: 44.00,
    priceRange: "$36 - $44",
    image: "/images/merch/dune-tee.jpg",
    description: "Vintage desert-washed tee showcasing Paul Atreides standing before the colossal Arrakis Sandworm with crysknife raised and gold DUNE logo.",
    badge: "Official",
    inStock: true,
    rating: 4.9,
    itemType: "Apparel"
  },
  // 20. Bloodborne Tee
  {
    id: "merch-bloodborne-tee",
    name: "Bloodborne: Hunter of Yharnam & Hunter's Mark Acid Wash Graphic Tee",
    category: "gaming",
    franchise: "Bloodborne",
    price: 39.50,
    originalPrice: 48.00,
    priceRange: "$39 - $48",
    image: "/images/merch/bloodborne-tee.jpg",
    description: "Gothic charcoal acid-washed cotton t-shirt with detailed screen print of the Hunter of Yharnam holding the Saw Cleaver and blood-red Hunter's Mark.",
    badge: "Limited Edition",
    inStock: true,
    rating: 5.0,
    itemType: "Apparel"
  },
  // 21. Elden Ring Statue
  {
    id: "merch-elden-ring-statue",
    name: "Elden Ring: Malenia Blade of Miquella 1/6 Scale Collector Statue",
    category: "gaming",
    franchise: "Elden Ring",
    price: 199.99,
    originalPrice: 240.00,
    priceRange: "$200 - $240",
    image: "/images/merch/elden-ring-figure.jpg",
    description: "Exquisite 1/6 scale articulated collector statue featuring gold winged helmet, prosthetic sword arm, scarlet rot base, and collector box.",
    badge: "Limited Edition",
    inStock: true,
    rating: 5.0,
    itemType: "Figures"
  }
];

fs.writeFileSync('src/data/merchandise.json', JSON.stringify(merchandise, null, 2), 'utf8');
console.log('Successfully wrote', merchandise.length, 'merchandise items to src/data/merchandise.json');
