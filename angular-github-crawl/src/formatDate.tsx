function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const years = now.getFullYear() - date.getFullYear();
  const months = now.getMonth() - date.getMonth();
  const days = now.getDate() - date.getDate();
  const hours = now.getHours() - date.getHours();
  const minutes = now.getMinutes() - date.getMinutes();
  const seconds = now.getSeconds() - date.getSeconds();
  
  if (years > 0) {
    return `${years}y`;
  } else if (months > 0) {
    return `${months}mo`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}min`;
  } else {
    return `${seconds}s`;
  }
}
export default formatDate;