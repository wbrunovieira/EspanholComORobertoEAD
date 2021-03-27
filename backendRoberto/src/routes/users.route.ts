import { Router } from 'express';

import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

interface User {
    name: string;
    password?: string;
    email: string;
}

usersRouter.post('/', async (request, response) => {
   try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: User = await createUser.execute({
        name,
        email,
        password,
    })

    delete user.password;

    return response.json(user );
   } catch(err) {
       return response.status(400).json({ error: err.message });
   }
})

export default usersRouter;