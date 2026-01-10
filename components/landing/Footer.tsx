import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#09090B] py-12">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-white">
                                <div className="grid grid-cols-2 gap-0.5">
                                    <div className="h-1 w-1 rounded-full bg-black" />
                                    <div className="h-1 w-1 rounded-full bg-black" />
                                    <div className="h-1 w-1 rounded-full bg-black" />
                                    <div className="h-1 w-1 rounded-full bg-black" />
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-white italic">Bingify</span>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Watch movies and shows together, <br />even when you're apart.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-zinc-500">
                            <li><Link href="#" className="hover:text-white transition-colors">Download</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Docs</Link></li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Community</h4>
                        <ul className="space-y-3 text-sm text-zinc-500">
                            <li><Link href="#" className="hover:text-white transition-colors">Discord</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-zinc-500">
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
                    <div className="text-sm text-zinc-600 mb-4 md:mb-0">
                        © {new Date().getFullYear()} Bingify. All rights reserved.
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Twitter className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Github className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Linkedin className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
