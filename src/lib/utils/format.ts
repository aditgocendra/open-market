export const toCapitalize = (str: string) => {
  return str.replace(/^./, str[0].toUpperCase());
};

export const toRupiahFormat = (value: number) => {
  return `Rp.${Intl.NumberFormat("id").format(value)}`;
};
