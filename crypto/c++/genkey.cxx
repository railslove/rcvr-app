#include "SaveFile.hxx"

#include <sodium/crypto_box.h>

#include <stdio.h>
#include <stdlib.h>

int
main(int argc, char **argv)
{
	if (argc != 3) {
		fprintf(stderr,
			"Usage: %s PUBLICKEYFILE SECRETKEYFILE\n",
			argv[0]);
		return EXIT_FAILURE;
	}

	unsigned char pk[crypto_box_PUBLICKEYBYTES];
	unsigned char sk[crypto_box_SECRETKEYBYTES];
	crypto_box_keypair(pk, sk);

	SaveFile(argv[1], pk, sizeof(pk));
	SaveFile(argv[2], sk, sizeof(sk));

	return EXIT_SUCCESS;
}
