export const validateUserRegistration = (age: number, role: string, email: string): boolean => {
  if (age > 120) {
    throw new Error("Age invalide");
  }

  const rolesAutorises = ["admin", "user", "stagiaire"];
  if (!rolesAutorises.includes(role)) {
    throw new Error("Rôle invalide");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  if (age < 18) {
    if (role === "stagiaire") {
      return true;
    }
    return false;
  }
  return true;
};