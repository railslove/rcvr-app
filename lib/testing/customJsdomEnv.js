/* global Uint8Array, ArrayBuffer */
const JsdomEnvironment = require('jest-environment-jsdom')
const { TextEncoder, TextDecoder } = require('util')

class CustomEnvironment extends JsdomEnvironment {
  async setup() {
    await super.setup()
    this.global.TextEncoder = TextEncoder
    this.global.TextDecoder = TextDecoder
    this.global.Uint8Array = Uint8Array
    this.global.ArrayBuffer = ArrayBuffer
  }
}

module.exports = CustomEnvironment
