#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

static void
SaveFile(const char *path, const void *data, size_t size)
{
	int fd = open(path, O_CREAT|O_TRUNC|O_WRONLY, 0666);
	if (fd < 0) {
		fprintf(stderr, "Failed to create %s: %s\n",
			path, strerror(errno));
		exit(EXIT_FAILURE);
	}

	ssize_t nbytes = write(fd, data, size);
	if (nbytes < 0) {
		fprintf(stderr, "Failed to write %s: %s\n",
			path, strerror(errno));
		exit(EXIT_FAILURE);
	}

	close(fd);
}
