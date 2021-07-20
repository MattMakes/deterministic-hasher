function format(mask, number) {
  var s = '' + number, r = '';
  for (var im = 0, is = 0; im < mask.length && is < s.length; im++) {
    r += mask.charAt(im) == 'X' ? s.charAt(is++) : mask.charAt(im);
  }
  return r;
}

console.log(format('XX.XX.XX', 12345678)); // logs "12.34.56" 
console.log(format('XXX-XXXX', 12345678)); // logs "123-4567"
console.log(format('XX-XX-XX', 12345678)); // logs "12-34-56 "
console.log(format('XX/XX/XX', 12345678)); // logs "12/34/56"
console.log(format('XX/XX/XX/XX/XX', 12345678)); // logs "12/34/56/78"