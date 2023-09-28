const env = import.meta.env.REACT_APP_ENV
export const server = import.meta.env.REACT_APP_SERVER || ''

export const isProduction = env === 'production'
export const isDevelopment = env === 'development'
export const isLocal = !isProduction && !isDevelopment
