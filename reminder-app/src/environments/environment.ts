export const environment = {
  appName: 'Reminder',
  production: false,
  backendUrl: 'http://localhost:8080/api',
  authUri: () => `${ environment.backendUrl }/auth`,
  notificationUri: () => `${ environment.backendUrl }/notification`,
  subscriptionUri: () => `${ environment.backendUrl }/subscription`,
  serverPublicKey: 'BO2qdBF5DhSEG-vLTm0XdfuPEfXfmiVomNIFOoTPfj8T2PRBbZd7LxOIAJbsbdwy-e8nUmLDcoy6fS03_bAbs08',
};
