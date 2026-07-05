import fs from 'fs';

const addTranslations = (file, dataToAdd) => {
  const content = fs.readFileSync(file, 'utf-8');
  const json = JSON.parse(content);
  if (!json.about) json.about = {};
  json.about.board = dataToAdd;
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

const arData = {
  title: "مجلس الإدارة",
  members: [
    {
      name: "يوسف الناجم",
      title: "عضو مجلس الإدارة، جهة التواصل المخولة بالتواصل لمادة الاكسفري Oxifree TM198",
      phone: "+966 56 119 4438",
      email: "Najem@silsilat-sa.com",
      imageId: "image1"
    },
    {
      name: "عبدالعزيز السردي",
      title: "عضو مجلس الإدارة، جهة التواصل المخولة لمادة ألياف الكربون (Carbon Fiber)",
      phone: "+966 56 097 6454",
      email: "alsardi@silsilat-sa.com",
      imageId: "image0"
    },
    {
      name: "يوسف بوعبيد",
      title: "العضو المؤسس ورئيس مجلس الإدارة والرئيس التنفيذي",
      email: "yousef@silsilat-sa.com",
      imageId: "image2"
    }
  ],
  footer: "يضمن تخصيص جهات تواصل مخولة لكل من مادتي FRP وألياف الكربون استجابة فنية وتجارية سريعة ومباشرة لاستفسارات العملاء والشركاء المتعلقة بهذه المواد المتخصصة."
};

const enData = {
  title: "Board of Directors",
  members: [
    {
      name: "Yousef Al-Najem",
      title: "Board Member, Authorized Contact for Oxifree TM198",
      phone: "+966 56 119 4438",
      email: "Najem@silsilat-sa.com",
      imageId: "image1"
    },
    {
      name: "Abdulaziz Al-Sardi",
      title: "Board Member, Authorized Contact for Carbon Fiber",
      phone: "+966 56 097 6454",
      email: "alsardi@silsilat-sa.com",
      imageId: "image0"
    },
    {
      name: "Yousef Buobaid",
      title: "Founding Member, Chairman of the Board and CEO",
      email: "yousef@silsilat-sa.com",
      imageId: "image2"
    }
  ],
  footer: "The allocation of authorized contacts for both FRP and Carbon Fiber materials ensures a rapid and direct technical and commercial response to client and partner inquiries regarding these specialized materials."
};

addTranslations('src/i18n/ar.json', arData);
addTranslations('src/i18n/en.json', enData);
console.log("Translations added in new order.");
