# E-Commerce System

Node.js + Express + MySQL

This project is a full-featured E-Commerce Back-End Application built with Node.js, Express, and MySQL.
It includes customer authentication, product–brand–model relations, shopping cart logic, supplier management, order history, and admin-only operations.

## Technologies

Node.js

Express.js

MySQL

EJS

bcrypt

express-session

crypto

nodemailer

## Project Structure

### Important:
Only the file names remain in Turkish.
All documentation/description is in English.

/routes
   ├── marka-ekle.js
   ├── marka-guncelle.js
   ├── marka-listele.js
   ├── marka-sil.js
   ├── model-ekle.js
   ├── model-guncelle.js
   ├── model-listele.js
   ├── model-sil.js
   ├── musteri-login.js
   ├── musteri-logout.js
   ├── musteri-uye-ol.js
   ├── musteri-guncelle.js
   ├── musteri-listele.js
   ├── musteri-sil.js
   ├── tedarikci-ekle.js
   ├── tedarikci-guncelle.js
   ├── tedarikci-listele.js
   ├── tedarikci-sil.js
   ├── tedarikci-sorgula.js
   ├── urun-ekle.js
   ├── urun-guncelle.js
   ├── urun-listele.js
   ├── urun-sil.js
   ├── sepet.js
   ├── siparis-arsiv.js
   ├── resim-gor.js
   ├── sil.js

/middleware
   ├── authAdmin.js

/utility
   ├── database.js

/views
   ├── *.pug

```

## Authentication System
### Customer Login (musteri-login.js)

Login is done using email + phone + password.

Passwords are verified with bcrypt.

After login, any temporary cart is merged into the user's permanent cart.

### Customer Registration (musteri-uye-ol.js)

Password is hashed before saving.

A 6-digit verification code is generated.

Verification code is emailed to the user.

Code expires in 10 minutes.

After correct verification, the account becomes active.

## Cart System (sepet.js)
If the user is not logged in:

Products are stored in a temporary cart table.

If the same product is added again, quantity is increased.

If the user is logged in:

Products are stored in the user’s permanent cart.

Quantities are updated intelligently.

Stocks are validated before adding.

On login, the temporary cart is fully transferred and then deleted.

## Brand – Model – Product Management
### Brand Operations

Handled through:

marka-ekle.js

marka-guncelle.js

marka-listele.js

marka-sil.js

All routes are admin-protected.

### Model Operations

Same logic as brands:

add / update / list / delete

### Product Operations

Add product (image URL, price, discounted price, stock)

Update product

List products

Delete products

Brand–Model–Product relations are managed via marka_model_hareket table.

## Supplier Management
### Supplier Operations

Add / update / list / delete

Before deleting a supplier, related records in urun_tedarik_detay are removed.

### Supplier Querying (tedarikci-sorgula.js)

Admin can list suppliers along with their supplied products.

## Order Archive (siparis-arsiv.js)

Logged-in users can view all their past orders:

Order date

Product details

Brand / model

Unit price

Quantity

Total price

Product image

## Admin Authorization

authAdmin.js protects all admin-only pages.

If the user is NOT admin, they cannot access:

/marka-listele
/model-listele
/tedarikci-listele
/urun-ekle
/resim-gor
...


Attempting to access redirects them away.

## Installation
1. Install required packages
npm install

2. Configure MySQL

Create the required tables:

musteriler

markalar

modeller

urunler

marka_model_hareket

gecici_sepet

sepet

kayitli_siparisler

kayitli_siparis_detay

tedarikciler

urun_tedarik_detay

stoklar

3. Edit database.js
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eticaret"
});

4. Start the server
npm start

5. Open in browser
http://localhost:3000

## Image Viewer

/resim-gor?url=...
Displays product images in full size inside the admin panel.

## Delete Operations (sil.js)

Automatic cascading clean-up:

Deleting a brand → removes marka_model_hareket records

Deleting a model → removes marka_model_hareket records

Deleting a customer → clears order history

Deleting a supplier → clears urun_tedarik_detay

## Notes

If a product has a discounted price, that price is always used.

Guests use temporary carts.

On login, temporary carts are transferred automatically.

## License

This project currently has no license.

## Contributing

Fork the repository

Create a new branch

Commit your changes

Open a pull request
