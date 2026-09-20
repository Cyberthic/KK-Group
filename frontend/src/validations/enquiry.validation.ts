/**
 * KK Group Enquiry Form Validation Module
 * Enforces Kerala/India 10-digit mobile number standards and form field validations.
 */

export interface PhoneValidationResult {
  isValid: boolean;
  title?: string;
  error?: string;
  cleanPhone: string;
}

export interface EnquiryFormInput {
  serviceName: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  location?: string;
  preferredDate?: string;
  message?: string;
}

export interface EnquiryValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof EnquiryFormInput, string>>;
  cleanData?: {
    serviceName: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    location?: string;
    preferredDate?: string;
    message: string;
  };
}

/**
 * Normalizes phone input by stripping country codes (+91 or 91), leading zeros, and punctuation.
 * Returns only digits.
 */
export function cleanMobileNumber(raw: string): string {
  if (!raw) return '';
  // Remove all non-digit characters
  let digits = raw.replace(/\D/g, '');

  // If starts with 91 and has 12 digits (+91-XXXXXXXXXX), strip 91
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  // If starts with 0 and has 11 digits (0XXXXXXXXXX), strip 0
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  return digits;
}

/**
 * Validates a 10-digit Indian mobile number.
 * Valid Indian mobile numbers are exactly 10 digits and start with 6, 7, 8, or 9.
 */
export function validateMobileNumber(
  phone: string,
  language: 'en' | 'ml' = 'en'
): PhoneValidationResult {
  const cleanPhone = cleanMobileNumber(phone);

  if (!cleanPhone) {
    return {
      isValid: false,
      title:
        language === 'ml'
          ? 'മൊബൈൽ നമ്പർ ആവശ്യമാണ്'
          : 'Mobile Number Required',
      error:
        language === 'ml'
          ? 'അന്വേഷണം രേഖപ്പെടുത്താൻ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക'
          : 'Please enter your 10-digit mobile number for crew dispatch updates.',
      cleanPhone: '',
    };
  }

  // Check if exactly 10 digits
  if (cleanPhone.length !== 10) {
    return {
      isValid: false,
      title:
        language === 'ml'
          ? '10 അക്ക മൊബൈൽ നമ്പർ വേണം'
          : '10-Digit Mobile Required',
      error:
        language === 'ml'
          ? `മൊബൈൽ നമ്പർ കൃത്യം 10 അക്കങ്ങൾ ആയിരിക്കണം (നിലവിൽ ${cleanPhone.length} അക്കങ്ങൾ നൽകിയിട്ടുണ്ട്).`
          : `Mobile number must be exactly 10 digits (currently ${cleanPhone.length} digits entered).`,
      cleanPhone,
    };
  }

  // Check if starts with valid Indian telecom prefix [6-9]
  if (!/^[6-9]/.test(cleanPhone)) {
    return {
      isValid: false,
      title:
        language === 'ml'
          ? 'അസാധുവായ മൊബൈൽ പ്രിഫിക്സ്'
          : 'Invalid Mobile Number',
      error:
        language === 'ml'
          ? 'ഇന്ത്യൻ മൊബൈൽ നമ്പറുകൾ 6, 7, 8, അല്ലെങ്കിൽ 9 ൽ തുടങ്ങേണ്ടതാണ്.'
          : 'Indian mobile numbers must begin with 6, 7, 8, or 9.',
      cleanPhone,
    };
  }

  // Check if all same digits (e.g. 0000000000, 9999999999) - optional sanity check
  if (/^(\d)\1{9}$/.test(cleanPhone)) {
    return {
      isValid: false,
      title:
        language === 'ml'
          ? 'സാധുവായ മൊബൈൽ നമ്പർ നൽകുക'
          : 'Invalid Phone Number',
      error:
        language === 'ml'
          ? 'ദയവായി യഥാർത്ഥവും സജീവവുമായ മൊബൈൽ നമ്പർ നൽകുക.'
          : 'Please enter a valid, active mobile number.',
      cleanPhone,
    };
  }

  return {
    isValid: true,
    cleanPhone,
  };
}

/**
 * Filters keyboard input to only allow digits up to 10 characters.
 */
export function sanitizePhoneInput(val: string): string {
  // Extract all digits
  const digits = val.replace(/\D/g, '');
  // Limit to 10 digits maximum
  return digits.slice(0, 10);
}

/**
 * Formats a 10-digit number for display: "98765 43210"
 */
export function formatPhoneNumber(val: string): string {
  const clean = cleanMobileNumber(val);
  if (clean.length <= 5) return clean;
  return `${clean.slice(0, 5)} ${clean.slice(5, 10)}`;
}

/**
 * Validates the full enquiry form data.
 */
export function validateEnquiryForm(
  data: EnquiryFormInput,
  language: 'en' | 'ml' = 'en'
): EnquiryValidationResult {
  const errors: Partial<Record<keyof EnquiryFormInput, string>> = {};

  // 1. Service Name
  if (!data.serviceName || !data.serviceName.trim()) {
    errors.serviceName =
      language === 'ml'
        ? 'സേവനം തിരഞ്ഞെടുക്കേണ്ടതാണ്'
        : 'Please select a service';
  }

  // 2. Customer Name
  if (!data.customerName || !data.customerName.trim()) {
    errors.customerName =
      language === 'ml' ? 'നിങ്ങളുടെ പേര് നൽകുക' : 'Please enter your name';
  } else if (data.customerName.trim().length < 2) {
    errors.customerName =
      language === 'ml'
        ? 'പേരിന് കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ വേണം'
        : 'Name must be at least 2 characters';
  }

  // 3. Mobile Number (Strict 10-digit validation)
  const phoneValidation = validateMobileNumber(data.customerPhone, language);
  if (!phoneValidation.isValid) {
    errors.customerPhone = phoneValidation.error;
  }

  // 4. Customer Email (Optional, but if provided must be valid)
  if (data.customerEmail && data.customerEmail.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.customerEmail.trim())) {
      errors.customerEmail =
        language === 'ml'
          ? 'ശരിയായ ഇമെയിൽ വിലാസം നൽകുക'
          : 'Please enter a valid email address';
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    cleanData: isValid
      ? {
          serviceName: data.serviceName.trim(),
          customerName: data.customerName.trim(),
          customerPhone: phoneValidation.cleanPhone,
          customerEmail: data.customerEmail?.trim() || undefined,
          location: data.location?.trim() || undefined,
          preferredDate: data.preferredDate?.trim() || undefined,
          message:
            data.message?.trim() ||
            `Service enquiry for ${data.serviceName.trim()}`,
        }
      : undefined,
  };
}
