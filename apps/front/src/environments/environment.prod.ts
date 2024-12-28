export const environment = {
  appName: 'Reminder',
  production: true,
  backendUrl: 'https://reminder-api.alexandre-vernet.fr/api',
  notificationUri: () => `${ environment.backendUrl }/notification`,
  serverPublicKey: 'BO2qdBF5DhSEG-vLTm0XdfuPEfXfmiVomNIFOoTPfj8T2PRBbZd7LxOIAJbsbdwy-e8nUmLDcoy6fS03_bAbs08',
};
