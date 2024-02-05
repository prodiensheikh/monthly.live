import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100">
      <Outlet />
    </div>
  )
}