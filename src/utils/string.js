const shortText = (text, length) => {
  return `${text.substr(0, length)}...${text.substr(-length, length)}`
}

export default shortText
