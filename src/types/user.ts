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
  education?: number;
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
  family_goal?: number;
  religion?: number;
  pet_owner?: number;
};

export type UserFilters = {
  age_range?: { max: number; min: number };
  city?: string;
  distance?: number;
  communication_style?: number;
  country?: string;
  dietary?: number;
  drink?: number;
  education?: number;
  family_goals?: number;
  family_plans?: number;
  has_bio?: boolean;
  height_range?: { max: number; min: number };
  interests?: string[];
  marital_status?: number;
  love_language?: number;
  meet?: number;
  outreach?: boolean;
  pet_owner?: number;
  preference?: number;
  religion?: number;
  similar_interest?: boolean;
  smoke?: number;
  weight_range?: { max: number; min: number };
  workout: number;
  zodiac: number;
};

export type UserProfile = User | UserFilters | UserPrefences;