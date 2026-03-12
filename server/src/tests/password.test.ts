import { validatePassword } from "../utils/password";
describe("Password Validator - White Box Testing", () => {
// Test initial pour initialiser le rapport de couverture
// Ce test ne couvre que la première ligne de la fonction (Branch 1)
    it("devrait rejeter un mot de passe vide", () => {
        const result = validatePassword("", 25);
        expect(result).toBe(false);
    });

    it("Devrait rejeter un mdp de moins de 8 caractères", () => {
        const result = validatePassword("abcdefg",25);
        expect(result).toBe(false);
    });

    it("Devrait rejeter un mdp de plus de 20 caractères", () => {
        const result = validatePassword("abcdefghijklmnopqrstuvwxyz",25);
        expect(result).toBe(false);
    });

    it("Devrait rejeter un mdp d'enfant qui n'as pas de minuscules", () => {
        const result = validatePassword("NOLOWERCASE123!",10);
        expect(result).toBe(false);
    });

    it("Devrait accepter un mdp d'enfant qui n'as pas de majuscules", () => {
        const result = validatePassword("haslowercase123!",10);
        expect(result).toBe(true);
    });

    it("Devrait rejeter un mdp d'adulte qui n'as pas de minuscules", () => {
        const result = validatePassword("NOLOWERCASE123!",25);
        expect(result).toBe(false);
    });

    it("Devrait rejeter un mdp d'adulte qui n'as pas de majuscules", () => {
        const result = validatePassword("nouppercase123!",25);
        expect(result).toBe(false);
    });

    it("Devrait rejeter un mdp d'adulte qui n'as pas de chiffres", () => {
        const result = validatePassword("NoNumbersHere!",25);
        expect(result).toBe(false);
    });

    it("Devrait rejeter un mdp d'adulte qui n'as pas de caractères spécial", () => {
        const result = validatePassword("NoSpecialChar123",25);
        expect(result).toBe(false);
    });

    it("Devrait accepter un mdp d'adulte qui est parfait", () => {
        const result = validatePassword("PerfectPass123!",25);
        expect(result).toBe(true);
    });

    it("Devrait rejeter un mdp de senior qui n'as pas de chiffres ni de majuscules", () => {
        const result = validatePassword("onlylowercase!",70);
        expect(result).toBe(false);
    });

    it("Devrait accepter si chiffres mais pas de majuscules", () => {
        const result = validatePassword("onlylower123!", 70);
        expect(result).toBe(true);
    });

    it("Devrait accepter si majuscules mais pas de chiffres", () => {
        const result = validatePassword("OnlyLower!", 70);
        expect(result).toBe(true);
    });

});