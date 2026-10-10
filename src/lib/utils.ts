export function toBengaliNumber(val: number | string | undefined | null): string {
  if (val === undefined || val === null) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return val.toString().replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

export function formatPriceWithCommas(num: number): string {
  const parts = num.toString().split('.');
  let intPart = parts[0];
  const decPart = parts.length > 1 ? '.' + parts[1] : '';

  if (intPart.length > 3) {
    const last3 = intPart.substring(intPart.length - 3);
    const rest = intPart.substring(0, intPart.length - 3);
    intPart = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
  }
  return toBengaliNumber(intPart + decPart);
}

export function getUnitLabelBn(unit: string): string {
  switch (unit?.toLowerCase()) {
    case 'kg':
      return 'প্রতি কেজি';
    case 'litre':
      return 'প্রতি লিটার';
    case 'dozen':
      return 'প্রতি ডজন';
    case 'piece':
      return 'প্রতি পিস';
    default:
      return `প্রতি ${unit || 'একক'}`;
  }
}

export function getUnitShortBn(unit: string): string {
  switch (unit?.toLowerCase()) {
    case 'kg':
      return 'কেজি';
    case 'litre':
      return 'লিটার';
    case 'dozen':
      return 'ডজন';
    case 'piece':
      return 'পিস';
    default:
      return unit || 'একক';
  }
}

export function formatBanglaDateFromDate(date: Date): string {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  
  const dayName = days[date.getDay()];
  const dayNum = toBengaliNumber(date.getDate());
  const monthName = months[date.getMonth()];
  const yearNum = toBengaliNumber(date.getFullYear());
  
  return `${dayName}, ${dayNum} ${monthName}, ${yearNum}`;
}

export function formatPriceNumber(num: number): string {
  if (Number.isInteger(num)) {
    return toBengaliNumber(num);
  }
  const formatted = num.toFixed(2);
  return toBengaliNumber(formatted.endsWith('.00') ? Math.round(num) : formatted.replace(/0$/, '০'));
}
