import PageLink from "@/components/PageLink";
import { CalendarDaysIcon, CurrencyDollarIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";

export default async function HomePage() {
  const navigation = [
    { name: "אירועים", href: "/dashboard/events", description: "צפה בכל האירועים", Icon: CalendarDaysIcon },
    { name: "מתנדבים", href: "/dashboard/volunteers", description: "צפה בכל המתנדבים", Icon: UserIcon },
    { name: "משפחות", href: "/dashboard/families", description: "צפה בכל המשפחות", Icon: UserGroupIcon },
    { name: "תורמים", href: "#", description: "צפה בכל התורמים", Icon: CurrencyDollarIcon },
  ];

  return (
    <main>
      <div className="md:grid grid-cols-2 gap-4 space-y-4 md:space-y-0">
        { navigation.map((nav) => {
          const { name, href, description, Icon } = nav;

          return (
            <PageLink
              key={ name }
              name={ name }
              href={ href }
              description={ description }
              Icon={ Icon }
            />
          );
        }) }
      </div>
    </main>
  );
}
