function ShortenedText(text: string) {
  if (text.length > 48) {
    return <span>{text.substring(0, 48)}...</span>;
  } else {
    return <span>{text}</span>;
  }
}

export default ShortenedText;
