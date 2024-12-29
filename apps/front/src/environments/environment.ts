export const environment = {
  appName: 'Reminder',
  production: false,
  backendUrl: 'http://localhost:4006/api',
  notificationUri: () => `${ environment.backendUrl }/notification`,
  serverPublicKey: 'BO2qdBF5DhSEG-vLTm0XdfuPEfXfmiVomNIFOoTPfj8T2PRBbZd7LxOIAJbsbdwy-e8nUmLDcoy6fS03_bAbs08',
};
