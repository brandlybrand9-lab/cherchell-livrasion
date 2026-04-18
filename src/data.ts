export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  image: string;
  menu: MenuItem[];
};

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "O'Tacos Cherchell",
    description: "Les authentiques French Tacos avec sauce fromagère maison.",
    rating: 4.5,
    deliveryTime: "20-35 min",
    image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=1000&auto=format&fit=crop",
    menu: [
      {
        id: "m1",
        name: "Tacos Taille M",
        description: "1 Viande au choix, frites, sauce fromagère.",
        price: 600,
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m2",
        name: "Tacos Taille L",
        description: "2 Viandes au choix, frites, sauce fromagère.",
        price: 800,
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m3",
        name: "Frites au Cheddar",
        description: "Portion de frites croustillantes nappées de sauce cheddar.",
        price: 300,
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=500&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "r2",
    name: "Pizza Square Tipaza",
    description: "Pizzas cuites au feu de bois, ingrédients frais et locaux.",
    rating: 4.8,
    deliveryTime: "30-45 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
    menu: [
      {
        id: "m4",
        name: "Pizza Margherita",
        description: "Sauce tomate, mozzarella, basilic frais.",
        price: 500,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m5",
        name: "Pizza Poulet Champignon",
        description: "Crème fraîche, mozzarella, poulet mariné, champignons.",
        price: 750,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m6",
        name: "Tiramisu Maison",
        description: "Dessert italien classique au café et mascarpone.",
        price: 350,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "r3",
    name: "Burger House Algiers",
    description: "Smash burgers authentiques et frites maison.",
    rating: 4.6,
    deliveryTime: "25-40 min",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
    menu: [
      {
        id: "m7",
        name: "Classic Smash",
        description: "Steak haché de boeuf, cheddar, salade, tomate, sauce secrète.",
        price: 650,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m8",
        name: "Double Cheese Bacon",
        description: "Double steak, double cheddar, bacon de boeuf croustillant.",
        price: 900,
        image: "https://images.unsplash.com/photo-1594212691516-069e871786e2?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m9",
        name: "Onion Rings",
        description: "Rondelles d'oignons frites et croustillantes.",
        price: 250,
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=500&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "r4",
    name: "Shawarma Express",
    description: "Le meilleur chawarma syrien de la région.",
    rating: 4.7,
    deliveryTime: "15-30 min",
    image: "https://images.unsplash.com/photo-1645696301019-35adcc18fc21?q=80&w=1000&auto=format&fit=crop",
    menu: [
      {
        id: "m10",
        name: "Sandwich Chawarma Poulet",
        description: "Poulet mariné, crème d'ail, frites, cornichons.",
        price: 400,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m11",
        name: "Assiette Chawarma Mixte",
        description: "Viande et poulet, houmous, salade, frites, pain syrien.",
        price: 950,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m12",
        name: "Houmous",
        description: "Purée de pois chiches au tahini et huile d'olive.",
        price: 250,
        image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?q=80&w=500&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "r5",
    name: "VEGAS",
    description: "Good Food & Cool Drinks. Burgers, Pizzas, Sandwiches.",
    rating: 4.8,
    deliveryTime: "20-40 min",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
    menu: [
      {
        id: "m13",
        name: "Burger Vegas",
        description: "Poulet pané, Steak Haché, Ognion Caramélisé, Gouda, Salade, Tomate, Sauce",
        price: 600,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m14",
        name: "Burger Americain",
        description: "Double Steak Haché, Salade, Tomate, Gouda, Sauce",
        price: 350,
        image: "https://images.unsplash.com/photo-1594212691516-069e871786e2?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m15",
        name: "Burger Classic",
        description: "Steak Haché, Salade, Tomate, Sauce",
        price: 200,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m16",
        name: "Pizza Vegas (Moyenne)",
        description: "Viande, Poulet, Poulet fumé, champignons, camembert, maïs, sauce tomate",
        price: 1800,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m17",
        name: "Pizza Royale (Moyenne)",
        description: "Viande, Poulet, 3 Fromages, sauce tomate, Olive",
        price: 1600,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m18",
        name: "Pizza Marguerite (Moyenne)",
        description: "Sauce tomate, Cheddar, Olive",
        price: 650,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m19",
        name: "Sandwich Forestin",
        description: "Steak Haché, Ognion caramélisé, Champignons, Gouda, Salade, Tomate, Sauce",
        price: 450,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m20",
        name: "Sandwich Mexicain",
        description: "Poulet Mariné Piquant, Frite, Salade, Tomate, Sauce Fromagère",
        price: 300,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "m21",
        name: "Sandwich Shawarma",
        description: "Shawarma, Frite, Salade, Tomate, Sauce Fromagère",
        price: 300,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop"
      }
    ]
  }
];
