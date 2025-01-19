type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {
		isLoggedIn: boolean;
		currentUser: any;
	}
}

interface ImportMetaEnv {
	readonly SUPABASE_URL: string;
	readonly SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
