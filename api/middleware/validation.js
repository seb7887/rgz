exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'You must supply an email').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req.checkBody('passwordConfirm', 'Confirmed password cannot be blank').notEmpty();
  req.checkBody('passwordConfirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    return next({
      status: 400,
      message: 'Form validation error',
    });
  }
  next();
}

exports.validateSignin = (req, res, next) => {
  req.checkBody('email', 'You must supply an email').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password cannot be blank').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return next({
      status: 400,
      message: 'Form validation error',
    });
  }
  next();
}

exports.validateNewPwd = (req, res, next) => {
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req.checkBody('passwordConfirm', 'Confirmed password cannot be blank').notEmpty();
  req.checkBody('passwordConfirm', 'Oops! Your passwords do not match').equals(req.body.password);
  const errors = req.validationErrors();
  if (errors) {
    return next({
      status: 400,
      message: 'Form validation error',
    });
  }
  next();
}
