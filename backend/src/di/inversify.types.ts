const TYPES = {
  // Authentication types
  AuthService: Symbol.for("AuthService"),
  AuthController: Symbol.for("AuthController"),

  // User types
  UserRepository: Symbol.for("UserRepository"),
  UserService: Symbol.for("UserService"),
  UserController: Symbol.for("UserController"),
  UserValidator: Symbol.for("UserValidator"),

  // Profile types
  ProfileRepository: Symbol.for("ProfileRepository"),
  ProfileService: Symbol.for("ProfileService"),
  ProfileController: Symbol.for("ProfileController"),
  ProfileValidator: Symbol.for("ProfileValidator"),
};

export default TYPES;
