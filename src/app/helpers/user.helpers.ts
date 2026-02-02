export function normalizePhone(phone: string): string {
  // Elimina extensiones y símbolos, deja solo números
  return phone.replace(/[^0-9]/g, '');
}

export function normalizeWebsite(website: string): string {
  // Si no tiene protocolo, antepone "https://"
  if (!/^https?:\/\//i.test(website)) {
    return `https://${website}`;
  }
  return website;
}

export function isValidCompany(name: string): boolean {
  // Valida si contiene "Group", "Inc." o "LLC"
  return /(Group|Inc\.|LLC)/i.test(name);
}