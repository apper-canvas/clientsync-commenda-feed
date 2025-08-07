import { Outlet, useEffect } from "react"
import Sidebar from "@/components/organisms/Sidebar"
import Header from "@/components/organisms/Header"

const Layout = () => {
  useEffect(() => {
    // Handle mobile sidebar close functionality
    const overlay = document.getElementById("mobile-sidebar-overlay")
    const sidebar = document.getElementById("mobile-sidebar")
    const closeButton = document.getElementById("close-sidebar")

    const closeSidebar = () => {
      if (overlay && sidebar) {
        sidebar.classList.add("-translate-x-full")
        setTimeout(() => {
          overlay.classList.add("hidden")
        }, 300)
      }
    }

    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          closeSidebar()
        }
      })
    }

    if (closeButton) {
      closeButton.addEventListener("click", closeSidebar)
    }

    return () => {
      if (overlay) overlay.removeEventListener("click", closeSidebar)
      if (closeButton) closeButton.removeEventListener("click", closeSidebar)
    }
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout