import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Clock, Star, MapPin, Plus, Minus, Info } from 'lucide-react';
import { restaurants, Restaurant, MenuItem } from './data';
import { CartProvider, useCart } from './CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Chatbot } from './components/Chatbot';

function AppContent() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { items, addItem, removeItem, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Cherchell'
  });

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const orderData = {
      ...formData,
      restaurant: items[0]?.restaurantName,
      total,
      quantity: totalQuantity,
      items: items.map(i => `${i.quantity}x ${i.name}`).join(', '),
      date: new Date().toISOString()
    };

    // Envoi de la notification vers Telegram
    const telegramBotToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const telegramChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (telegramBotToken && telegramChatId) {
      const telegramText = `🚨 <b>Nouvelle Commande TipazaEats</b> 🚨\n\n` +
        `👤 <b>Client:</b> ${orderData.name}\n` +
        `📞 <b>Téléphone:</b> ${orderData.phone}\n` +
        `📍 <b>Ville:</b> ${orderData.city}\n` +
        `🏠 <b>Adresse:</b> ${orderData.address}\n` +
        `🏪 <b>Restaurant:</b> ${orderData.restaurant}\n` +
        `📦 <b>Articles:</b> ${orderData.items}\n` +
        `💰 <b>Total:</b> ${orderData.total} DZD`;

      try {
        const cleanToken = telegramBotToken.trim().replace(/^bot/i, '');
        const params = new URLSearchParams({
          chat_id: telegramChatId.trim(),
          text: telegramText,
          parse_mode: 'HTML',
        });

        const tgResponse = await fetch(`https://api.telegram.org/bot${cleanToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });
        
        const tgData = await tgResponse.json();
        if (!tgResponse.ok) {
          console.error("Erreur API Telegram:", tgData);
          toast.error("Erreur Telegram: " + (tgData.description || "Vérifiez vos identifiants"));
        }
      } catch (error: any) {
        console.error("Erreur lors de l'envoi à Telegram:", error);
        if (error?.message === 'Failed to fetch') {
          toast.error("Erreur réseau: Bloqué par un anti-pub ou problème de connexion.");
        } else {
          toast.error("Erreur de connexion à Telegram");
        }
      }
    } else {
      console.warn("Variables Telegram manquantes");
      toast.warning("Attention : Les notifications Telegram ne sont pas configurées.");
    }

    toast.success("Commande confirmée ! Le livreur vous contactera bientôt.");
    clearCart();
    setIsCheckoutOpen(false);
    setSelectedRestaurant(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedRestaurant(null)}>
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">TipazaEats</span>
          </div>

          <Sheet>
            <SheetTrigger render={<Button variant="outline" className="relative" />}>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Panier
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
              <SheetHeader>
                <SheetTitle>Votre Panier</SheetTitle>
              </SheetHeader>
              
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                  <p>Votre panier est vide</p>
                </div>
              ) : (
                <>
                  <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground mb-4">
                        Commande chez <span className="font-semibold text-foreground">{items[0].restaurantName}</span>
                      </div>
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} DZD</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-4 text-center text-sm">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addItem(item, { id: item.restaurantId, name: item.restaurantName } as Restaurant)}>
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{total} DZD</span>
                    </div>
                    <Button className="w-full" size="lg" onClick={() => setIsCheckoutOpen(true)}>
                      Commander
                    </Button>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {!selectedRestaurant ? (
          <div className="space-y-8">
            <section className="text-center space-y-4 py-12 bg-primary/5 rounded-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Livraison rapide à <span className="text-primary">Cherchell & Tipaza</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Commandez vos plats préférés des meilleurs restaurants de la région. Livré directement chez vous.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Restaurants Populaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-md" onClick={() => setSelectedRestaurant(restaurant)}>
                    <div className="h-48 overflow-hidden relative">
                      <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover transition-transform hover:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        {restaurant.rating}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{restaurant.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{restaurant.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="text-sm text-muted-foreground flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {restaurant.deliveryTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Tipaza
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            <Button variant="ghost" className="-ml-4" onClick={() => setSelectedRestaurant(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux restaurants
            </Button>

            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden">
              <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-6 md:p-10 text-white w-full">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h1 className="text-3xl md:text-5xl font-bold mb-2">{selectedRestaurant.name}</h1>
                      <p className="text-white/80 max-w-xl">{selectedRestaurant.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">
                        <Star className="w-3 h-3 fill-current mr-1" /> {selectedRestaurant.rating}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">
                        <Clock className="w-3 h-3 mr-1" /> {selectedRestaurant.deliveryTime}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedRestaurant.menu.map((item) => (
                  <Card key={item.id} className="flex overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="font-bold text-primary">{item.price} DZD</span>
                        <Button size="sm" onClick={() => addItem(item, selectedRestaurant)}>
                          <Plus className="w-4 h-4 mr-1" /> Ajouter
                        </Button>
                      </div>
                    </div>
                    <div className="w-32 h-full hidden sm:block">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Finaliser la commande</DialogTitle>
            <DialogDescription>
              Entrez vos coordonnées pour la livraison.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ex: Karim Benali" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input id="phone" required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="0555 12 34 56" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <select 
                id="city" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.city} 
                onChange={e => setFormData({...formData, city: e.target.value})}
              >
                <option value="Cherchell">Cherchell</option>
                <option value="Tipaza">Tipaza</option>
                <option value="Sidi Ghiles">Sidi Ghiles</option>
                <option value="Nador">Nador</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse détaillée</Label>
              <Input id="address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Quartier, rue, bâtiment..." />
            </div>
            
            <div className="bg-muted p-3 rounded-md flex gap-2 text-sm text-muted-foreground mt-4">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Paiement à la livraison. Le livreur vous contactera pour confirmer.</p>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsCheckoutOpen(false)}>Annuler</Button>
              <Button type="submit">Confirmer ({total} DZD)</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
      <Chatbot />
      <Toaster position="top-center" />
    </CartProvider>
  );
}
