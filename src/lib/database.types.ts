export interface Why {
    why_id: string;
    name: string;
    user_email: string;
    created_at: number;
    is_deleted: number;
}

export interface QASession {
    session_id: string;
    why_id: string;
    created_at: number;
}

export interface QAInteraction {
    interaction_id: string;
    session_id: string;
    question: string;
    answer: string;
    sequence_number: number;
    created_at: number;
}

export interface KeyPointType {
    type_id: string;
    name: string;
    description: string | null;
    parent_type_id: string | null;
}

export interface KeyPoint {
    key_point_id: string;
    why_id: string;
    type_id: string;
    content: string;
    extracted_from_interaction_id: string;
    created_at: number;
}

// Utility type for creating new records
export type NewWhy = Omit<Why, 'created_at' | 'is_deleted'>;
export type NewQASession = Omit<QASession, 'created_at'>;
export type NewQAInteraction = Omit<QAInteraction, 'created_at'>;
export type NewKeyPoint = Omit<KeyPoint, 'created_at'>;

// Response types for common queries
export interface WhyWithKeyPoints extends Why {
    key_points: KeyPoint[];
}

export interface SessionWithInteractions extends QASession {
    interactions: QAInteraction[];
}

export interface WhyComplete extends Why {
    sessions: SessionWithInteractions[];
    key_points: KeyPoint[];
}

// Enums for base key point types
export enum BaseKeyPointType {
    Purpose = 'purpose',
    NegativePressure = 'negative_pressure',
    Direction = 'direction'
}