export default [
  {
    from: 'app/Controllers/http',
    to: 'src/interfaces/http/controllers'
  },
  {
    from: 'app/Middleware',
    to: 'src/interfaces/http/middlewares'
  },
  {
    from: 'app/Exceptions',
    to: 'src/interfaces/http/exceptions'
  },
  {
    from: 'app/Validators',
    to: 'src/interfaces/http/validators'
  },
  {
    from: 'app/Models',
    to: 'src/infra/database/models'
  },
  {
    from: 'app/Listeners',
    to: 'src/app/events'
  }
]
