import fs from 'fs';

const updateTranslations = (file, key, data) => {
  const content = fs.readFileSync(file, 'utf-8');
  const json = JSON.parse(content);
  if (!json.about) json.about = {};
  json.about[key] = data;
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

updateTranslations('src/i18n/ar.json', 'certificationsTitle', 'الشهادات والسجلات الرسمية');
updateTranslations('src/i18n/ar.json', 'certificationsSubtitle', 'وثائق التسجيل والاعتمادات الحكومية للشركة');

updateTranslations('src/i18n/en.json', 'certificationsTitle', 'Official Registrations');
updateTranslations('src/i18n/en.json', 'certificationsSubtitle', 'Company registration and government accreditations');

console.log("Updated translations with certifications text");
