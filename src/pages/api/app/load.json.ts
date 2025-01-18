import { supabase } from "../../../lib/supabase";
import type { APIContext } from 'astro';

export async function GET({ cookies, request, locals }: APIContext) {
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    return new Response(
      JSON.stringify({ message: "Not logged in!" }),
    );
  }
  let session;
  try {
    session = await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });
    if (session.error) {
      cookies.delete("sb-access-token", {
        path: "/",
      });
      cookies.delete("sb-refresh-token", {
        path: "/",
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Session error" }),
      { status: 401 }
    );
  }

  if (!session) {
    return new Response(
      JSON.stringify({ message: "No session" }),
      { status: 401 }
    );
  }

  const email = session.data.user?.email;
  // const { MY_TEST_KV } = locals.runtime.env;
  // const value = await MY_TEST_KV.get("test");
  return new Response(
    JSON.stringify({ message: "Hello from the API!", value: email }),
  );
}
