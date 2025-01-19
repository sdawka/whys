import { ActionError, defineAction } from "astro:actions";
import { NewWhySchema } from "../lib/schemas";
import { v4 as uuidv4 } from "uuid";

export const startNewWhy = defineAction({
    handler: async (_, context) => {
        if (!context.locals.currentUser) {
            throw new ActionError({ code: "UNAUTHORIZED" });
        }
        const whyInput = NewWhySchema.parse({
            why_id: uuidv4(),
            user_email: context.locals.currentUser.email,
            name: "unknown"
        });
        try {
            await context.locals.runtime.env.DB.prepare(
                `INSERT INTO whys (why_id, user_email) 
                 VALUES (?, ?)`,
            )
                .bind(whyInput.why_id, whyInput.user_email)
                .run();
        } catch (error) {
            console.error(error);
            throw new ActionError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Couldn't insert new why",
            });
        }
        try {
            await context.locals.runtime.env.DB.prepare(
                `INSERT INTO qa_sessions (why_id, session_id) 
                 VALUES (?, ?)`,
            )
                .bind(whyInput.why_id, uuidv4())
                .run();
        } catch (error) {
            console.error(error);
            throw new ActionError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Couldn't insert new QA session",
            });
        }

        return {
            question: "What are you beginning and why?",
            answerInput: { type: "text", placeholder: "Say whatever you want" },
        };
    },
});
