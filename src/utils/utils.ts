export const dateFormat = (date: string): string => {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en-US", { month: "long" }).format(d);
  const da = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(d);
  return `${da} ${mo} ${ye}`;
};

export function generateRandomNumber(): number {
  const maxDigits = 10;
  const randomNumber = Math.floor(Math.random() * Math.pow(10, maxDigits));
  return randomNumber;
}
