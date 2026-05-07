export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function toInputDate(dateString: string): string {
  return new Date(dateString).toISOString().split('T')[0];
}

export function getCurrentMonthRange(): { dateFrom: string; dateTo: string } {
  const now = new Date();
  const dateFrom = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const dateTo = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  return { dateFrom, dateTo };
}
