export async function filterCountries(countryList) {
  var _filteredCountryList = [...countryList];

  return _filteredCountryList.filter((country) => {
    return !country.logo ||
      !country.iso2 ||
      country.iso2 == '' ||
      !country.iso3 ||
      country.iso3 == '' ||
      !country.digits ||
      country.digits == '' ||
      !country.idd_prefix ||
      country.idd_prefix == '' ||
      country.idd_prefix == 0 ||
      !country.name ||
      !country.name.english ||
      country.name.english.indexOf('?') != -1
      ? false
      : true;
  });
}
