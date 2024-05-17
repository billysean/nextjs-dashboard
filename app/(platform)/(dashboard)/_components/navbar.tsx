import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { NavItem } from "./nav-item"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
    return (
        <div className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
            {/* TODO: Mobile Responsivity */}
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    {/* LOGO HERE */}
                    NLAK
                </div>
                <Button size={"sm"} className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                    Create
                </Button>
                <Button size={"sm"} className="rounded-sm block md:hidden px-2">
                    <Plus />
                </Button>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectOrganizationUrl="/organization/:id"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }
                        }
                    }} />
                <UserButton afterSignOutUrl="/sign-in"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30
                            }
                        }
                    }} />
            </div>
        </div>

    )
}

