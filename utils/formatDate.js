/**
 * format date to human language
 * @function
 * @param dateStr {string} like 'Sat Sep 01 2018 14:53:26 GMT+1400 (LINT)'
 * @param formatStr {string} like 'hh:mm'
 * @param lang {string} like 'en_US' or 'id_ID', to override language used
 * @return {string} like '2018-08-08 12 February'
 * @example
 * formatDate(new Date(),'DD MMMM') ---> 12 February
 */
export const formatDate = (dateStr, formatStr, lang = ``) => {
  const language = `id_ID`;
  const d = new Date(dateStr);
  if (toString.call(d) !== `[object Date]` || isNaN(d.getTime())) {
    return dateStr;
  }

  const months = {
    en_US: [
      `January`,
      `February`,
      `March`,
      `April`,
      `May`,
      `June`,
      `July`,
      `August`,
      `September`,
      `October`,
      `November`,
      `December`,
    ],
    id_ID: [
      `Januari`,
      `Februari`,
      `Maret`,
      `April`,
      `Mei`,
      `Juni`,
      `Juli`,
      `Agustus`,
      `September`,
      `Oktober`,
      `November`,
      `Desember`,
    ],
  };
  const monthsShort = {
    en_US: [
      `Jan`,
      `Feb`,
      `Mar`,
      `Apr`,
      `May`,
      `Jun`,
      `Jul`,
      `Aug`,
      `Sep`,
      `Oct`,
      `Nov`,
      `Dec`,
    ],
    id_ID: [
      `Jan`,
      `Feb`,
      `Mar`,
      `Apr`,
      `Mei`,
      `Jun`,
      `Jul`,
      `Agu`,
      `Sep`,
      `Okt`,
      `Nov`,
      `Des`,
    ],
  };
  const weekdays = {
    en_US: [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`],
    id_ID: [`Min`, `Sen`, `Sel`, `Rab`, `Kam`, `Jum`, `Sab`],
  };

  const weekdaysLong = {
    en_US: [
      `Sunday`,
      `Monday`,
      `Tuesday`,
      `Wednesday`,
      `Thursday`,
      `Friday`,
      `Saturday`,
    ],
    id_ID: [`Minggu`, `Senin`, `Selasa`, `Rabu`, `Kamis`, `Jumat`, `Sabtu`],
  };

  const obj = {
    YYYY: d.getFullYear(),
    YY: d.getFullYear().toString().substr(-2),
    dd: weekdays[language][d.getDay()],
    ddd: weekdaysLong[language][d.getDay()],
  };

  const MM = d.getMonth() + 1;
  obj.MM = (MM > 9 ? `` : `0`) + MM;
  obj.MMM = monthsShort[language][d.getMonth()];
  obj.MMMM = months[language][d.getMonth()];

  const DD = d.getDate();
  obj.DD = (DD > 9 ? `` : `0`) + DD;

  const hh = d.getHours();
  obj.hh = (hh > 9 ? `` : `0`) + hh;

  const mm = d.getMinutes();
  obj.mm = (mm > 9 ? `` : `0`) + mm;

  const ss = d.getSeconds();
  obj.ss = (ss > 9 ? `` : `0`) + ss;

  let str = formatStr;
  const order = [
    `YYYY`,
    `YY`,
    `MMMM`,
    `MMM`,
    `MM`,
    `DD`,
    `ddd`,
    `dd`,
    `hh`,
    `mm`,
    `ss`,
  ];
  order.forEach((key) => {
    str = str.replace(key, obj[key]);
  });

  return str;
};
