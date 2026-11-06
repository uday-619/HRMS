'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KeyboardArrowDown, ChevronLeft, ChevronRight } from "@mui/icons-material";
import MenuItems from "./menuItems";
import "./Sidebar.css";

const Sidebar = ({ collapsed, onToggle }) => {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [flyout, setFlyout] = useState(null); // { index, top, left }
  const menuItemRefs = useRef({});
  const flyoutTimeout = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (!pathname) return;

    const firstPath = "/" + pathname.split("/")[1];
    let activeModuleIndex = null;
    let activeSubModule = null;

    MenuItems.forEach((item, index) => {
      if (item.href && item.href === "/" && firstPath === "/")
        activeModuleIndex = index;

      if (item.href && item.href.startsWith(firstPath) && item.href !== "/")
        activeModuleIndex = index;

      if (item.item) {
        const matched = item.item.find((sub) => sub.href === pathname);
        if (matched) {
          activeModuleIndex = index;
          activeSubModule = matched.href;
        }
      }
    });

    setOpenIndex(activeModuleIndex);
    setActiveSubItem(activeSubModule);
  }, [pathname]);

  useEffect(() => {
    if (collapsed) setOpenIndex(null);
  }, [collapsed]);

  const toggleMenu = (index) => {
    if (collapsed) return;
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleMouseEnter = (index, item) => {
    if (!collapsed || !item.item) return;
    clearTimeout(flyoutTimeout.current); // cancel any pending close
    const el = menuItemRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      setFlyout({ index, top: rect.top, left: rect.right + 6 });
    }
  };

  const handleMouseLeave = () => {
    flyoutTimeout.current = setTimeout(() => {
      setFlyout(null);
    }, 100); // small delay so cursor can reach the flyout
  };

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>

      {/* Header */}
      <div className="sidebar-header">
        {collapsed ? (
          <img src="/collapselogo.png" alt="Logo" className="sidebar-logo" />
        ) : (
          <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        )}
        <button className="collapse-btn" onClick={onToggle}>
          {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
        </button>
      </div>

      {/* Menu */}
      <nav className="menu-container">
        {MenuItems.map((item, index) => {
          const isOpen = openIndex === index;
          const isFlyoutOpen = flyout?.index === index;

          return (
            <div
              key={index}
              className="menu-item"
              ref={(el) => (menuItemRefs.current[index] = el)}
              onMouseEnter={() => handleMouseEnter(index, item)}
              onMouseLeave={handleMouseLeave}
            >
              {item.item ? (
                <>
                  <div
                    className={`menu-link ${collapsed ? "menu-link-collapsed" : ""}`}
                    onClick={() => toggleMenu(index)}
                  >
                    <div className={`menu-left ${collapsed ? "menu-left-collapsed" : ""}`}>
                      {item.icon && <item.icon className="menu-icon" size={25} />}
                      <span className={`menu-label ${collapsed ? "menu-label-collapsed" : ""}`}>
                        {item.label}
                      </span>
                    </div>
                    {!collapsed && (
                      <KeyboardArrowDown className={`menu-arrow ${isOpen ? "rotate" : ""}`} />
                    )}
                  </div>

                  {/* Expanded submenu (sidebar open) */}
                  {isOpen && !collapsed && (
                    <div className="submenu">
                      {item.item.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={`submenu-link ${activeSubItem === subItem.href ? "active" : ""}`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Flyout submenu (sidebar collapsed + hovered) */}
                  {collapsed && isFlyoutOpen && (
                    <div
                      className="submenu-flyout"
                      style={{ top: flyout.top, left: flyout.left, display: "block" }}
                      onMouseEnter={() => clearTimeout(flyoutTimeout.current)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="submenu-flyout-title">{item.label}</div>
                      {item.item.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="submenu-flyout-link"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`menu-link ${pathname === item.href ? "active" : ""} ${collapsed ? "menu-link-collapsed" : ""}`}
                >
                  <div className={`menu-left ${collapsed ? "menu-left-collapsed" : ""}`}>
                    {item.icon && <item.icon className="menu-icon" size={25} />}
                    <span className={`menu-label ${collapsed ? "menu-label-collapsed" : ""}`}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;





// 'use client';

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { KeyboardArrowDown, ChevronLeft, ChevronRight } from "@mui/icons-material";
// import MenuItems from "./menuItems";
// import "./Sidebar.css";

// const Sidebar = ({ collapsed, onToggle }) => {
//   const pathname = usePathname();
//   const [openIndex, setOpenIndex] = useState(null);
//   const [activeSubItem, setActiveSubItem] = useState(null);
//   const [flyout, setFlyout] = useState(null); // { index, top, left }
//   const menuItemRefs = useRef({});
//   const flyoutTimeout = useRef(null);

//   // BUG FIX 1: Removed unused `openMenu` state that was declared but never used.

//   // Determine active module and sub-item based on current pathname
//   const getActiveState = (path) => {
//     if (!path) return { activeModuleIndex: null, activeSubModule: null };

//     // BUG FIX 2: Use exact segment matching instead of startsWith() to prevent
//     // false matches e.g. "/employee" wrongly matching "/employees".
//     const firstSegment = "/" + path.split("/")[1];

//     let activeModuleIndex = null;
//     let activeSubModule = null;

//     MenuItems.forEach((item, index) => {
//       // Exact match for root href
//       if (item.href && item.href === "/" && firstSegment === "/") {
//         activeModuleIndex = index;
//       }

//       // BUG FIX 2 (continued): Changed startsWith to exact segment comparison.
//       // Previously `item.href.startsWith(firstPath)` could match "/employees"
//       // when firstPath was "/employee", causing wrong active highlights.
//       if (item.href && item.href !== "/" && item.href === firstSegment) {
//         activeModuleIndex = index;
//       }

//       if (item.item) {
//         const matched = item.item.find((sub) => sub.href === path);
//         if (matched) {
//           activeModuleIndex = index;
//           activeSubModule = matched.href;
//         }
//       }
//     });

//     return { activeModuleIndex, activeSubModule };
//   };

//   // Sync active state when pathname changes
//   useEffect(() => {
//     const { activeModuleIndex, activeSubModule } = getActiveState(pathname);
//     setActiveSubItem(activeSubModule);

//     // Only auto-open the active module when sidebar is expanded
//     if (!collapsed) {
//       setOpenIndex(activeModuleIndex);
//     }
//   }, [pathname]);

//   // BUG FIX 3: When collapsing, close all open menus.
//   // When expanding, restore the open menu based on current pathname
//   // so the active section is visible again.
//   useEffect(() => {
//     if (collapsed) {
//       setOpenIndex(null);
//     } else {
//       const { activeModuleIndex } = getActiveState(pathname);
//       setOpenIndex(activeModuleIndex);
//     }
//   }, [collapsed]);

//   const toggleMenu = (index) => {
//     if (collapsed) return;
//     setOpenIndex((prev) => (prev === index ? null : index));
//   };

//   // BUG FIX 4: Clear any pending flyout-close timeout before opening a new one,
//   // preventing a race condition where quickly moving between items could leave
//   // the previous flyout open while a new one also opened simultaneously.
//   const handleMouseEnter = (index, item) => {
//     if (!collapsed || !item.item) return;
//     clearTimeout(flyoutTimeout.current);
//     const el = menuItemRefs.current[index];
//     if (el) {
//       const rect = el.getBoundingClientRect();
//       setFlyout({ index, top: rect.top, left: rect.right + 6 });
//     }
//   };

//   const handleMouseLeave = () => {
//     // Delay closing so cursor has time to reach the flyout panel
//     flyoutTimeout.current = setTimeout(() => {
//       setFlyout(null);
//     }, 100);
//   };

//   // BUG FIX 5: Added closeFlyout handler so clicking a flyout link
//   // immediately closes the flyout. Previously the flyout stayed open
//   // after navigating since nothing ever called setFlyout(null) on click.
//   const closeFlyout = () => {
//     clearTimeout(flyoutTimeout.current);
//     setFlyout(null);
//   };

//   return (
//     <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>

//       {/* Header */}
//       <div className="sidebar-header">
//         {collapsed ? (
//           <img src="/shrinklogo.jpeg" alt="Logo" className="sidebar-logo" />
//         ) : (
//           <img src="/logo.png" alt="Logo" className="sidebar-logo" />
//         )}
//         <button className="collapse-btn" onClick={onToggle}>
//           {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
//         </button>
//       </div>

//       {/* Menu */}
//       <nav className="menu-container">
//         {MenuItems.map((item, index) => {
//           const isOpen = openIndex === index;
//           const isFlyoutOpen = flyout?.index === index;

//           return (
//             <div
//               key={index}
//               className="menu-item"
//               ref={(el) => (menuItemRefs.current[index] = el)}
//               onMouseEnter={() => handleMouseEnter(index, item)}
//               onMouseLeave={handleMouseLeave}
//             >
//               {item.item ? (
//                 <>
//                   <div
//                     className={`menu-link ${collapsed ? "menu-link-collapsed" : ""}`}
//                     onClick={() => toggleMenu(index)}
//                   >
//                     <div className={`menu-left ${collapsed ? "menu-left-collapsed" : ""}`}>
//                       {item.icon && <item.icon className="menu-icon" size={25} />}
//                       <span className={`menu-label ${collapsed ? "menu-label-collapsed" : ""}`}>
//                         {item.label}
//                       </span>
//                     </div>
//                     {!collapsed && (
//                       <KeyboardArrowDown className={`menu-arrow ${isOpen ? "rotate" : ""}`} />
//                     )}
//                   </div>

//                   {/* Expanded submenu (sidebar open) */}
//                   {isOpen && !collapsed && (
//                     <div className="submenu">
//                       {item.item.map((subItem, subIndex) => (
//                         <Link
//                           key={subIndex}
//                           href={subItem.href}
//                           className={`submenu-link ${activeSubItem === subItem.href ? "active" : ""}`}
//                         >
//                           {subItem.label}
//                         </Link>
//                       ))}
//                     </div>
//                   )}

//                   {/* Flyout submenu (sidebar collapsed + hovered) */}
//                   {collapsed && isFlyoutOpen && (
//                     <div
//                       className="submenu-flyout"
//                       style={{ top: flyout.top, left: flyout.left, display: "block" }}
//                       onMouseEnter={() => clearTimeout(flyoutTimeout.current)}
//                       onMouseLeave={handleMouseLeave}
//                     >
//                       <div className="submenu-flyout-title">{item.label}</div>
//                       {item.item.map((subItem, subIndex) => (
//                         <Link
//                           key={subIndex}
//                           href={subItem.href}
//                           className="submenu-flyout-link"
//                           onClick={closeFlyout}
//                         >
//                           {subItem.label}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <Link
//                   href={item.href}
//                   className={`menu-link ${pathname === item.href ? "active" : ""} ${collapsed ? "menu-link-collapsed" : ""}`}
//                 >
//                   <div className={`menu-left ${collapsed ? "menu-left-collapsed" : ""}`}>
//                     {item.icon && <item.icon className="menu-icon" size={25} />}
//                     <span className={`menu-label ${collapsed ? "menu-label-collapsed" : ""}`}>
//                       {item.label}
//                     </span>
//                   </div>
//                 </Link>
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
