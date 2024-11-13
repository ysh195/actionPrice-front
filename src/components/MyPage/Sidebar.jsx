/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Collapse,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BadgeIcon from "@mui/icons-material/Badge";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/loginSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAccount } from "../../redux/slices/myPageSlice";
import Swal from "sweetalert2";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { colors } from "../../assets/assest";

const Sidebar = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleAccountMenu = () => setIsAccountOpen(!isAccountOpen);

  const handleLogout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    });
    if (isConfirmed) {
      dispatch(logoutUser());
      navigate("/api/user/login");
    }
  };

  const handleDeleteAccount = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "계정을 삭제하시겠습니까?",
      text: "삭제된 계정은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    });

    if (!isConfirmed) return;

    const result = await dispatch(deleteAccount(username));
    const message = deleteAccount.fulfilled.match(result)
      ? {
          text: "계정이 성공적으로 삭제되었습니다",
          icon: "success",
          timer: 3000,
        }
      : {
          icon: "error",
          title: "Oops...",
          text: "계정 삭제에 실패하였습니다. 다시 시도해 주세요.",
          showConfirmButton: true,
        };

    Swal.fire(message);

    if (deleteAccount.fulfilled.match(result)) navigate("/api/user/login");
  };

  return (
    <Box
      open={isOpen}
      sx={{
        // backgroundColor: "#dedad7",

        // border: `1px solid ${colors.rose}`,
        padding: 2,
        height: "100%",
        position: "fixed",
        overflowY: "auto",
        top: "3rem",
        left: 0,
        width: isOpen ? 210 : 90,
        flexShrink: 0,
        zIndex: 2,
      }}
    >
      <List>
        <ListItemIcon
          onClick={toggleSidebar}
          sx={{ color: colors.green, mt: 10, ml:2, cursor: "pointer" }}
        >
          {isOpen ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </ListItemIcon>

        <Box
          sx={{
            mt: "2rem",
          }}
        >
          <Divider />
          <Typography
            variant="body2"
            sx={{
              color: colors.rose,
              fontWeight: 600,
              margin: isOpen ? "10px 1rem" : "16px 0.5rem",
            }}
          >
            Profile
          </Typography>
          <Divider />
          <ListItem
            component="button"
            sx={{
              color: colors.green,
              cursor: "pointer !important",
              backgroundColor: "transparent",
              mt: 2,
            }}
          >
            <ListItemIcon sx={{ color: colors.green, ml: isOpen ? 1 : 0 }}>
              <BadgeIcon onClick={toggleSidebar} />
            </ListItemIcon>
            {isOpen && <Typography variant="body2">{username}님</Typography>}
          </ListItem>
          <Tooltip
            title="계정"
            placement="right"
            arrow
            disableHoverListener={isOpen}
          >
            <ListItem
              component="button"
              onClick={toggleAccountMenu}
              sx={{
                color: colors.green,
                cursor: "pointer !important",
                backgroundColor: "transparent",
              }}
            >
              <ListItemIcon sx={{ color: colors.green, ml: isOpen ? 1 : 0 }}>
                <ManageAccountsIcon />
              </ListItemIcon>
              {isOpen && (
                <>
                  <ListItemText primary="계정" />
                  {isAccountOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </>
              )}
            </ListItem>
          </Tooltip>
          <Collapse in={isAccountOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Tooltip
                title="계정 삭제"
                placement="right"
                arrow
                disableHoverListener={isOpen}
              >
                <ListItem
                  component="button"
                  onClick={handleDeleteAccount}
                  sx={{
                    pl: 4,
                    color: colors.green,
                    cursor: "pointer !important",
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{ color: colors.green, ml: isOpen ? 1 : 0 }}
                  >
                    <PersonRemoveIcon />
                  </ListItemIcon>
                  {isOpen && <ListItemText primary="계정 삭제" />}
                </ListItem>
              </Tooltip>
            </List>
          </Collapse>
        </Box>

        <Box sx={{ mt: "3rem" }}>
          <Divider />
          <Typography
            variant="body2"
            sx={{
              color: colors.rose,
              fontWeight: 600,
              margin: isOpen ? "10px 1rem" : "16px 0.5rem",
            }}
          >
            Menu
          </Typography>
          <Divider />
          <Tooltip
            title="나의 게시글"
            placement="right"
            arrow
            disableHoverListener={isOpen}
          >
            <ListItem
              component={Link}
              to={`/api/mypage/${username}/myposts`}
              sx={{ color: colors.green, mt: 2 }}
            >
              <ListItemIcon sx={{ color: colors.green, ml: isOpen ? 1 : 0 }}>
                <ChatIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="나의 게시글" />}
            </ListItem>
          </Tooltip>
          <Tooltip
            title="내 관심 목록"
            placement="right"
            arrow
            disableHoverListener={isOpen}
          >
            <ListItem
              component={Link}
              to={`/api/mypage/${username}/wishlist`}
              sx={{ color: colors.green }}
            >
              <ListItemIcon sx={{ color: colors.green, ml: isOpen ? 1 : 0 }}>
                <BookmarksIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="내 관심 목록" />}
            </ListItem>
          </Tooltip>
        </Box>

        {/* Spacer between menu and logout */}
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ mt: "20rem" }}>
          <Tooltip
            title="로그아웃"
            placement="right"
            arrow
            disableHoverListener={isOpen}
          >
            <ListItem
              onClick={handleLogout}
              sx={{
                color: colors.green,
                cursor: "pointer !important",
                backgroundColor: "transparent",
              }}
            >
              <ListItemIcon sx={{ color: colors.green, ml: isOpen ? 1 : 0 }}>
                <LogoutIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="로그아웃" />}
            </ListItem>
          </Tooltip>
        </Box>
      </List>
    </Box>
  );
};

export default Sidebar;
