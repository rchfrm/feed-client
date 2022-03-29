export default class UserAgent {
  constructor(userAgentString) {
    this.userAgent = userAgentString
  }

  get isIOS() {
    return this.userAgent.match(/iPhone|iPad|iPod/i) != null
  }

  get isAndroid() {
    return this.userAgent.match(/Android/i) != null
  }
}
