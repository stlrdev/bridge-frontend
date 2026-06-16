import { Icons } from "@/components/shared/icons";

export default function AdminLayoutNotFound() {
  return (
    <>
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">Admin</p>
          <Icons.ChevronLeft />
          <h2 className="font-bold">Page Not Found</h2>
        </div>
        <div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Icons.Bell />
          </button>
        </div>
      </header>
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Admin Page Not Found</h1>
          <p className="text-muted-foreground">
            The admin page you're looking for doesn't exist.
          </p>
        </div>
      </div>
    </>
  );
}
