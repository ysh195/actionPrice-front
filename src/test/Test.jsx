// import React, { useState } from "react";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Collapse,
//   ListItemIcon,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import {
//   ExpandLess,
//   ExpandMore,
//   Home,
//   Category,
//   Settings,
// } from "@mui/icons-material";

// const Test = () => {
//   const [openSection, setOpenSection] = useState(null);

//   const handleToggleSection = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   const menuItems = [
//     {
//       title: "Home",
//       icon: <Home />,
//       path: "/home",
//     },
//     {
//       title: "Categories",
//       icon: <Category />,
//       path: "/categories",
//       subItems: [
//         { title: "Meat", path: "/categories/meat" },
//         { title: "Seafood", path: "/categories/seafood" },
//         { title: "Fruit", path: "/categories/fruit" },
//       ],
//     },
//     {
//       title: "Settings",
//       icon: <Settings />,
//       path: "/settings",
//       subItems: [
//         { title: "Profile", path: "/settings/profile" },
//         { title: "Account", path: "/settings/account" },
//       ],
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: "240px",
//         bgcolor: "background.paper",
//         padding: 2,
//         height: "100vh",
//         position: "fixed",
//         overflowY: "auto",
//         boxShadow: 1,
//       }}
//     >
//       <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
//         Menu
//       </Typography>
//       <List component="nav">
//         {menuItems.map((item, index) => (
//           <React.Fragment key={index}>
//             <ListItem button onClick={() => handleToggleSection(index)}>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.title} />
//               {item.subItems ? (
//                 openSection === index ? (
//                   <ExpandLess />
//                 ) : (
//                   <ExpandMore />
//                 )
//               ) : null}
//             </ListItem>
//             {item.subItems && (
//               <Collapse in={openSection === index} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   {item.subItems.map((subItem, subIndex) => (
//                     <ListItem button sx={{ pl: 4 }} key={subIndex}>
//                       <ListItemText primary={subItem.title} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Collapse>
//             )}
//           </React.Fragment>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default Test;

import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Home,
  Category,
  Settings,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Test = () => {
  const [openSection, setOpenSection] = useState(null);

  const handleToggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const menuItems = [
    {
      title: "Home",
      icon: <Home />,
      path: "/home",
    },
    {
      title: "Categories",
      icon: <Category />,
      path: "/categories",
      subItems: [
        { title: "Meat", path: "/categories/meat" },
        { title: "Seafood", path: "/categories/seafood" },
        { title: "Fruit", path: "/categories/fruit" },
      ],
    },
    {
      title: "Account Settings",
      icon: <Settings />,
      path: "/settings",
      subItems: [
        { title: "Profile", path: "/settings/profile" },
        { title: "Account", path: "/settings/account" },
      ],
    },
    {
      title: "Logout",
      icon: <Logout />,
      path: "/logout",
    },
  ];

  return (
    <Box
      sx={{
        width: "240px",
        bgcolor: "background.paper",
        padding: 2,
        height: "100vh",
        position: "fixed",
        overflowY: "auto",
        boxShadow: 1,
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
        User Menu
      </Typography>
      <List component="nav">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleToggleSection(index)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
              {item.subItems ? (
                openSection === index ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>
            {item.subItems && (
              <Collapse in={openSection === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItem button sx={{ pl: 4 }} key={subIndex}>
                      <ListItemText primary={subItem.title} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
            {!item.subItems && (
              <ListItem button component={Link} to={item.path}>
                <ListItemText primary={item.title} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Test;
