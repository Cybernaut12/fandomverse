const fs = require('fs');

const merch = JSON.parse(fs.readFileSync('src/data/merchandise.json', 'utf8'));

const newItems = [
  {
    id: "merch-flash-snapback-cap",
    name: "The Flash: Scarlet Speedster Embroidered Snapback Cap with Comic Brim Art",
    category: "comics",
    franchise: "The Flash",
    price: 29.99,
    originalPrice: 35.00,
    priceRange: "$30 - $35",
    image: "/images/merch/flash-snapback-cap.jpg",
    description: "Official DC Comics red snapback cap featuring 3D embroidered yellow Flash lightning bolt crest, metallic under-brim Flash comic strip artwork, and adjustable snap closure.",
    badge: "Official",
    inStock: true,
    rating: 4.9,
    itemType: "Accessories"
  },
  {
    id: "merch-batman-funko-pop",
    name: "DC Comics: Batman Classic Blue Suit #598 Funko Pop! Heroes Boxed Vinyl",
    category: "comics",
    franchise: "Batman",
    price: 16.99,
    originalPrice: 20.00,
    priceRange: "$17 - $20",
    image: "/images/merch/batman-funko-pop.jpg",
    description: "Official collector edition DC Comics Batman #598 Pop! Heroes vinyl figure dressed in the iconic Silver Age blue cowl, yellow utility belt, and flowing scalloped cape.",
    badge: "Best Seller",
    inStock: true,
    rating: 5.0,
    itemType: "Figures"
  },
  {
    id: "merch-minecraft-creeper-backpack",
    name: "Minecraft: Creeper Pattern Crossbody Sling Backpack",
    category: "gaming",
    franchise: "Minecraft",
    price: 34.50,
    originalPrice: 42.00,
    priceRange: "$35 - $42",
    image: "/images/merch/minecraft-creeper-backpack.jpg",
    description: "Official Mojang Studios compact crossbody mini-pack featuring signature pixelated Creeper face front pouch, durable dual-zipper compartments, and adjustable padded shoulder strap.",
    badge: "Official",
    inStock: true,
    rating: 4.8,
    itemType: "Accessories"
  }
];

// Add if not already present
newItems.forEach(item => {
  const existingIdx = merch.findIndex(m => m.id === item.id);
  if (existingIdx >= 0) {
    merch[existingIdx] = item;
  } else {
    merch.push(item);
  }
});

fs.writeFileSync('src/data/merchandise.json', JSON.stringify(merch, null, 2), 'utf8');
console.log('Merchandise updated. Total count:', merch.length);
