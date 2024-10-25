// import { useState } from "react";
// import { Box, Typography, IconButton, Button, Collapse } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import ReplyIcon from "@mui/icons-material/Reply";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { CommentList } from "./CommentList";
// import { CommentForm } from "./CommentForm";
// import { useSelector } from "react-redux";


// export function Comment({ commentId, context, user, createdAt }) {
//   const [areChildrenHidden, setAreChildrenHidden] = useState(false);
//   const [isReplying, setIsReplying] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//  const username = useSelector((state) => state.login.username);

//   return (
//     <Box mb={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
//       <Box display="flex" justifyContent="space-between">
//         <Typography variant="body1">{user.name}</Typography>
//         <Typography variant="caption">{createdAt}</Typography>
//       </Box>
//       {isEditing ? (
//         <CommentForm
//           autoFocus
//           initialValue={context}
//           onSubmit={createComment}
//         />
//       ) : (
//         <Typography variant="body2">{context}</Typography>
//       )}
//       <Box mt={1} display="flex" alignItems="center">
//         <IconButton
//           onClick={() => setIsReplying((prev) => !prev)}
//           aria-label={isReplying ? "Cancel Reply" : "Reply"}
//         >
//           <ReplyIcon />
//         </IconButton>
//         {user.id === username && (
//           <>
//             <IconButton
//               onClick={() => setIsEditing((prev) => !prev)}
//               aria-label={isEditing ? "Cancel Edit" : "Edit"}
//             >
//               <EditIcon />
//             </IconButton>
//             <IconButton
//               onClick={DeleteComment}
//               disabled={loading}
//               color="error"
//               aria-label="Delete"
//             >
//               <DeleteIcon />
//             </IconButton>
//           </>
//         )}
//       </Box>
//       {error && (
//         <Typography color="error.main" variant="body2" mt={1}>
//           {error}
//         </Typography>
//       )}
//       {isReplying && (
//         <Box mt={1}>
//           <CommentForm
//             autoFocus
//             onSubmit={replyComment}
//             loading={loading}
//             error={error}
//           />
//         </Box>
//       )}
//       {childComments?.length > 0 && (
//         <>
//           <Collapse in={!areChildrenHidden}>
//             <Box mt={1}>
//               <Button
//                 onClick={() => setAreChildrenHidden(true)}
//                 color="primary"
//                 variant="outlined"
//               >
//                 Hide Replies
//               </Button>
//               <CommentList comments={childComments} />
//             </Box>
//           </Collapse>
//           <Button
//             onClick={() => setAreChildrenHidden(false)}
//             color="primary"
//             variant="outlined"
//             sx={{ mt: 1, display: areChildrenHidden ? "block" : "none" }}
//           >
//             Show Replies
//           </Button>
//         </>
//       )}
//     </Box>
//   );
// }
