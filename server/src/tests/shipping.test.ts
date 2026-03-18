import { calculateShipping } from '../utils/shipping';

describe('Shipping Calculator - Tests Fonctionnels (Catalog-Based)', () => {
  
  // 1. Nos cas valides (On teste les frontières exactes)
  const validCases = [
    // [distance, poids, type, resultat_attendu, description]
    [0, 5, 'standard', 10, 'Distance 0 km -> Prix 10€ (standard)'],
    [50, 5, 'standard', 10, 'Distance 50 km -> Prix 10€ (standard)'],
    [51, 5, 'standard', 25, 'Distance 51 km -> Prix 25€ (standard)'],
    [500, 5, 'standard', 25, 'Distance 500 km -> Prix 25€ (standard)'],
    [501, 5, 'standard', 50, 'Distance 501 km -> Prix 50€ (standard)'],
    [10, 9, 'standard', 10, 'Poids 9 kg -> Prix 10€ (standard)'],
    [10, 10, 'standard', 15, 'Poids 10 kg -> Prix 15€ (standard)'], 
    [10, 50, 'standard', 15, 'Poids 50 kg -> Prix 15€ (standard)'],
  ];

  it.each(validCases)(
    'Distance %i km, Poids %i kg (%s) -> Doit coûter %i€', 
    (distance, weight, type, expectedResult, description) => {
      const result = calculateShipping(
        distance as number, 
        weight as number, 
        type as 'standard' | 'express'
      );
      expect(result).toBe(expectedResult);
    }
  );

  // 2. Nos cas d'erreurs (Les entrées invalides)
  const errorCases = [
    // [distance, poids, type, description]
    [-1, 5, 'standard', 'Entrée invalide (-1, 5) doit lever une erreur'],
    [10, 0, 'standard', 'Entrée invalide (10, 0) doit lever une erreur'],
    [10, -5, 'standard', 'Entrée invalide (10, -5) doit lever une erreur'],
    [10, 51, 'standard', 'Entrée invalide (10, 51) doit lever une erreur'],
  ];

  it.each(errorCases)(
    'Entrée invalide: distance %i km, poids %i kg -> Doit lever une erreur',
    (distance, weight, type, description) => {
      expect(() => {
        calculateShipping(
          distance as number, 
          weight as number, 
          type as 'standard' | 'express'
        );
      }).toThrow(); 
    }
  );

  // 3. Tests N-Wise (Pairwise Combinations)
  const pairwiseCases = [
    // [Distance, Poids, Type, Résultat_Attendu]
    [25, 5, 'standard', 10],     // 1. Courte, Léger, Standard
    [25, 40, 'express', 30],     // 2. Courte, Lourd, Express
    [200, 2, 'express', 50],     // 3. Moyenne, Léger, Express
    [200, 20, 'standard', 37.5], // 4. Moyenne, Lourd, Standard
    [600, 5, 'express', 100],    // 5. Longue, Léger, Express
    [600, 40, 'standard', 75],   // 6. Longue, Lourd, Standard
  ];

  describe('2. Pairwise Combinations', () => {
    it.each(pairwiseCases)(
      'Scénario: %i km, %i kg, %s -> Total %i €',
      (distance, weight, type, expectedResult) => {
        const result = calculateShipping(
          distance as number,
          weight as number,
          type as 'standard' | 'express'
        );
        expect(result).toBe(expectedResult);
      }
    );
  });

});