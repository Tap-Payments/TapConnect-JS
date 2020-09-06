export function sortCountries(direction) {
  return direction == 'rtl'
    ? function (a, b) {
        /// arabic pattern
        var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
        const aArabicScript = pattern.test(a.name.arabic);
        if (!aArabicScript) return 1;
        if (a.name.arabic < b.name.arabic) return -1;
        if (a.name.arabic > b.name.arabic) return 1;
        return 0;
      }
    : function (a, b) {
        if (a.name.english < b.name.english) return -1;
        if (a.name.english > b.name.english) return 1;
        return 0;
      };
}
