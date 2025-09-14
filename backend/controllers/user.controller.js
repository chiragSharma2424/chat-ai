import User from "../models/user.model.js";
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator'

export const createUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const user = await userService.createUser(req.body);

        const token = await User.genratejwt()

        res.status(201).send(user);
    } catch(err) {
        res.status(400).send(err.message);
    }
}