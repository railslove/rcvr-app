#include <vector>

#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

static std::vector<unsigned char>
LoadFile(const char *path)
{
	int fd = open(path, O_RDONLY);
	if (fd < 0) {
		fprintf(stderr, "Failed to open %s: %s\n",
			path, strerror(errno));
		exit(EXIT_FAILURE);
	}

	struct stat st;
	if (fstat(fd, &st) < 0) {
		fprintf(stderr, "Failed to access %s: %s\n",
			path, strerror(errno));
		exit(EXIT_FAILURE);
	}

	if (!S_ISREG(st.st_mode)) {
		fprintf(stderr, "Not a regular file: %s\n", path);
		exit(EXIT_FAILURE);
	}

	if (st.st_size > 1024 * 1024) {
		fprintf(stderr, "File too large: %s\n", path);
		exit(EXIT_FAILURE);
	}

	std::vector<unsigned char> result;
	result.resize(st.st_size);

	ssize_t nbytes = read(fd, &result.front(), st.st_size);
	if (nbytes < 0) {
		fprintf(stderr, "Failed to read %s: %s\n",
			path, strerror(errno));
		exit(EXIT_FAILURE);
	}

	close(fd);
	return result;
}
