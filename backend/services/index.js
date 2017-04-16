module.exports = {
  Projects: {
    create: require('./projects/CreateProjectInterceptor'),
    get: require('./projects/GetProjectInterceptor'),
    update: require('./projects/UpdateProjectInterceptor'),
    delete: require('./projects/DeleteProjectInterceptor')
  }
};
