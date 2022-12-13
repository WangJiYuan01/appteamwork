const https     =   require("https")
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export default (context) => {
    return {
      httpEndpoint: process.env.NODE_ENV === 'production' ? 'http://13.55.73.172:3001/graphql' : 'http://13.55.73.172:3001/graphql',
      // httpEndpoint: 'http://localhost:3001/graphql',
      httpLinkOptions: {
        fetchOptions:{agent:httpsAgent}
      },
      wsEndpoint: process.env.NODE_ENV === 'production' ? 'ws://13.55.73.172:3001/graphql': 'ws://13.55.73.172:3001/graphql',
      // wsEndpoint: 'ws://localhost:3001/graphql',
      persisting: true,
      websocketsOnly: true,
      includeNodeModules: true,
      ssr: true,
      getAuth: () => 'Basic  __idropship_aus_developer_X89',
    }
  }