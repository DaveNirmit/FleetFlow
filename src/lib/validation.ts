import { UserRole } from '@/types';

export const passwordRules = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecial: /[!@#$%^&*(),.?":{}|<>]/,
};

export const validatePassword = (pw: string) => {
  const checks = [
    { label: 'Min 8 characters', pass: pw.length >= 8 },
    { label: '1 uppercase letter', pass: passwordRules.hasUppercase.test(pw) },
    { label: '1 lowercase letter', pass: passwordRules.hasLowercase.test(pw) },
    { label: '1 number', pass: passwordRules.hasNumber.test(pw) },
    { label: '1 special character', pass: passwordRules.hasSpecial.test(pw) },
  ];
  return checks;
};

export const getPasswordStrength = (pw: string): { label: string; percent: number; color: string } => {
  const checks = validatePassword(pw);
  const passed = checks.filter(c => c.pass).length;
  if (passed <= 1) return { label: 'Weak', percent: 20, color: 'bg-destructive' };
  if (passed <= 2) return { label: 'Fair', percent: 40, color: 'bg-warning' };
  if (passed <= 3) return { label: 'Good', percent: 60, color: 'bg-info' };
  if (passed <= 4) return { label: 'Strong', percent: 80, color: 'bg-accent' };
  return { label: 'Very Strong', percent: 100, color: 'bg-success' };
};

export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const ROLES: UserRole[] = ['Fleet Manager', 'Fleet Dispatcher', 'Fleet Safety Officer', 'Fleet Analyst'];
