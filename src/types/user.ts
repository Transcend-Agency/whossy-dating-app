export type User = {
  bio?: string | null;
  date_of_birth?: {nanoseconds: number, seconds: number};
  created_at?: Date;
  currentLocation: string | null;
  distance?: number | null;
  drink?: number | null;
  education?: number | null;
  love_language?: number | null;
  meet?: number | null;
  pets?: string | null[];
  photos?: string[] | null;
  preference?: number | null;
  smoke?: number | null;
  workout?: number | null;
  auth_provider?: string | null;
  country_of_origin?: string | null;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  gender?: string | null;
  has_completed_account_creation?: boolean;
  has_completed_onboarding?: boolean;
  phone_number?: string | null;
  uid?: string | null;
  weight?: number | null;
  height?: number | null;
  religion?: number | null;
  interests?: string[] | null
  is_verified?: boolean;
  status?: {
    online: boolean;
    lastSeen: number;
  }
  state?: string;
  family_goal?: number;
  marital_status?: number;
  zodiac?: number;
  read_receipts?: boolean;
  incoming_messages?: boolean;
  public_search?: boolean;
}

export type UserPrefences = {
  bio?: string;
  date_of_birth?: {nanoseconds: number, seconds: number};
  distance?: number;
  drink?: number;
  education?: number;
  interests?: string[];
  height?: number;
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
  weight?: number
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
  family_goal?: number;
  family_plans?: number;
  gender?: string;
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
  workout?: number;
  zodiac?: number;
};

export type UserProfile = User | UserFilters | UserPrefences;

