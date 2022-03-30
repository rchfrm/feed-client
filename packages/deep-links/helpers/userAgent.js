module.exports = (userAgentString) => {
  console.log(userAgentString)
  return {
    userAgent: userAgentString,

    get isIOS() {
      return this.userAgent.match(/iPhone|iPad|iPod/i) != null
    },

    get isAndroid() {
      return this.userAgent.match(/Android/i) != null
    },
  }
}
