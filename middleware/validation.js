import Joi from "joi";

export const registerValidation = (req, res, next) => {
  console.log(req.body.name);
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};



export const createPostValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: JoiHTML.html().required(),
    author: Joi.string().required(), 
    createdAt: Joi.date().default(() => new Date(), 'current date'),
    updatedAt: Joi.date().default(() => new Date(), 'current date'),
    summary: Joi.string().required(),
    mainImage: Joi.string().required(),
    published: Joi.boolean().default(true),
    images: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    comments: Joi.array().items(Joi.string())
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};