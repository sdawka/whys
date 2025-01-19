import { defineAction, ActionError } from 'astro:actions';
import { WhySchema } from '../lib/schemas';

export const getUserWhys = defineAction({
    handler: async (_input, context) => {
        if (!context.locals.currentUser) {
            throw new ActionError({ code: 'UNAUTHORIZED' });
        }
        const ps = context.locals.runtime.env.DB.prepare("SELECT * from whys WHERE user_email = ? AND is_deleted = 0");
        const data = await ps.bind(context.locals.currentUser.email).run();
        return data.results.map((row) => WhySchema.parse(row));
    }
});
