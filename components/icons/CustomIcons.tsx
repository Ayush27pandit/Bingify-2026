export const Icons = {
    Sync: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" className="opacity-20" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
            <path d="M12 12l2-2" />
        </svg>
    ),
    Video: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <rect x="2" y="4" width="20" height="16" rx="4" className="opacity-20" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
        </svg>
    ),
    Users: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="9" cy="9" r="4" />
            <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M9 21v-2a4 4 0 0 1 7.28-2.73" />
            <circle cx="17" cy="10" r="3" className="opacity-50" />
        </svg>
    ),
    Content: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <rect x="2" y="3" width="20" height="18" rx="2" className="opacity-20" />
            <path d="M7 3v18" />
            <path d="M17 3v18" />
            <path d="M2 8h20" />
            <path d="M2 16h20" />
        </svg>
    ),
    Simplicity: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 2L2 22h20L12 2z" className="opacity-20" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
        </svg>
    ),
    Relationship: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 5 12 5" className="hidden" />
        </svg>
    ),
    Friends: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="8" cy="9" r="4" />
            <path d="M12 14c.26-.06.51-.13.76-.23" />
            <path d="M2 20v-1a5.96 5.96 0 0 1 3.55-5.5" />
            <circle cx="16" cy="13" r="4" />
            <path d="M22 21v-1a6 6 0 0 0-6-6c-1.25 0-2.4.38-3.35 1.02" />
        </svg>
    ),
    Couples: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 21s-8-5.5-8-12a8 8 0 0 1 16 0c0 6.5-8 12-8 12z" />
            <path d="M12 21s-8-5.5-8-12a8 8 0 0 1 16 0c0 6.5-8 12-8 12z" className="opacity-20" />
            <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
    ),
    Family: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <path d="M9 22V12h6v10" />
            <circle cx="12" cy="7" r="2" className="opacity-50" />
        </svg>
    ),
};
