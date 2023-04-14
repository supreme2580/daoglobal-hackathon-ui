export function truncateAddress(address: string, start = 4, end = 4) {
  const match = address.match(
    `^(0x[a-zA-Z0-9]{${start}})[a-zA-Z0-9]+([a-zA-Z0-9]{${end}})$`
  );
  if (!match) return address;

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${match[1]}…${match[2]}`;
}
