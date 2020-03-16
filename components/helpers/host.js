const host = process.env.build_env === 'development'
  ? process.env.react_app_api_url_local || 'http://localhost:5000/'
  : process.env.react_app_api_url || 'http://localhost:5000/'

export default host
