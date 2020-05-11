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
	if (argc != 4) {
		fprintf(stderr,
			"Usage: %s PUBLICKEYFILE INPUTFILE OUTPUTFILE\n",
			argv[0]);
		return EXIT_FAILURE;
	}

	const auto public_key = LoadFile(argv[1]);
	if (public_key.size() != crypto_box_PUBLICKEYBYTES) {
		fprintf(stderr, "Not a public key: %s\n", argv[1]);
		exit(EXIT_FAILURE);
	}

	const auto input = LoadFile(argv[2]);

	std::vector<unsigned char> output;
	output.resize(crypto_box_SEALBYTES + input.size());

	crypto_box_seal(&output.front(), &input.front(), input.size(),
			&public_key.front());
	SaveFile(argv[3], &output.front(), output.size());

	return EXIT_SUCCESS;
}
