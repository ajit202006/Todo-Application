import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validateRegistration = async (req: Request, res: Response, next: NextFunction) => {
  await check("full_name")
    .isString()
    .withMessage("Name should be a string")
    .isLength({ min: 3 })
    .withMessage("Name is too small")
    .run(req);
  await check("email")
    .isLength({ min: 5 })
    .contains('@')
    .normalizeEmail()
    .withMessage("email should be at least 5 characters long with an '@' symbol")
    .run(req);
  await check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.send(result);
  } else {
    next();
  }
}
const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  await check("email")
    .isLength({ min: 5 })
    .contains('@')
    .withMessage("email should be at least 5 characters long with an '@' symbol")
    .run(req);
  await check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.send(result);
  } else {
    next();
  }
}

export { validateRegistration, validateLogin }