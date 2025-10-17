import {check,validationResult} from "express-validator";

const validateRegistration= async (req,res,next) => {
  await check("full_name")
  .isString()
  .withMessage("Name should be a string")
  .isLength({min:3})
  .withMessage("Name is too small")
  .run(req);
  await check("email")
  .isLength({min:5})
  .contains('@')
  .withMessage("email should be at least 5 characters long with an '@' symbol")
  .run(req);
  await check("password")
  .isLength({min:8})
  .withMessage("Password should be at least 8 characters long")
  .run(req);

  const result=validationResult(req);
  if (result.errors.length){
    res.send(result.errors);
  }else{
    next();
  }
}
const validateLogin=async (req,res,next) => {
  await check("email")
  .isLength({min:5})
  .contains('@')
  .withMessage("email should be at least 5 characters long with an '@' symbol")
  .run(req);
  await check("password")
  .isLength({min:8})
  .withMessage("Password should be at least 8 characters long")
  .run(req);

  const result=validationResult(req);
  if (result.errors.length){
    res.send(result.errors);
  }else{
    next();
  }
}

export  {validateRegistration,validateLogin}