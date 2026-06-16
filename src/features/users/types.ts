export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string | null;
  userType: string;
  merchantId: string | null;
  merchantName: string | null;
  clientOrganizationId: string | null;
  clientOrganizationName: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  dateOfBirth: string | null;
  gender: "male" | "female" | "other" | "prefer_not_to_say" | null;
  preferredLanguage: string | null;
  marketingOptIn: boolean;
  totalRedemptions: number;
  totalSavings: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
