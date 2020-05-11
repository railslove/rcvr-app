<p align="center">
  <img src=".github/checkmark.png" width="95" height="87">
</p>

<h1 align="center">rcvr-app</h1>

<p align="center">
  <a href="https://rcvr.app">rcvr.app</a> – client app for <a href="https://www.recoverapp.de">recover</a> – a product by <a href="https://railslove.com">Railslove</a>
</p>

- [Intro](#intro)
- [How does rcvr.app work?](#how-does-rcvrapp-work)
- [Background](#background)
- [Contribute](#contribute)
- [License](#license)

## Intro

Due to COVID19, many businesses in germany like bars and restaurants are required to keep track of the name, phone number, table where the guest is sitting, and time of visit. In case of an infection, the public health department can trace contact persons using this data.

The german government suggested a very oldschool way no how to achieve this: owners should put a list on each table – with a pen and paper – and guests need to write down their data, visible to everyone.

**We think we can do better.** Those lists are annoying for everyone, and it's a big privacy concern.  
With **recover**, guests simply scan a QR code, they enter their name and phone number, which will be encryped on their device and stored on a server. This data can only be decrypted by the business owner, and only when the public health department requests this data.

## How does rcvr.app work?

When an owner signs up, a keypair will generated on their device. The owner needs to store the private key, by saving it inside a password manager or writing it on a paper and store it safely. This private key is required to encrypt the data of the guests.

The public part of this keypair is embedded inside the QR Code, together with a unique identifier for each table.  
When guests scans this QR Code, they enter their data, which will be encrypted using this public key. This encrypted data will be stored on our server, together with the table identifier and checkin date / checkout date.

When the public health department requests data for a specific timerange from the owner, we will send him the encrypted data of each guest in this timerange. The owner can decrypt this data using his private key, and send it to the public health department.

When a guest checks in, a random ID will be saved on the guest's device. **recover** will provide a public feed of all checkin IDs which are in danger of a COVID19 infection. The IDs can be public because they cannot be traced to a person. Only the guest's device knows if one of the stored IDs is also inside this public feed. If this is the case, we can notify the guest of the potential infection.

## Background

**recover** was developed during one weekend. We noticed the urgency and needs of business owners and wanted to provide a solution. A special thanks goes to everyone who helped and consulted us to achieve our goal in this short amount of time. Excuse any ugly parts inside this codebase, caused by the rapid development of this product.

## Contribute

**Stack:**

- Next.js
- Typescript
- styled-system

Before you can start, you need:

- Node >= 12
- npm (comes with node)

Install the dependencies:

```
npm install
```

Start the Next.js app:

```
npm run dev
```

The app is now available here: http://localhost:3000

## License

AGPL, © 2020 Railslove GmbH

---

<p align="center">
  Made with 💚 in Cologne
</p>
