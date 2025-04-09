export const dateFormatter = (date: string) => {
  return new Date(date).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const dateFormatterWithToday = (date: string) => {
  const inputDate = new Date(date);
  const today = new Date();

  if (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  ) {
    return 'Today';
  }

  return dateFormatter(date);
};

export const timeFormatter = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Africa/Lagos',
  });
};

export function priceFormatter(price: number, showKobo: boolean = false): string {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: showKobo ? 2 : 0,
    maximumFractionDigits: showKobo ? 2 : 0,
  });

  return formatter.format(price);
}
