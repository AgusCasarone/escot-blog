/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsEmail({}, { message: 'El correo es inválido' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    readonly password: string;
}