exports.handler = async (data) => {
  if (data.key) {
    return {
      key: data.key
    }
  } else {
    return {
      error: 'no key provided'
    }
  }
}
