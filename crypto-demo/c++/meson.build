project('recvr-app', 'cpp', version: '0.1',
  default_options: [
    'cpp_std=c++17'
  ],
)

compiler = meson.get_compiler('cpp')

common_flags = [
  '-D_GNU_SOURCE',
  '-Wall',
  '-Wextra',
  '-Wwrite-strings', '-Wcast-qual', '-Wcast-align', '-Wfloat-equal',
  '-Wshadow', '-Wpointer-arith', '-Wsign-compare',
  '-Wmissing-declarations', '-Wmissing-noreturn', '-Wmissing-format-attribute',
  '-Wredundant-decls', '-Wno-long-long', '-Wundef',
  '-Wunused',
  '-Wundef',
]

add_global_arguments(
  common_flags,
  '-Wno-missing-field-initializers',
  '-Wno-non-virtual-dtor',
  language: 'cpp')

libsodium = dependency('libsodium')

executable(
  'genkey',
  'genkey.cxx',
  dependencies: [
    libsodium,
  ],
)

executable(
  'seal',
  'seal.cxx',
  dependencies: [
    libsodium,
  ],
)

executable(
  'open',
  'open.cxx',
  dependencies: [
    libsodium,
  ],
)
