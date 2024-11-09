/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
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
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/loginSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAccount } from "../redux/slices/myPageSlice";
import Swal from "sweetalert2";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Sidebar = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const email = useSelector((state) => state.myPage.email);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleAccountMenu = () => setIsAccountOpen(!isAccountOpen);

  const handleLogout = async () => {
    const confirmation = await Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    });
    if (confirmation.isConfirmed) {
      dispatch(logoutUser());
      navigate("/api/user/login");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = await Swal.fire({
      title: "계정을 삭제하시겠습니까?",
      text: "삭제된 계정은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    });
    if (confirmation.isConfirmed) {
      const result = await dispatch(deleteAccount(username));
      if (deleteAccount.fulfilled.match(result)) {
        Swal.fire({
          text: "계정이 성공적으로 삭제되었습니다",
          icon: "success",
          timer: 3000,
        });
        navigate("/api/user/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "계정 삭제에 실패하였습니다. 다시 시도해 주세요.",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <Box
      open={isOpen}
      sx={{
        backgroundColor: "#2f323a",
        padding: 2,
        height: "100%",
        position: "fixed",
        overflowY: "auto",
        top: "3rem",
        left: 0,
        width: isOpen ? 250 : 100,
        flexShrink: 0,
        color: "#fff",
      }}
    >
      <Box>
        <List>
          <ListItemIcon onClick={toggleSidebar} sx={{ color: "#fff" }}>
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </ListItemIcon>

          <Divider />

          <Typography
            variant="body2"
            sx={{
              color: "rgb(137, 135, 135)",
              margin: isOpen ? "8px 1rem" : "16px 1rem",
            }}
          >
            Profile
          </Typography>
          <Divider />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "46px",
              paddingTop: "0",
              justifyContent: isOpen ? "space-evenly" : "center",
            }}
          >
            <ListItem
              component="button"
              sx={{
                color: "#fff",
                cursor: "pointer !important",
                backgroundColor: "transparent",
              }}
            >
              <ListItemIcon sx={{ color: "#fff", ml: isOpen ? 2 : 0 }}>
                <BadgeIcon onClick={toggleSidebar} />
              </ListItemIcon>
              {isOpen && (
                <Box>
                  <Typography variant="body2">{username}</Typography>
                  <Typography variant="body2">{email}</Typography>
                </Box>
              )}
            </ListItem>
          </Box>

          <Divider />
          <Typography
            variant="body2"
            sx={{
              color: "rgb(137, 135, 135)",
              margin: isOpen ? "8px 1rem" : "16px 1rem",
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
              sx={{ color: "white" }}
            >
              <ListItemIcon sx={{ color: "#fff", ml: isOpen ? 1 : 0 }}>
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
              sx={{ color: "white" }}
            >
              <ListItemIcon sx={{ color: "#fff", ml: isOpen ? 1 : 0 }}>
                <BookmarksIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="내 관심 목록" />}
            </ListItem>
          </Tooltip>
        </List>
      </Box>

      <Box>
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
              color: "#fff",
              cursor: "pointer !important",
              backgroundColor: "transparent",
            }}
          >
            <ListItemIcon sx={{ color: "#fff", ml: isOpen ? 1 : 0 }}>
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
                  color: "#fff",
                  cursor: "pointer !important",
                  backgroundColor: "transparent",
                }}
              >
                <ListItemIcon sx={{ color: "#fff", ml: isOpen ? 1 : 0 }}>
                  <PersonRemoveIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="계정 삭제" />}
              </ListItem>
            </Tooltip>
          </List>
        </Collapse>

        <Tooltip
          title="로그아웃"
          placement="right"
          arrow
          disableHoverListener={isOpen}
        >
          <ListItem
            onClick={handleLogout}
            sx={{
              color: "#fff",
              cursor: "pointer !important",
              backgroundColor: "transparent",
            }}
          >
            <ListItemIcon sx={{ color: "#fff", ml: isOpen ? 1 : 0 }}>
              <LogoutIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="로그아웃" />}
          </ListItem>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
