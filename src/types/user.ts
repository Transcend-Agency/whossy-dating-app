export type User = {
  auth_provider?: string;
  country_of_origin?: string;
  first_name?: string;
  gender?: string;
  has_completed_account_creation?: boolean;
  has_completed_account_onboarding?: boolean;
  last_name?: string;
  phone_number?: string;
  email?: string;
};

export type UserPrefences = {
  bio?: string;
  date_of_birth?: string;
  distance?: number;
  drink?: number;
  education?: string;
  interests?: string[];
  meet?: number;
  pets?: string;
  photos?: string[];
  preference?: number;
  smoke?: number;
  workout?: number;
  marital_status?: number;
  love_language?: number;
  zodiac?: number;
  family_goals?: number;
  religion?: number;
  pet_owner?: number;
};
