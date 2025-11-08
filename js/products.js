window.products = [
  // Living Room
  {
    id: 1,
    name: 'Loveseat Sofa',
    price: 199.0,
    oldPrice: 400.0,
    category: 'Living Room',
    labels: ['new', 'sale'],
    image: 'images/products/01-loveseat-sofa/01.webp',
    rating: 4.5,
    description: 'A compact loveseat sofa designed for small living spaces. Its soft cushions provide a cozy spot for reading, relaxing, or watching TV, while the modern design enhances any contemporary living room.'
  },
  {
    id: 2,
    name: 'Luxury Sofa',
    price: 299.0,
    oldPrice: 500.0,
    category: 'Living Room',
    labels: ['new', 'sale'],
    image: 'images/products/02-luxury-sofa/01.webp',
    rating: 5,
    description: 'This luxury sofa combines elegance with comfort, featuring high-quality upholstery and plush cushions. Perfect for hosting guests or unwinding after a long day, it brings sophistication to any living room interior.'
  },
  {
    id: 3,
    name: 'Cozy Sofa',
    price: 299.0,
    oldPrice: null,
    category: 'Living Room',
    labels: null,
    image: 'images/products/03-cozy-sofa/01.webp',
    rating: 4,
    description: 'Designed for ultimate relaxation, this cozy sofa offers ample seating with a soft and inviting texture. Its neutral tone fits seamlessly with any décor style, making it a versatile centerpiece for your living space.'
  },
  {
    id: 4,
    name: 'Black Brow Side Table',
    price: 16.99,
    oldPrice: null,
    category: 'Living Room',
    labels: null,
    image: 'images/products/04-black-brow-side-table/01.webp',
    rating: 3.5,
    description: 'A compact side table with a black-brown finish, ideal for placing beside a sofa or armchair. Perfect for holding drinks, books, or decorative items, it combines functionality with sleek design.'
  },
  {
    id: 5,
    name: 'Gray Armchair',
    price: 189.99,
    oldPrice: null,
    category: 'Living Room',
    labels: null,
    image: 'images/products/05-gray-armchair/01.webp',
    rating: 4.5,
    description: 'This modern gray armchair provides a comfortable and stylish seating option. Its soft fabric, ergonomic design, and neutral color make it suitable for any living room or reading nook.'
  },

  // Bedroom
  {
    id: 6,
    name: 'White Drawer Unit',
    price: 89.99,
    oldPrice: null,
    category: 'Bedroom',
    labels: ['new'],
    image: 'images/products/06-white-drawer-unit/01.webp',
    rating: 4,
    description: 'A versatile white drawer unit that adds both storage and style to your bedroom. Its clean lines and spacious drawers make it perfect for organizing clothes, linens, or personal items.'
  },
  {
    id: 7,
    name: 'Light Beige Pillow',
    price: 3.99,
    oldPrice: null,
    category: 'Bedroom',
    labels: null,
    image: 'images/products/07-light-beige-pillow/01.webp',
    rating: 4.5,
    description: 'Soft and cozy light beige pillow crafted for restful sleep or daytime lounging. Its neutral color complements any bedding, adding comfort and elegance to your bedroom décor.'
  },
  {
    id: 8,
    name: 'Off-white Pillow',
    price: 7.99,
    oldPrice: null,
    category: 'Bedroom',
    labels: ['new'],
    image: 'images/products/08-off-white-pillow/01.webp',
    rating: 3.5,
    description: 'An off-white pillow with a plush filling, perfect for enhancing comfort on beds or sofas. Its soft texture and subtle color create a calm and inviting atmosphere in any room.'
  },
  {
    id: 9,
    name: 'Bedside Lamp',
    price: 39.99,
    oldPrice: null,
    category: 'Bedroom',
    labels: null,
    image: 'images/products/09-bedside-lamp/01.webp',
    rating: 4,
    description: 'A classic bedside lamp designed to provide warm and soothing illumination. Ideal for nighttime reading or creating ambient lighting, its sleek design fits seamlessly with modern bedroom décor.'
  },

  // Dinning
  {
    id: 10,
    name: 'Black Tray Table',
    price: 19.99,
    oldPrice: 39.99,
    category: 'Dinning',
    labels: ['sale'],
    image: 'images/products/10-black-tray-table/01.webp',
    rating: 4.5,
    description: 'A versatile black tray table suitable for serving drinks, snacks, or displaying décor. Lightweight yet sturdy, it can be moved easily around the home and adds a touch of modern style.'
  },
  {
    id: 11,
    name: 'Bamboo Basket',
    price: 9.99,
    oldPrice: null,
    category: 'Dinning',
    labels: ['new'],
    image: 'images/products/11-bamboo-basket/01.webp',
    rating: 4,
    description: 'Eco-friendly bamboo basket perfect for storing fruits, bread, or dining accessories. Its natural texture adds warmth and a touch of rustic charm to any kitchen or dining area.'
  },
  {
    id: 12,
    name: 'Wooden Dining Chair',
    price: 59.99,
    oldPrice: 89.99,
    category: 'Dinning',
    labels: ['new', 'sale'],
    image: 'images/products/12-wooden-dining-chair/01.webp',
    rating: 5,
    description: 'Elegant wooden dining chair with a comfortable seat and durable construction. Ideal for long dinners or casual gatherings, it combines classic design with modern comfort.'
  },
  {
    id: 13,
    name: 'Marble Table',
    price: 249.99,
    oldPrice: null,
    category: 'Dinning',
    labels: null,
    image: 'images/products/13-marble-table/01.webp',
    rating: 4.5,
    description: 'A luxurious marble dining table that instantly elevates your dining area. Its smooth surface and sturdy base make it perfect for family meals, gatherings, or entertaining guests.'
  },

  // Kitchen
  {
    id: 14,
    name: 'Toaster',
    price: 224.99,
    oldPrice: null,
    category: 'Kitchen',
    labels: ['new'],
    image: 'images/products/14-toaster/01.webp',
    rating: 5,
    description: 'High-performance toaster designed for even browning and quick toasting. Sleek and modern, it is a practical addition to any kitchen countertop.'
  },
  {
    id: 15,
    name: 'Kettle',
    price: 59.99,
    oldPrice: 79.99,
    category: 'Kitchen',
    labels: ['sale'],
    image: 'images/products/15-kettle/01.webp',
    rating: 4,
    description: 'Electric kettle with fast-boil technology and elegant design. Ideal for tea, coffee, or instant meals, adding both functionality and style to your kitchen.'
  },
  {
    id: 16,
    name: 'Cutlery Set',
    price: 39.99,
    oldPrice: null,
    category: 'Kitchen',
    labels: null,
    image: 'images/products/16-cutlery-set/01.webp',
    rating: 4.5,
    description: 'Premium cutlery set crafted for daily use or special occasions. Sleek, durable, and easy to handle, it enhances any dining experience.'
  },
  {
    id: 17,
    name: 'Glass Storage Jars',
    price: 19.99,
    oldPrice: null,
    category: 'Kitchen',
    labels: ['new'],
    image: 'images/products/17-storage-jars/01.webp',
    rating: 3.5,
    description: 'Set of glass storage jars perfect for keeping ingredients fresh. Transparent design allows easy identification, adding convenience and style to your kitchen.'
  },

  // Bathroom
  {
    id: 18,
    name: 'Towel Set',
    price: 24.99,
    oldPrice: 39.99,
    category: 'Bathroom',
    labels: ['new', 'sale'],
    image: 'images/products/18-towel-set/01.webp',
    rating: 4.5,
    description: 'Soft and absorbent towel set in neutral colors. Perfect for daily use or guest bathrooms, providing comfort and a touch of elegance.'
  },
  {
    id: 19,
    name: 'Soap Dispenser',
    price: 9.99,
    oldPrice: null,
    category: 'Bathroom',
    labels: null,
    image: 'images/products/19-soap-dispenser/01.webp',
    rating: 4,
    description: 'Sleek soap dispenser for liquid soap or lotion. Adds functionality and a modern aesthetic to your bathroom counter.'
  },
  {
    id: 20,
    name: 'Mirror Cabinet',
    price: 119.99,
    oldPrice: null,
    category: 'Bathroom',
    labels: null,
    image: 'images/products/20-mirror-cabinet/01.webp',
    rating: 5,
    description: 'Functional mirror cabinet with storage space for toiletries. Combines practicality with clean design for a polished bathroom look.'
  },

  // Outdoor
  {
    id: 21,
    name: 'Outdoor Lounge Chair',
    price: 159.99,
    oldPrice: 199.99,
    category: 'Outdoor',
    labels: ['new', 'sale'],
    image: 'images/products/21-outdoor-lounge-chair/01.webp',
    rating: 4.5,
    description: 'Comfortable outdoor lounge chair made from durable materials. Perfect for relaxing in the garden, patio, or balcony, combining style and functionality.'
  },
  {
    id: 22,
    name: 'Garden Table Set',
    price: 289.99,
    oldPrice: null,
    category: 'Outdoor',
    labels: null,
    image: 'images/products/22-garden-table-set/01.webp',
    rating: 5,
    description: 'Complete garden table set including chairs, ideal for outdoor meals or gatherings. Built for durability with weather-resistant materials.'
  },
  {
    id: 23,
    name: 'Outdoor Lamp',
    price: 49.99,
    oldPrice: 69.99,
    category: 'Outdoor',
    labels: ['sale'],
    image: 'images/products/23-outdoor-lamp/01.webp',
    rating: 3.5,
    description: 'Stylish outdoor lamp designed to illuminate patios, walkways, or gardens. Weather-resistant and decorative, perfect for evening ambiance.'
  }
];
