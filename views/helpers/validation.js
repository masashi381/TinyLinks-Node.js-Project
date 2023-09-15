function validateURL() {
  const longUrl = document.getElementById('longUrl').value;
  const urlPattern = /^(http(s)?:\/\/)(www\.)?[\w-\/?:]+$/;
  if (longUrl === '') {
    alert('Please enter a URL.');
    return false;
  }

  if (!urlPattern.test(longUrl)) {
    alert('Please enter a valid URL.');
    return false;
  }

  return true;
}

console.log('aaa');
