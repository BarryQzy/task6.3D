let form = document.querySelector(".form-body");
let country = document.querySelector("#country");
let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");
let address1 = document.querySelector("#address1");
let address2 = document.querySelector("#address2");
let city = document.querySelector("#city");
let state = document.querySelector("#state");
let zip = document.querySelector("#zip");
let phoneNumber = document.querySelector("#phoneNumber");

function validate(event) {
  // event.preventDefault();
  let Country = country.value;
  let FirstName = firstName.value.trim();
  let LastName = lastName.value.trim();
  let Email = email.value.trim();
  let Password = password.value.trim();
  let ConfirmPassword = confirmPassword.value.trim();
  let Address1 = address1.value.trim();
  let Address2 = address2.value.trim();
  let City = city.value.trim();
  let State = state.value.trim();
  let Zip= zip.value.trim();
  let PhoneNumber = phoneNumber.value.trim();
  if (validator.isEmpty(Country)) {
    alert("Please choose your country!");
    country.focus();
    return false;
  }
  if (validator.isEmpty(FirstName)) {
    alert("Please input your first name!");
    firstName.focus();
    return false;
  }
  if (validator.isEmpty(LastName)) {
    alert("Please input your last name!");
    lastName.focus();
    return false;
  }
  if (validator.isEmpty(Email)) {
    alert("Please input your email address!");
    email.value = "";
    email.focus();
    return false;
  }
  if (!validator.isEmail(Email)) {
    alert("Your email address is not valid!");
    email.value = "";
    email.focus();
    return false;
  }
  if (validator.isEmpty(Password)) {
    alert("Please input your password!");
    password.value = "";
    password.focus();
    return false;
  }
  if (!validator.equals(Password, ConfirmPassword)) {
    alert("Your password should be the same as Confirm password!");
    password.value = "";
    confirmPassword.value = "";
    password.focus();
    return false;
  }
  if (!validator.isLength(Password, { min: 8 })) {
    alert("Your password must be at least 8 characters!");
    password.value = "";
    confirmPassword.value = "";
    password.focus();
    return false;
  }
  if (validator.isEmpty(Address1)) {
    alert("Please input your address!");
    address1.value = "";
    address2.value = "";
    address1.focus();
    return false;
  }
  if (validator.isEmpty(City)) {
    alert("Please input your city!");
    city.value = "";
    city.focus();
    return false;
  }
  if (validator.isEmpty(State)) {
    alert("Please input your state, province or region!");
    state.value = "";
    state.focus();
    return false;
  }
  if ((!validator.isEmpty(PhoneNumber))&&(!validator.isMobilePhone(PhoneNumber, ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-SA', 'ar-SY', 'ar-TN', 'be-BY', 'bg-BG', 'bn-BD', 'cs-CZ', 'da-DK', 'de-DE', 'de-AT', 'de-CH', 'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-HK', 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-UG', 'en-US', 'en-TZ', 'en-ZA', 'en-ZM', 'en-ZW' , 'es-CL', 'es-CO', 'es-CR', 'es-EC', 'es-ES', 'es-MX', 'es-PA', 'es-PY', 'es-UY', 'et-EE', 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-RE', 'he-IL', 'hu-HU', 'id-ID', 'it-IT', 'ja-JP', 'kk-KZ', 'kl-GL', 'ko-KR', 'lt-LT', 'ms-MY', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sl-SI', 'sk-SK', 'sr-RS', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'])))
  {
    alert("Your phone number is not valid!");
    phoneNumber.value = "";
    phoneNumber.focus();
    return false;
  }
  return true;
}
