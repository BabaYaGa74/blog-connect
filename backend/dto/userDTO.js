class UserDTO {
  constructor(name, username, email, password) {
    if (!name || !username || !email || !password) {
      throw new Error("All fields are required");
    }

    if (!this.isValidEmail(email)) {
      throw new Error("Invalid Email format");
    }

    this.name = name;
    this.usename = usename;
    this.email = email;
    this.password = password;
  }

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
}
