import * as Yup from 'yup'
import { CustomError } from './customError.js'

const UserLoginSchema =Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
})
export const validateUserLogin=async(inputs, next) => {
    try {
    const validation = await UserLoginSchema.validate(inputs)
    } catch(e){
        throw new CustomError(e.message, 400)
    }
}