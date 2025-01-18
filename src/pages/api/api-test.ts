export async function GET({ params, request, locals }: { params: any; request: Request; locals: any }) {
    const {MY_TEST_KV} = locals.runtime.env;
    const value = await MY_TEST_KV.get("test");
    return new Response(
        JSON.stringify({ message: "Hello from the API!",
            value: value
         }),
    );
}
