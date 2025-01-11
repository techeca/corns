import { ModeToggle } from "../ModeToggle";

export default function Navi() {

    return (
        <header className="sticky top-0 z-50">
            <nav className="relative">
                {/* Blur*/}
                <div className="absolute inset-0 bg-white/75 backdrop-blur-2xl dark:bg-neutral-950 opacity-20" aria-hidden="true"/>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 hover:cursor-pointer hover:scale-105 transition-scale duration-200 ease-in">
                            Bob’s corn
                        </h1>
                        <div>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}