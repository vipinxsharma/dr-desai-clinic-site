import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResourcesView } from "@/components/ResourcesView";
import { RESOURCES, resourcesVisible } from "@/config/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources | Dr. Desai's Health Clinic and Diabetes Center",
  description: "Videos, articles, gallery and documents from Dr. Desai's Health Clinic and Diabetes Center, Kanjurmarg East, Mumbai.",
  path: "/resources",
});

export default function ResourcesPage() {
  if (!resourcesVisible(RESOURCES)) notFound();
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }]} />
      <ResourcesView resources={RESOURCES} />
    </>
  );
}
