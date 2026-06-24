
import { LayoutSideContentLeft} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { LayoutGrid, Plus, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    {icon: User, href:"/dashboard/artist" , label: "Profile Management"},
    {icon: Plus, href:"/dashboard/artist/addArtwork" , label: "AddArtwork"},
    {icon: LayoutGrid, href:"/dashboard/artist/manageArtworks" , label: "ManageArtworks"},
    {icon: ShoppingBag, href:"/dashboard/artist/salesHistory" , label: "Sales History"},
  ];

  const navContents = <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    href={item.href}
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>

  return (
    <>
    <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContents}
    </aside>
     <Drawer>
      <Button className="lg:hidden" variant="secondary">
       <LayoutSideContentLeft />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {navContents}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </>
  );
}