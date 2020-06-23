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

Due to COVID19, many businesses in germany like bars and restaurants are required to keep track of the name, phone number, address, table where the guest is sitting, and time of visit. In case of an infection, the public health department can trace contact persons using this data.

The german government suggested a very oldschool way on how to achieve this: owners should put a list on each table – with paper and a pen – and guests need to write down their data, visible to everyone.

**We think we can do better.** Those lists are annoying for everyone, and it's a big privacy concern.  
With **recover**, guests simply scan a QR Code with their phone and enter their contact details, which will be encrypted on their device and stored on our server. This data can only be decrypted by the business owner, and only when the public health department requests this data.

## How does rcvr.app work?

When an owner signs up, a keypair will be generated on their device. The owner needs to store the private key safely, by saving it inside a password manager or writing it on a piece of paper. This private key is required to decrypt the data of the guests.

The public part of this keypair is embedded inside the QR Code, together with a unique identifier for each table.  
When a guest scans this QR Code, they enter their data, which will be encrypted using this public key. This encrypted data will be stored on our server, together with the table identifier and checkin / checkout date.

When the public health department requests data for a specific timerange from an owner, we will send them the encrypted data of each guest in this timerange. The owner can then decrypt this data using his private key, and send it to the public health department.

When a guest checks in, a random ID will be saved on the guest's device. **recover** will provide a public feed of all checkin IDs which are in danger of a COVID19 infection. The IDs can be public because they cannot be traced back to a person. Only the guest's device knows if one of the stored IDs is also inside this public feed. If this is the case, we can notify the guest of the potential infection.

## Background

**recover** was initially developed during one weekend. We noticed the urgency and needs of business owners and wanted to provide a solution. A special thanks goes to everyone who helped and consulted us to achieve our goal in this short amount of time.

## Contribute

**Stack:**

- Typescript
- [Next.js](https://nextjs.org/)
- [Emotion](https://emotion.sh/)
- [Styled System](https://styled-system.com/)
- [React Query](https://github.com/tannerlinsley/react-query/)
- [Dexie.js](http://dexie.org/)
- [Formik](https://jaredpalmer.com/formik/)
- [Framer Motion](https://www.framer.com/motion/)
- [SVGR](https://react-svgr.com/)

**Before you can start, you need:**

- Node >= 12
- npm (comes with node)

**Setup:**

Install the dependencies:

```
npm install
```

Start the Next.js app:

```
npm run dev
```

The app is now available here: http://localhost:3000

You can also choose a different port, e.g. when you're running [rcvr-api](https://github.com/railslove/rcvr-api/) already on port 3000.

```
npm run dev -- -p 3333
```

If you want to change environment variables locally, for example the API URL, you can duplicate `.env` to `.env.local` and change the variables in your local copy. Read more about environment variables [here](https://nextjs.org/docs/basic-features/environment-variables).

### Build variants

_[recover care](https://care.rcvr.app/)_ has slight differences in theming and behavior. To switch to recover care, set the environment variable `BUILD_VARIANT=care`.

```
BUILD_VARIANT=care npm run dev
```

**Branches** with the prefix `care/` will automatically have deployment previews using the _recover care_ build variant.

## License

AGPL, © 2020 Railslove GmbH

---

<p align="center">
  Made with 💚 in Cologne
</p>
