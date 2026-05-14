/** Bare filename → `/images/...`; then prepend API base for <img src> */
export function imageUrl(req, image) {
  if (!image || typeof image !== "string") return image;
  let path = image.trim();
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/image/")) path = `/images/${path.slice(7)}`;
  if (path.startsWith("uploads/")) path = `/${path}`;
  else if (!path.startsWith("/")) path = `/images/${encodeURIComponent(path)}`;
  const base = (process.env.API_PUBLIC_URL || `${req.protocol}://${req.get("host")}`).replace(/\/$/, "");
  return `${base}${path}`;
}

export function productJSON(req, doc) {
  const o = doc?.toObject ? doc.toObject({ flattenMaps: true }) : { ...doc };
  if (o.image) o.image = imageUrl(req, o.image);
  return o;
}

export function orderJSON(req, doc) {
  const o = doc?.toObject ? doc.toObject({ flattenMaps: true }) : { ...doc };
  if (Array.isArray(o.orderItems)) {
    o.orderItems = o.orderItems.map((it) => ({
      ...it,
      image: it.image ? imageUrl(req, it.image) : it.image,
    }));
  }
  return o;
}
