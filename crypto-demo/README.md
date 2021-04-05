# rcvr.app Cryptography

This document gives a brief overview how cryptography is used by
*rcvr.app* to exchange and store personal data securely.

## Roles

The following roles are used in this document:

- **owner**: the owner of the locality (e.g. a restaurant).
- **guest**: a guest in the locality whose data is to be managed by
  rcvr.app.
- **agency**: a government agency such as a public health department
  which needs to be given access to guest's clear-text data after an
  infection incident.
- **provider**: an independent entity which runs the database
  containing encrypted records (e.g. Railslove).

## Basic Idea

To allow localities to welcome guests while still fighting the
enduring Covid-19 pandemic, one needs to be able to track chains of
infections and subsequently notify all endangered guests.  That seems
to contradict with people's desire for privacy, and keeping track of
visitors requires trust from those people.

*rcvr.app* attempts to gain trust by keeping all software open
and all data closed.  The software is free and open source, and all
data is encrypted.

The encryption is built in a way that no single party can access the
data, even if they wanted to.  It must be impossible for the owner (or
his employees or other guests) to spy on guests (which is the central
weakness of the paper trail).  It must be equally impossible for the
government to abuse the data for illegal purposes.  All authorized
access to data and the reasons for doing so should be transparent.

There were external constraints limiting our ideas how to secure the
data even more; sometimes, we needed to cut down the concepts in order
to fulfill German Covid-19 decrees (some details of which did not make
a lot of sense initially) or to meet the limited computer
infrastructure of public health departments with whom we need to
cooperate.

One crucial feature described here which is still missing due to the
inability of agencies to use them is the second (i.e. inner) layer of
encryption.  Without that second layer, data abuse is not made
difficult enough.

## Workflow

A locality *owner* creates an account at the *provider* and prints a
unique QR code for every table.  *Guests* scan this QR code which
opens a browser window showing *rcvr.app* where they enter their data.
This data is (encrypted twice and) submitted to the *provider* where
it will be stored (until it expires and gets deleted).

After an infection incident:

1. The *agency* requests a *guest* list from the *owner* for a certain
   time span.
2. The *owner* forwards this request to the *provider*.
3. The *provider* extracts the (doubly encrypted) list from the
   database and give it to the *owner*.
4. The *owner* (decrypts the outer layer and) forwards the (still
   encrypted) list to the *agency*.
5. The *agency* decrypts the inner layer, which finally reveals
   unencrypted data.
6. Now the *agency* can do its job.

This workflow ensures that no single party can read clear-text guest
data.  It requires all of the three parties (owner, provider and
agency) to agree on the data access.  Only the provider actually has
any data, and both private keys of the other two are required to
decrypt it.

This process makes authorized data access easy, and at the same time
makes abuse hard, because three parties need to be convinced.

## Key Management

During registration with the *provider*, the *owner* generates a
private/public key pair which is stored on his smartphone.  The
private key must never be accessible by anybody other than the owner
(it must never be made available to the provider or to the agency, for
example).  The *agency* responsible for the owner's locality needs to
have a private/public key pair, too.  Both public keys are encoded
(together with the table number) in the QR codes for each table.  This
way, *guests* know the public keys their smartphone will use to
encrypt their data.

The owner does not see those encrypted records; they are stored only
by the provider.  The owner will only receive (and decrypt) those
records after the agency has requested them.

## Ciphers

*rcvr.app* uses [libsodium sealed
boxes](https://libsodium.gitbook.io/doc/public-key_cryptography/sealed_boxes)
to encrypt data, which is based on
[X25519](https://en.wikipedia.org/wiki/Curve25519)
[XSalsa20](https://en.wikipedia.org/wiki/Salsa20#XSalsa20_with_192-bit_nonce)-[Poly1305](https://en.wikipedia.org/wiki/Poly1305).
These algorithms are modern, secure and simple to use.
