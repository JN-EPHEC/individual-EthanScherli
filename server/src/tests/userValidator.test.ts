import { validateUserRegistration } from "../utils/userValidator";

describe("User Registration Validator - White Box Testing", () => {
  it("devrait lever une erreur si l'âge est supérieur à 120", () => {
    expect(() => {
      validateUserRegistration(121, "user", "test@ephec.be");
    }).toThrow("Age invalide");
  });
  it("devrait lever une erreur si le rôle n'est pas autorisé", () => {
    expect(() => {
      validateUserRegistration(25, "hacker", "test@ephec.be");
    }).toThrow("Rôle invalide");
  });
  it("devrait retourner false si l'email est invalide (sans @ ou domaine)", () => {
    const result = validateUserRegistration(40, "admin", "test.ephec.be");
    expect(result).toBe(false);
  });
  it("devrait accepter un mineur si son rôle est 'stagiaire'", () => {
    const result = validateUserRegistration(17, "stagiaire", "test@ephec.be");
    expect(result).toBe(true);
  });
  it("devrait refuser un mineur s'il n'est pas stagiaire", () => {
    const result = validateUserRegistration(17, "user", "test@ephec.be");
    expect(result).toBe(false);
  });
  it("devrait accepter un adulte avec un rôle et un email valides", () => {
    const result = validateUserRegistration(25, "user", "test@ephec.be");
    expect(result).toBe(true);
  });

});