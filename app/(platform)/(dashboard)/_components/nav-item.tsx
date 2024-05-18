"use client"

import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";

import {
    Activity,
    CreditCard,
    Layout,
    Settings
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
    id: string;
    name: string;
    imageUrl: string;
    slug: string;
}

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id: string) => void;
}

export const NavItem = ({
    isExpanded,
    isActive,
    organization,
    onExpand }: NavItemProps) => {

    const router = useRouter();
    const pathname = usePathname();
    const routes = [
        {
            label: 'Boards',
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`
        },
        {
            label: 'Activity',
            icon: <Activity className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/Activity`
        },
        {
            label: 'Billings',
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/billing`
        },
        {
            label: 'Settings',
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/settings`
        }
    ]

    const onClick = (href: string) => {
        router.push(href)
    }


    return (
        <AccordionItem
            value={organization.id}
            className="border-none"
        >
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn(
                    "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700")}>
                <div className="flex items-center gap-x-2">
                    <div className="w-7 h-7 relative">
                        <Image
                            src={organization.imageUrl}
                            alt={organization.name}
                            fill
                            className="object-cover">

                        </Image>
                    </div>
                    <span className="font-medium text-sm">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className='pt-1 text-neutral-700'>
                {routes.map((route) => (
                    <Button
                        key={route.href}
                        onClick={() => onClick(route.href)}
                        variant='ghost'
                        size={'sm'}
                        className={cn(
                            'w-full font-normal justify-start pl-10 mb-1',
                            pathname === route.href && 'bg-sky-500/10 text-sky-700'
                        )}
                    >
                        {route.icon}
                        {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}

NavItem.Skeleton = function SkeletonNavItem(){
    return(
        <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 relative shrink-0">
                <Skeleton className ='h-full w-full absolute' />
            </div>
            <Skeleton className="h-10 w-full"/>
        </div>
    )
}