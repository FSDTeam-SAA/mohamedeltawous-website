"use client";
export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-gray-100 bg-white">
      <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Second Sight. All rights reserved.
      </div>
    </footer>
  );
}
