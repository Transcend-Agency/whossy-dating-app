import { relationship_preferences } from '@/constants';
export type User = {
  bio?: string | null;
  date_of_birth?: {nanoseconds: number, seconds: number};
  created_at?: Date;
  location?: string | null;
  distance?: number | null;
  drink?: number | null;
  education?: number | null;
  love_language?: number | null;
  meet?: number | null;
  pets?: number | null[];
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
  hide_verification_badge?: boolean;
}

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
  pets?: number | null;
  preference?: number;
  religion?: number;
  similar_interest?: boolean;
  smoke?: number;
  weight_range?: { max: number; min: number };
  workout?: number;
  zodiac?: number;
};

export type AdvancedSearchPreferences = {
  age_range?: { max: number; min: number };
  gender?: string;
  relationship_preference?: number | null;
  height?: number;
  country?: string;
}

export type UserProfile = User | UserFilters;

