// Sidebar toggle functionality
class SidebarManager {
    constructor() {
        this.isOpen = false;
        this.sidebar = null;
        this.overlay = null;
        this.toggleButton = null;

        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.sidebar = document.getElementById("mobile-sidebar");
        this.overlay = document.getElementById("sidebar-overlay");
        this.toggleButton = document.getElementById("sidebar-toggle");

        if (this.toggleButton) {
            this.toggleButton.addEventListener("click", () => this.toggle());
        }

        if (this.overlay) {
            this.overlay.addEventListener("click", () => this.close());
        }

        // Close sidebar on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen) {
                this.close();
            }
        });

        // Close sidebar when screen becomes large (2xl breakpoint)
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1536 && this.isOpen) {
                // 2xl breakpoint
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (!this.sidebar || !this.overlay) return;

        this.isOpen = true;
        this.sidebar.classList.remove("-translate-x-full");
        this.sidebar.classList.add("translate-x-3");
        this.overlay.classList.remove("hidden");
        this.overlay.classList.add("block");

        // Prevent body scroll when sidebar is open
        document.body.style.overflow = "hidden";
    }

    close() {
        if (!this.sidebar || !this.overlay) return;

        this.isOpen = false;
        this.sidebar.classList.remove("translate-x-3");
        this.sidebar.classList.add("-translate-x-full");
        this.overlay.classList.remove("block");
        this.overlay.classList.add("hidden");

        // Restore body scroll
        document.body.style.overflow = "";
    }
}

// Initialize sidebar manager
const sidebarManager = new SidebarManager();

// Export for global access if needed
window.sidebarManager = sidebarManager;
