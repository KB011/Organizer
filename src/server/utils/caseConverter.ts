import camelcaseKeys from 'camelcase-keys';

export const toCamelCase = <T>(prismaResponse: any): T => {
  return camelcaseKeys(prismaResponse, { deep: true }) as T;
};
