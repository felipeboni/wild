module.exports = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? '/api' // development api
            : '/api' // production api
    },
    future: {
        webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
          // Looks like backward compatibility approach.
      },
      webpack(config) {
        config.resolve.fallback = {
          ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
            // by next.js will be dropped. Doesn't make much sense, but how it is
          fs: false, // the solution
        };
    
        return config;
      },
}
