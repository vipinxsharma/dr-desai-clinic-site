import { CallButton, WhatsAppButton } from "@/components/Buttons";
import { hasResourceItems, type ResourceLink, type Resources } from "@/config/resources";

function LinkList({ id, heading, items }: { id: string; heading: string; items: ResourceLink[] }) {
  return (
    <section className="mt-8" aria-labelledby={id}>
      <h2 id={id} className="text-h2 font-bold">{heading}</h2>
      <ul className="fx-grid mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <li key={i.url} className="fx-card rounded-[10px] border border-line bg-white p-4">
            <h3 className="text-[18px] font-bold leading-snug">
              <a href={i.url} target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">{i.title}</a>
            </h3>
            {i.description && <p className="mt-1 text-copy text-body">{i.description}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Renders only non-empty sections; with no items at all, one "coming soon" line plus Call / WhatsApp. */
export function ResourcesView({ resources }: { resources: Resources }) {
  const empty = !hasResourceItems(resources);
  return (
    <section className="bg-cream py-10" aria-labelledby="resources-h1">
      <div className="container-page">
        <h1 id="resources-h1" className="fx-reveal text-center text-title font-bold">Resources</h1>
        {empty ? (
          <div className="mt-4 text-center">
            <p className="text-lead text-body">Resources are coming soon. For any question, call or WhatsApp the clinic.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <CallButton />
              <WhatsAppButton />
            </div>
          </div>
        ) : (
          <>
            {resources.videos.length > 0 && <LinkList id="videos-h" heading="Videos" items={resources.videos} />}
            {resources.articles.length > 0 && <LinkList id="articles-h" heading="Articles" items={resources.articles} />}
            {resources.gallery.length > 0 && (
              <section className="mt-8" aria-labelledby="gallery-h">
                <h2 id="gallery-h" className="text-h2 font-bold">Gallery</h2>
                <ul className="fx-grid mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {resources.gallery.map((g) => (
                    <li key={g.src} className="fx-card overflow-hidden rounded-[10px] border border-line bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.src} alt={g.alt} loading="lazy" className="h-auto w-full" />
                      {g.caption && <p className="p-3 text-copy text-body">{g.caption}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {resources.documents.length > 0 && <LinkList id="documents-h" heading="Documents" items={resources.documents} />}
          </>
        )}
      </div>
    </section>
  );
}
