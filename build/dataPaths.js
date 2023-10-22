"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        from: 'app/controllers/http',
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
    }
];
