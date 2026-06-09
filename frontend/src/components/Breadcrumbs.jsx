import { Link } from 'react-router-dom';

/**
 * Breadcrumbs component with BreadcrumbList schema markup.
 * @param {{ items: Array<{ label: string, to?: string }> }} props
 */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-3 bg-gray-50 border-b border-gray-100">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-1.5"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {i > 0 && <span className="text-gray-300 select-none" aria-hidden="true">›</span>}
            {item.to ? (
              <Link
                to={item.to}
                className="hover:text-[#ff9933] transition-colors font-medium"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="text-gray-800 font-semibold" itemProp="name">{item.label}</span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
