import { NextFunction, Request, Response } from 'express';
const fecha = new Date();

export function globalLogger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `${fecha.toLocaleDateString()} ${fecha.getHours()}:${fecha.getMinutes()}- Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`,
  );
  next();
}
