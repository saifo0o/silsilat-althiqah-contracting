import fs from 'fs';

const updateJSON = (file, dataToAdd, key) => {
  const content = fs.readFileSync(file, 'utf-8');
  const json = JSON.parse(content);
  json[key] = dataToAdd;
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

const updateJSONNested = (file, topKey, subKey, dataToAdd) => {
  const content = fs.readFileSync(file, 'utf-8');
  const json = JSON.parse(content);
  if (!json[topKey]) json[topKey] = {};
  json[topKey][subKey] = dataToAdd;
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

const projectsAr = [
  { no: 1, name: "تصحيح أساسات ضاغط كبير وأعمال الحماية من الحريق", client: "S-Chem", location: "الجبيل", duration: "أبريل 2014 - مايو 2014", value: "1,250,000", status: "مكتمل" },
  { no: 2, name: "تصحيح أساسات محولين وأعمال الحماية من الحريق وبناء جدار حريق", client: "Berry Gas Plant", location: "الجبيل", duration: "يونيو 2014 - يوليو 2014", value: "425,000", status: "مكتمل" },
  { no: 3, name: "تصحيح شبكة الصرف الحامضي ومناطق البلاطات الخرسانية", client: "سافكو (IBB)", location: "الجبيل", duration: "ديسمبر 2014 - مايو 2015", value: "1,700,000", status: "مكتمل" },
  { no: 4, name: "إصلاح خط أنابيب 20 بالياف الكربون المقواة (CFRP)", client: "سافكو (IBB)", location: "الجبيل", duration: "أغسطس 2015", value: "47,278", status: "مكتمل" },
  { no: 5, name: "إصلاح حفرة أنابيب تحت سطحية 1012-G I", client: "سافكو (IBB)", location: "الجبيل", duration: "أكتوبر 2015", value: "151,028", status: "مكتمل" },
  { no: 6, name: "دراسة هندسية لتصحيح وإعادة بناء حفرة المياه الزيتية", client: "أرامكو (KJO)", location: "الخفجي", duration: "ديسمبر 2015", value: "288,000", status: "مكتمل" },
  { no: 7, name: "تصحيح حفرة المياه الزيتية", client: "أرامكو (KJO)", location: "الخفجي", duration: "مارس 2016 - سبتمبر 2016", value: "5,240,000", status: "مكتمل" },
  { no: 8, name: "تحليل السلامة الإنشائية لخزان مياه مرتفع", client: "أرامكو (KJO)", location: "الخفجي", duration: "نوفمبر 2016 - يناير 2017", value: "500,000", status: "مكتمل" },
  { no: 9, name: "تبطين CFRP للمفاعلات (الأعمدة، السقف، جسم وغطاء المضخة)", client: "معادن PPC", location: "رأس الخير", duration: "مايو 2017 - يوليو 2017", value: "472,797", status: "مكتمل" },
  { no: 10, name: "أعمال إصلاح خط مياه التبريد 48 بوصة وخط التغذية 60 بوصة وفتحتين", client: "سافكو (IBB)", location: "الجبيل", duration: "أغسطس 2017 - سبتمبر 2017", value: "60,600", status: "مكتمل" },
  { no: 11, name: "تبطين CFRP مع طلاء نهائي للمفاعلات - خط PAP C", client: "معادن PPC", location: "رأس الخير", duration: "ديسمبر 2017 - يناير 2018", value: "180,000", status: "مكتمل" },
  { no: 12, name: "تبطين ألياف كربون طارئ - خط PAP B", client: "معادن PPC", location: "رأس الخير", duration: "فبراير 2018 - مارس 2018", value: "139,008", status: "مكتمل" },
  { no: 13, name: "خدمات تبطين ألياف الكربون - خط PAP A", client: "معادن PPC", location: "رأس الخير", duration: "يونيو 2018 - يوليو 2018", value: "194,552", status: "مكتمل" },
  { no: 14, name: "الحماية من التآكل باستخدام CFRP - خط PAP C", client: "معادن PPC", location: "رأس الخير", duration: "ديسمبر 2018 - يناير 2019", value: "223,635", status: "مكتمل" },
  { no: 15, name: "أعمال CFRP إضافية - خط PAP C", client: "معادن PPC", location: "رأس الخير", duration: "أبريل 2019 - مايو 2019", value: "211,573", status: "مكتمل" },
  { no: 16, name: "ترميم حفرة بالفايبرغلاس مع طلاء حماية", client: "هيئة الري السعودية (SIO)", location: "الأحساء", duration: "مايو 2019 - ديسمبر 2019", value: "1,542,725", status: "مكتمل" },
  { no: 17, name: "الحماية من التآكل باستخدام CFRP - خط PAP B", client: "معادن PPC", location: "رأس الخير", duration: "ديسمبر 2019 - يناير 2020", value: "265,152", status: "مكتمل" },
];

const projectsEn = [
  { no: 1, name: "Large Compressor Foundation Remediation & Fireproofing", client: "S-Chem", location: "Jubail", duration: "April 2014 - May 2014", value: "1,250,000", status: "Completed" },
  { no: 2, name: "Transformers Foundation Remediation, Fireproofing & Firewall Construction", client: "Berry Gas Plant", location: "Jubail", duration: "June 2014 - July 2014", value: "425,000", status: "Completed" },
  { no: 3, name: "Acidic Drainage Network & Concrete Slabs Remediation", client: "SAFCO (IBB)", location: "Jubail", duration: "Dec 2014 - May 2015", value: "1,700,000", status: "Completed" },
  { no: 4, name: "20\" Pipeline Repair using CFRP", client: "SAFCO (IBB)", location: "Jubail", duration: "August 2015", value: "47,278", status: "Completed" },
  { no: 5, name: "Sub-surface Pipe Trench Repair I 1012-G", client: "SAFCO (IBB)", location: "Jubail", duration: "October 2015", value: "151,028", status: "Completed" },
  { no: 6, name: "Engineering Study for Oily Water Trench Remediation & Reconstruction", client: "Aramco (KJO)", location: "Khafji", duration: "December 2015", value: "288,000", status: "Completed" },
  { no: 7, name: "Oily Water Trench Remediation", client: "Aramco (KJO)", location: "Khafji", duration: "March 2016 - Sept 2016", value: "5,240,000", status: "Completed" },
  { no: 8, name: "Structural Safety Analysis for Elevated Water Tank", client: "Aramco (KJO)", location: "Khafji", duration: "Nov 2016 - Jan 2017", value: "500,000", status: "Completed" },
  { no: 9, name: "CFRP Lining for Reactors (Columns, Roof, Pump Body & Cover)", client: "Ma'aden PPC", location: "Ras Al-Khair", duration: "May 2017 - July 2017", value: "472,797", status: "Completed" },
  { no: 10, name: "Repair Works for 48\" Cooling Water Line & 60\" Feed Line", client: "SAFCO (IBB)", location: "Jubail", duration: "August 2017 - Sept 2017", value: "60,600", status: "Completed" },
  { no: 11, name: "CFRP Lining with Top Coat for Reactors - PAP C Line", client: "Ma'aden PPC", location: "Ras Al-Khair", duration: "Dec 2017 - Jan 2018", value: "180,000", status: "Completed" },
  { no: 12, name: "Emergency CFRP Lining - PAP B Line", client: "Ma'aden PPC", location: "Ras Al-Khair", duration: "Feb 2018 - March 2018", value: "139,008", status: "Completed" },
  { no: 13, name: "CFRP Lining Services - PAP A Line", client: "Ma'aden PPC", location: "Ras Al-Khair", duration: "June 2018 - July 2018", value: "194,552", status: "Completed" },
  { no: 14, name: "Corrosion Protection using CFRP - PAP C Line", client: "Ma'aden PPC", location: "Ras Al-Khair", duration: "Dec 2018 - Jan 2019", value: "223,635", status: "Completed" },
  { no: 15, name: "Additional CFRP Works - PAP C Line", client: "Ma'aden PPC", location: "Ras Al-Khair", duration: "April 2019 - May 2019", value: "211,573", status: "Completed" },
  { no: 16, name: "Fiberglass Trench Restoration with Protective Coating", client: "Saudi Irrigation Org (SIO)", location: "Al-Ahsa", duration: "May 2019 - Dec 2019", value: "1,542,725", status: "Completed" },
  { no: 17, name: "Corrosion Protection using CFRP - PAP B Line", client: "Ma'aden PPC", location: "Ras Al-Khair", duration: "Dec 2019 - Jan 2020", value: "265,152", status: "Completed" },
];

const keysAr = {
  pastProjectsTitle: "تاريخ المشاريع",
  pastProjectsDesc: "يعرض الجدول التالي نموذجاً من المشاريع التي نفذتها سلسلة الثقة بين عامي 2014 و2020 لدى عملاء صناعيين وحكوميين رائدين في الجبيل والخفجي ورأس الخير والأحساء، شملت أعمال تصحيح الأساسات، التبطين بألياف الكربون CFRP/FRP، والحماية من التآكل، وجميعها أُنجزت بالكامل ضمن المواصفات والجدول الزمني المتفق عليه.",
  tableHeaders: {
    no: "م",
    project: "المشروع",
    client: "العميل",
    location: "الموقع",
    duration: "المدة",
    value: "القيمة (ريال)",
    status: "الحالة"
  }
};

const keysEn = {
  pastProjectsTitle: "Project History",
  pastProjectsDesc: "The following table showcases a sample of projects executed by SILSILAT AL-THIQA between 2014 and 2020 for leading industrial and government clients in Jubail, Khafji, Ras Al-Khair, and Al-Ahsa. These include foundation remediation, CFRP/FRP lining, and corrosion protection—all completed fully within specifications and agreed timelines.",
  tableHeaders: {
    no: "No",
    project: "Project",
    client: "Client",
    location: "Location",
    duration: "Duration",
    value: "Value (SAR)",
    status: "Status"
  }
};

const advantagesAr = {
  title: "المزايا الرئيسية",
  points: [
    "حماية طويلة الأمد ضد الرطوبة والأملاح والعوامل الجوية، ومناسبة للبيئات الصناعية والبحرية عالية التآكل.",
    "تخفيض تكاليف الصيانة وإطالة العمر التشغيلي للأصول مقارنة بأنظمة الحماية التقليدية.",
    "سرعة التطبيق مع الحد الأدنى من تجهيز الأسطح، مما يقلل فترات التوقف والتكاليف التشغيلية.",
    "مرونة عالية تسمح بالفحص والصيانة وإعادة التطبيق دون إتلاف المكونات أو تعطيل التشغيل.",
    "مثالية لحماية الفلانشات والبراغي والصمامات وخطوط الأنابيب والمعدات الصناعية، مع اعتماد بيئي كامل وخلوها من المركبات العضوية المتطايرة (VOC Free)."
  ]
};

const advantagesEn = {
  title: "Key Advantages",
  points: [
    "Long-term protection against moisture, salts, and weathering, suitable for highly corrosive industrial and marine environments.",
    "Reduced maintenance costs and extended operational life of assets compared to traditional protection systems.",
    "Fast application with minimal surface preparation, reducing downtime and operational costs.",
    "High flexibility allowing for inspection, maintenance, and re-application without damaging components or disrupting operations.",
    "Ideal for protecting flanges, bolts, valves, pipelines, and industrial equipment, fully environmentally certified and VOC-free."
  ]
};

const aboutIntroAr = {
  body1: "نُنفّذ أعمال الإصلاح للمنشآت الخرسانية والحديدية وأنابيب العمليات باستخدام مواد الإيبوكسي وتقنيات ألياف الكربون والألياف الزجاجية المتقدمة وحقن الخرسانة وأنظمة الطلاء الصناعي.",
  body2: "نتعاون مع شركات دولية ومحلية في الهندسة المدنية وصيانة المنشآت والإنشاءات — لنقل التقنية والتدريب والدعم الفني إلى القطاع الصناعي في المملكة."
};

const aboutIntroEn = {
  body1: "We execute repair works for concrete and steel structures and process pipelines using advanced epoxy materials, carbon fiber, fiberglass technologies, concrete injection, and industrial coating systems.",
  body2: "We collaborate with international and local companies in civil engineering, facility maintenance, and construction — to transfer technology, training, and technical support to the industrial sector in the Kingdom."
};

// Update AR
updateJSONNested('src/i18n/ar.json', 'projects', 'historyTable', projectsAr);
updateJSONNested('src/i18n/ar.json', 'projects', 'historyKeys', keysAr);
updateJSONNested('src/i18n/ar.json', 'services', 'advantages', advantagesAr);
updateJSONNested('src/i18n/ar.json', 'about', 'body1', aboutIntroAr.body1);
updateJSONNested('src/i18n/ar.json', 'about', 'body2', aboutIntroAr.body2);

// Update EN
updateJSONNested('src/i18n/en.json', 'projects', 'historyTable', projectsEn);
updateJSONNested('src/i18n/en.json', 'projects', 'historyKeys', keysEn);
updateJSONNested('src/i18n/en.json', 'services', 'advantages', advantagesEn);
updateJSONNested('src/i18n/en.json', 'about', 'body1', aboutIntroEn.body1);
updateJSONNested('src/i18n/en.json', 'about', 'body2', aboutIntroEn.body2);

console.log('Translations successfully updated!');
