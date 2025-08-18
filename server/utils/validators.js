export function validateRegisterInput(username, email, password) {
  const errors = {};

  if (typeof username !== 'string' || username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (typeof email !== 'string' || email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!regEx.test(email)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (typeof password !== 'string' || password.trim() === '') {
    errors.password = 'Password must not be empty';
  }
  // If you later add confirmPassword, validate it here
  // else if (password !== confirmPassword) {
  //   errors.confirmPassword = 'Passwords must match';
  // }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

export function validateLoginInput(username, password) {
  const errors = {};

  if (typeof username !== 'string' || username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (typeof password !== 'string' || password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}