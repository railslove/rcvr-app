#include "LoadFile.hxx"
#include "SaveFile.hxx"

#include <sodium/crypto_box.h>

#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

int
main(int argc, char **argv)
{
	if (argc != 5) {
		fprintf(stderr,
			"Usage: %s SECRETKEYFILE PUBLICKEYFILE INPUTFILE OUTPUTFILE\n",
			argv[0]);
		return EXIT_FAILURE;
	}

	const auto secret_key = LoadFile(argv[1]);
	if (secret_key.size() != crypto_box_SECRETKEYBYTES) {
		fprintf(stderr, "Not a secret key: %s\n", argv[1]);
		exit(EXIT_FAILURE);
	}

	const auto public_key = LoadFile(argv[2]);
	if (public_key.size() != crypto_box_PUBLICKEYBYTES) {
		fprintf(stderr, "Not a public key: %s\n", argv[2]);
		exit(EXIT_FAILURE);
	}

	const auto input = LoadFile(argv[3]);
	if (input.size() < crypto_box_SEALBYTES) {
		fprintf(stderr, "Not an encrypted file: %s\n", argv[3]);
		exit(EXIT_FAILURE);
	}

	std::vector<unsigned char> output;
	output.resize(input.size() - crypto_box_SEALBYTES);

	if (crypto_box_seal_open(&output.front(), &input.front(), input.size(),
				 &public_key.front(),
				 &secret_key.front()) != 0) {
		fprintf(stderr, "Failed to decrypt file\n");
		exit(EXIT_FAILURE);
	}

	SaveFile(argv[4], &output.front(), output.size());

	return EXIT_SUCCESS;
}
