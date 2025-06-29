import type { Country } from 'react-phone-number-input';

interface IpApiResponse {
  country_code: string;
}

export const detectUserCountry = async (): Promise<Country> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data: IpApiResponse = await response.json();
    return data.country_code as Country;
  } catch (error) {
    console.warn('Erro ao detectar país:', error);
    return 'BR' as Country; // Fallback para Brasil em caso de erro
  }
}; 