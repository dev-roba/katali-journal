import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import NotFoundPage from "./pages/NotFoundPage";
import { SITE, bySlug, categoryMeta, LATEST } from "./data/posts";

const SITE_URL = "https://katalijournal.example";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setJsonLd(obj) {
  let el = document.getElementById("route-jsonld");
  if (!el) {
    el = document.createElement("script");
    el.id = "route-jsonld";
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(obj);
}

function TitleSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const base = "Katali Journal";
    let title = `${SITE.tagline} — ${base}`;
    let description = SITE.tagline;
    let ogImage = "";
    let jsonLd = null;

    if (pathname === "/") {
      ogImage = `/og/og-${LATEST[0].slug}.jpg`;
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        url: SITE_URL,
        description: SITE.tagline,
      };
    } else if (pathname === "/about") {
      title = `About — ${base}`;
      description = `About ${SITE.author.name}: software engineer and writer based in ${SITE.author.location}.`;
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: SITE.author.name,
        jobTitle: SITE.author.role,
        address: SITE.author.location,
        description: SITE.author.bio,
      };
    } else if (pathname === "/contact") {
      title = `Contact — ${base}`;
      description = "Get in touch with Katali Journal.";
    } else if (pathname === "/search") {
      title = `Search — ${base}`;
      description = "Search the Katali Journal archive.";
    } else if (pathname === "/gallery") {
      title = `Field notes gallery — ${base}`;
      description = "Photographs behind the essays.";
    } else if (pathname.startsWith("/blog/")) {
      const post = bySlug(pathname.replace("/blog/", "").replace(/\/$/, ""));
      if (post) {
        title = `${post.title} — ${base}`;
        description = post.description;
        ogImage = `/og/og-${post.slug}.jpg`;
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          image: `${SITE_URL}/og/og-${post.slug}.jpg`,
          url: `${SITE_URL}/blog/${post.slug}`,
          author: {
            "@type": "Person",
            name: SITE.author.name,
            jobTitle: SITE.author.role,
          },
          publisher: { "@type": "WebSite", name: SITE.name },
          keywords: post.tags.join(", "),
          wordCount: post.content.reduce(
            (n, b) => n + (b.text ? b.text.split(/\s+/).length : 0) + (b.items ? b.items.length * 8 : 0),
            0
          ),
        };
      } else {
        title = `Essay not found — ${base}`;
      }
    } else if (pathname.startsWith("/category/")) {
      const slug = pathname.replace("/category/", "").replace(/\/$/, "");
      if (slug === "all") {
        title = `The whole archive — ${base}`;
        description = "The complete Katali Journal essay archive.";
      } else {
        const cat = categoryMeta(slug);
        title = `${cat.label} — ${base}`;
        description = `Essays filed under ${cat.label.toLowerCase()}.`;
      }
    } else {
      title = `Page not found — ${base}`;
      description = "This page could not be found.";
    }

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title.replace(` — ${base}`, ""));
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", `${SITE_URL}${pathname}`);
    if (ogImage) {
      upsertMeta("property", "og:image", `${SITE_URL}${ogImage}`);
      upsertMeta("property", "twitter:card", "summary_large_image");
      upsertMeta("property", "twitter:image", `${SITE_URL}${ogImage}`);
    } else {
      const img = document.querySelector('meta[property="og:image"]');
      if (img) img.remove();
    }
    if (jsonLd) setJsonLd(jsonLd);
    else {
      document.getElementById("route-jsonld")?.remove();
    }
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <TitleSync />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/blog/:slug" element={<PostPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}