import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const processAnswer = defineAction({
    accept: "form",
    input: z.object({
        question: z.string(),
        answer: z.string(),
    }),
    handler: async ({ question, answer }) => {

        // store interaction
        // extract key points
        // store key points
        // next step

        return {
            isDone: false,
            question: "What would happen if you don't do it?",
            answerInput: { type: "checkbox", options:["Explode", "Nothing"] },
        };
    },
});
