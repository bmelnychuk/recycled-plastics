# Generate Loading States for Next.js Pages

Generate or update `loading.tsx` files for all pages in `src/app` to match their current structure.

---

## Step 1: Find All Pages

```bash
find src/app -name "page.tsx" -type f
```

---

## Step 2: For Each Page

1. **Read the `page.tsx`** file
2. **Read or create `loading.tsx`** in the same directory
3. **Generate a skeleton** that mirrors the page's layout structure

---

## Step 3: Generate the Loading State

Create a `loading.tsx` that matches the page structure using Skeleton components.

### Imports

```tsx
import { Skeleton } from "@/design-system/components/ui/skeleton";
// If page uses separators:
import { Separator } from "@/design-system/components/ui/separator";
// If page uses cards:
import { Card, CardContent, CardHeader } from "@/design-system/components/ui/card";
```

### Rules

1. **Copy the exact container structure** from the page (same `className` on root div)
2. **Replace text/data with `<Skeleton />`** sized appropriately
3. **Replace tables with skeleton tables** (same number of columns)
4. **Replace form fields with skeleton inputs**
5. **Keep all layout classes** (`flex`, `grid`, responsive breakpoints)

### Skeleton Sizes

| Element | Size |
|---------|------|
| Page title | `h-8 w-64` |
| Section title | `h-6 w-48` |
| Text line | `h-4 w-full` |
| Form label | `h-4 w-24` |
| Input | `h-10 w-full` |
| Button | `h-10 w-28` |
| Table cell | `h-4 w-20` |
| Avatar | `h-10 w-10 rounded-full` |
| Image | `h-20 w-20 rounded-lg` |

### Example

If the page has:
```tsx
<div className="container mx-auto p-6">
  <h1>Users</h1>
  <table>...</table>
</div>
```

The loading state should be:
```tsx
<div className="container mx-auto p-6">
  <Skeleton className="h-8 w-32 mb-6" />
  <div className="rounded-md border">
    <table className="w-full">
      <thead>...</thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, i) => (
          <tr key={i}>...</tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
```

---

## Notes

- Use `@/design-system/components/ui/*` for all shadcn imports
- The loading state should look like a "preview" of the actual page
- Match the exact layout, just replace content with skeletons
