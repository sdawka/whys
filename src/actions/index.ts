import { defineAction, ActionError } from 'astro:actions';

export const server = {
  getUserWhys: defineAction({
    handler: async (_input, context) => {
        if (!context.locals.currentUser) {
            throw new ActionError({ code: 'UNAUTHORIZED' });
        }
        // get user whys from D1
        const ps = context.locals.runtime.env.DB.prepare("SELECT * from users");
        const data = await ps.first();
        return data;
    }
  })
}