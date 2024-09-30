export interface Like {
    liker_id: string;
    liked_id: string;
    timestamp: string;
}

export interface Match {
    user1_id: string,
    user2_id: string,
    match_timestamp: string,
}