const emailPostfix = '@mail.com';

export const generateRandomEmails = (num: number): string => {
  let emails = [];
  for (let i = 0; i < num; i++) {
    emails.push(`${i}${emailPostfix}`);
  }

  return emails.join(',');
}
