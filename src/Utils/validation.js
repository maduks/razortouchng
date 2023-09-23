export function IsPhoneNumberValidate(phonenumber) {
  return /^[0-9]+$/.test(phonenumber);
}

export function IsNameValidate(name) {
  return name.length < 3;
}

export function reg(number){
  return !/^\d{0,2}\/?\d{0,2}$/.test(number)
}

export function Visa(number) {
  return /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.text(number)
}

export function MasterCard(number){
  return /^(?:5[1-5][0-9]{14})$/.test(number)
}

export function Amexp(number){
  return /^(?:3[47][0-9]{13})$/.test(number)
}

export function DiscovRegEx(number){
  return /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/.test(number)
}
  
   