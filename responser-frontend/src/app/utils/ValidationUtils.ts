export type ValidationResult = {
    valid: boolean;
    errorMessage: string;
}

export const validateRequired = <T = any>(value: T, errorMessage?: string): ValidationResult => {
    return {
        valid: !!value,
        errorMessage: !value ? (errorMessage || "Value is required") : null
    }
}