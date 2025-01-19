import { z } from 'astro:schema';

// Base Zod Schemas
export const WhySchema = z.object({
    why_id: z.string().uuid(),
    name: z.string().min(1),
    user_email: z.string().email(),
    created_at: z.number().int().positive(),
    is_deleted: z.number().min(0).max(1)
});

export const QASessionSchema = z.object({
    session_id: z.string().uuid(),
    why_id: z.string().uuid(),
    created_at: z.number().int().positive()
});

export const QAInteractionSchema = z.object({
    interaction_id: z.string().uuid(),
    session_id: z.string().uuid(),
    question: z.string().min(1),
    answer: z.string().min(1),
    sequence_number: z.number().int().nonnegative(),
    created_at: z.number().int().positive()
});

export const KeyPointTypeSchema = z.object({
    type_id: z.string().uuid(),
    name: z.string().min(1),
    description: z.string().nullable(),
    parent_type_id: z.string().uuid().nullable()
});

export const KeyPointSchema = z.object({
    key_point_id: z.string().uuid(),
    why_id: z.string().uuid(),
    type_id: z.string().uuid(),
    content: z.string().min(1),
    extracted_from_interaction_id: z.string().uuid(),
    created_at: z.number().int().positive()
});

// Input schemas for creating new records
export const NewWhySchema = WhySchema.omit({ 
    created_at: true, 
    is_deleted: true 
});

export const NewQAInteractionSchema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1)
});