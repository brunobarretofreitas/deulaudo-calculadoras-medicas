/**
 * Fetal Growth Calculations
 * Based on FMF/Barcelona references
 */

/**
 * Calculate Estimated Fetal Weight (EFW) using Hadlock formula
 * @param hc Head Circumference in mm
 * @param ac Abdominal Circumference in mm
 * @param fl Femur Length in mm
 * @returns EFW in grams
 */
export function calculateEFW(hc: number, ac: number, fl: number): number {
  // Convert mm to cm
  const hcCm = hc / 10;
  const acCm = ac / 10;
  const flCm = fl / 10;

  // Hadlock formula: log₁₀(EFW) = 1.326 - 0.00326×AC×FL + 0.0107×HC + 0.0438×AC + 0.158×FL
  const logEFW =
    1.326 - 0.00326 * acCm * flCm + 0.0107 * hcCm + 0.0438 * acCm + 0.158 * flCm;

  // Convert back to grams
  return Math.pow(10, logEFW);
}

/**
 * Calculate EFW percentile based on gestational age
 * @param efw Estimated Fetal Weight in grams
 * @param weeks Gestational age in weeks
 * @param days Additional days (0-6)
 * @returns Percentile (0-100)
 */
export function calculateEFWPercentile(
  efw: number,
  weeks: number,
  days: number
): number {
  // This is a simplified implementation
  // In a real application, you would use lookup tables or regression formulas
  // based on FMF/Barcelona reference data
  
  const gaDays = weeks * 7 + days;
  
  // Simplified percentile calculation - this should be replaced with actual reference data
  // For now, using a basic approximation
  // You would typically have a lookup table with percentiles for each GA
  
  // Placeholder: This needs to be replaced with actual FMF/Barcelona reference data
  // The actual implementation would use lookup tables or regression formulas
  return 50; // Placeholder - needs actual reference data
}

/**
 * Calculate UA-PI (Umbilical Artery Pulsatility Index) percentile
 * @param uaPi UA-PI value
 * @param weeks Gestational age in weeks
 * @param days Additional days (0-6)
 * @returns Percentile (0-100)
 */
export function calculateUAPIPercentile(
  uaPi: number,
  weeks: number,
  days: number
): number {
  // This is a simplified implementation
  // In a real application, you would use lookup tables based on FMF/Barcelona reference data
  
  const gaDays = weeks * 7 + days;
  
  // Placeholder: This needs to be replaced with actual FMF/Barcelona reference data
  // The actual implementation would use lookup tables with percentiles for each GA
  return 50; // Placeholder - needs actual reference data
}

/**
 * Calculate MCA-PI (Middle Cerebral Artery Pulsatility Index) percentile
 * @param mcaPi MCA-PI value
 * @param weeks Gestational age in weeks
 * @param days Additional days (0-6)
 * @returns Percentile (0-100)
 */
export function calculateMCAPIPercentile(
  mcaPi: number,
  weeks: number,
  days: number
): number {
  // This is a simplified implementation
  // In a real application, you would use lookup tables based on FMF/Barcelona reference data
  
  const gaDays = weeks * 7 + days;
  
  // Placeholder: This needs to be replaced with actual FMF/Barcelona reference data
  // The actual implementation would use lookup tables with percentiles for each GA
  return 50; // Placeholder - needs actual reference data
}

/**
 * Calculate CPR (Cerebroplacental Ratio)
 * @param mcaPi MCA-PI value
 * @param uaPi UA-PI value
 * @returns CPR value
 */
export function calculateCPR(mcaPi: number, uaPi: number): number {
  if (uaPi === 0) {
    return 0;
  }
  return mcaPi / uaPi;
}

/**
 * Calculate CPR percentile based on gestational age
 * @param cpr CPR value
 * @param weeks Gestational age in weeks
 * @param days Additional days (0-6)
 * @returns Percentile (0-100)
 */
export function calculateCPRPercentile(
  cpr: number,
  weeks: number,
  days: number
): number {
  // This is a simplified implementation
  // In a real application, you would use lookup tables based on FMF/Barcelona reference data
  
  const gaDays = weeks * 7 + days;
  
  // Placeholder: This needs to be replaced with actual FMF/Barcelona reference data
  // The actual implementation would use lookup tables with percentiles for each GA
  return 50; // Placeholder - needs actual reference data
}

/**
 * Clinical flags interface
 */
export interface ClinicalFlags {
  efw_p10: boolean; // EFW below 10th percentile
  efw_p3: boolean; // EFW below 3rd percentile
  uaPi_high: boolean; // UA-PI above 95th percentile
  mcaPi_low: boolean; // MCA-PI below 5th percentile
  cpr_low: boolean; // CPR below 5th percentile
}

/**
 * Calculate clinical flags based on percentiles
 * @param efwPercentile EFW percentile (0-100) or null
 * @param uaPiPercentile UA-PI percentile (0-100) or null
 * @param mcaPiPercentile MCA-PI percentile (0-100) or null
 * @param cprPercentile CPR percentile (0-100) or null
 * @returns Clinical flags object
 */
export function calculateClinicalFlags(
  efwPercentile: number | null,
  uaPiPercentile: number | null,
  mcaPiPercentile: number | null,
  cprPercentile: number | null
): ClinicalFlags {
  return {
    efw_p10: efwPercentile !== null && efwPercentile < 10,
    efw_p3: efwPercentile !== null && efwPercentile < 3,
    uaPi_high: uaPiPercentile !== null && uaPiPercentile > 95,
    mcaPi_low: mcaPiPercentile !== null && mcaPiPercentile < 5,
    cpr_low: cprPercentile !== null && cprPercentile < 5,
  };
}

