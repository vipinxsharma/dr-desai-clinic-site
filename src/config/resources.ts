/**
 * Resources (videos, articles, gallery, documents). Every list starts EMPTY on purpose: nothing is shown
 * until the clinic supplies real items. See README "Resources" for how to add one.
 */

export type ResourceLink = { title: string; url: string; description?: string };
export type GalleryItem = { src: string; alt: string; caption?: string };

export type Resources = {
  /** Show the Resources menu item and page even when every list is empty ("coming soon" page). */
  showWhenEmpty: boolean;
  videos: ResourceLink[];
  articles: ResourceLink[];
  gallery: GalleryItem[];
  documents: ResourceLink[];
};

export const RESOURCES: Resources = {
  showWhenEmpty: false,
  videos: [],
  articles: [],
  gallery: [],
  documents: [],
};

export function hasResourceItems(r: Resources): boolean {
  return r.videos.length + r.articles.length + r.gallery.length + r.documents.length > 0;
}

export function resourcesVisible(r: Resources): boolean {
  return r.showWhenEmpty || hasResourceItems(r);
}
