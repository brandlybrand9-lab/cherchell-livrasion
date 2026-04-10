# TipazaEats - Guide de connexion Google Sheets

Votre site de livraison est prêt ! Pour que vos livreurs reçoivent les commandes directement sur un fichier Google Sheets, suivez ces étapes simples :

## Étape 1 : Créer le fichier Google Sheets
1. Allez sur [Google Sheets](https://sheets.google.com) et créez un nouveau fichier.
2. Nommez-le "Commandes TipazaEats".
3. Dans la première ligne, ajoutez ces 9 colonnes (de A à I) : `Date`, `Nom`, `Téléphone`, `Ville`, `Adresse`, `Restaurant`, `Articles`, `Quantité`, `Total`.

## Étape 2 : Ajouter le script
1. Dans votre fichier Google Sheets, cliquez sur **Extensions** > **Apps Script**.
2. Supprimez le code existant et collez ce code :

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.date,
    data.name,
    data.phone,
    data.city,
    data.address,
    data.restaurant,
    data.items,
    data.quantity,
    data.total + " DZD"
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
}
```

## Étape 3 : Déployer le script
1. Cliquez sur le bouton bleu **Déployer** en haut à droite, puis sur **Nouveau déploiement**.
2. Cliquez sur l'icône d'engrenage à côté de "Sélectionner le type" et choisissez **Application Web**.
3. Dans la description, mettez "Webhook Commandes".
4. Dans "Exécuter en tant que", choisissez **Moi**.
5. Dans "Qui a accès", choisissez **Tout le monde**.
6. Cliquez sur **Déployer** (vous devrez peut-être autoriser l'accès avec votre compte Google).
7. Copiez l'**URL de l'application Web** qui s'affiche.

## Étape 4 : Connecter le site
1. Ouvrez le fichier `/src/App.tsx` dans votre code.
2. Cherchez la ligne `// await fetch('YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL', ...)` (autour de la ligne 38).
3. Décommentez la ligne (enlevez les `//`) et remplacez `YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL` par l'URL que vous avez copiée.

Et voilà ! Chaque fois qu'un client passera une commande, elle apparaîtra automatiquement dans votre Google Sheet pour vos livreurs.
