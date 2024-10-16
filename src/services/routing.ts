
export type Locale = 'en' | 'es' | undefined;
export const locales: Locale[] = ['en', 'es'];

export type Page = 'blog' | 'projects';
export const pages: Page[] = ['blog', 'projects'];


// Generates links for links into index components
export const generateLink = (page: Page, slug: string, pathname: string, locale: Locale): string => {

	if ( pathname.endsWith('/') ) {
		pathname = pathname.slice(0, -1);
	}

	if (pathname.startsWith(`/${locale}`)) {
		return `${pathname}/${page}/${slug}`;
	}

	return `/${locale}/${page}/${slug}`;
}