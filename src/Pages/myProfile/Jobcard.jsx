import { Card, Typography, Box, Chip, Stack, Button, Avatar, Tooltip, Divider } from "@mui/material"
import WorkIcon from "@mui/icons-material/Work"
import ScheduleIcon from "@mui/icons-material/Schedule"
import PlaceIcon from "@mui/icons-material/Place"
import ChatIcon from "@mui/icons-material/Chat"
import PhoneIcon from "@mui/icons-material/Phone"
import VerifiedIcon from "@mui/icons-material/Verified"
import ChatServices from "../../apis/Chat" // Adjust the import path as necessary
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const JobCard = ({ job, truncate = false, maxlength = 120, istruncate = false, sx = {}, onReadMore }) => {
  const { name, companyname, timing, description, location, phonenumber, user } = job
  const MAX_LENGTH = maxlength
  const shouldTruncate = truncate && description.length > MAX_LENGTH
  const displayedDescription = shouldTruncate ? `${description.slice(0, MAX_LENGTH)}...` : description
  const userdata=useSelector((state)=>state?.auth?.user)
console.log(user?.lastname,"user")
  const navigate=useNavigate()
  const sendChat  =async () => {
      console.log(user);
      let obj={
        receiverId:user?._id,
        role:user?.role,
        name:user?.name,
        lastName:user?.lastname
      }
      navigate('/profile/chat',{state:obj})
      
  }
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        p: 3,
        overflowX: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#fff",
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          // boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
        "&::-webkit-scrollbar": {
          height: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
        ...sx,
      }}
    >
      {/* Poster Info */}
      {user && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Avatar
              src={user?.profilePicture}
              alt={user.name}
              sx={{
                width: 44,
                height: 44,
                border: "2px solid #e3f2fd",
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                  {user?.name}
                </Typography>
                <VerifiedIcon sx={{ color: "#1976d2", fontSize: 16 }} />
              </Box>
              <Typography variant="caption" color="text.secondary">
              {user?.currentJobTitle}
              </Typography>
            </Box>
            <Chip
              label={user?.role}
              size="small"
              sx={{
                backgroundColor: "#e8f5e8",
                color: "#2e7d32",
                fontWeight: 600,
                fontSize: "0.7rem",
                textTransform: "capitalize",
              }}
            />
          </Box>
          <Divider sx={{ mb: 1 }} />
        </>
      )}

      {/* Job Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            p: 1.5,
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WorkIcon sx={{ color: "#1976d2", fontSize: 24 }} />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              mb: 0.5,
              "&:hover": { color: "#1976d2" },
              transition: "color 0.2s ease",
            }}
            noWrap
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#666",
              fontWeight: 500,
              mb: 1,
            }}
            noWrap
          >
            {companyname}
          </Typography>
        </Box>
      </Box>

      {/* Job Details */}
      <Typography variant="body2" sx={{ color: "#1a1a1a", fontWeight: 600, mb: 1 }}>
        Job Details
      </Typography>

      {/* Chips for timing and location */}
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        <Tooltip title={timing} placement="top">
          <Chip
            icon={<ScheduleIcon fontSize="small" />}
            label={timing}
            size="medium"
            variant="outlined"
            sx={{
              borderColor: "#1976d2",
              color: "#1976d2",
              maxWidth: "200px",
              fontWeight: 500,
              "& .MuiChip-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                px: 1,
              },
              "& .MuiChip-icon": { color: "#1976d2" },
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                borderColor: "#1565c0",
              },
            }}
          />
        </Tooltip>
        <Tooltip title={location} placement="top">
          <Chip
            icon={<PlaceIcon fontSize="small" />}
            label={location}
            size="medium"
            variant="outlined"
            sx={{
              borderColor: "#1976d2",
              marginLeft: "0px !important",
              color: "#1976d2",
              maxWidth: "200px",
              fontWeight: 500,
              "& .MuiChip-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                px: 1,
              },
              "& .MuiChip-icon": { color: "#1976d2" },
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                borderColor: "#1565c0",
              },
            }}
          />
        </Tooltip>
      </Stack>

      {/* Description */}
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" sx={{ color: "#1a1a1a", fontWeight: 600, mb: 1 }}>
          Job Description
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            wordBreak: "break-word",
            lineHeight: 1.6,
            color: "#555",
          }}
        >
          {displayedDescription}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          pt: 2,
          borderTop: "1px solid #f0f0f0",
        }}
      >
        {job?.user?._id !== userdata?._id && (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<ChatIcon />}
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: "#1976d2",
              fontWeight: 600,
              px: 2,
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
            onClick={sendChat}
          >
            Chat Now
          </Button>

          {/* {phonenumber && (
            <Button
              variant="outlined"
              startIcon={<PhoneIcon />}
              size="small"
              sx={{
                textTransform: "none",
                color: "#2e7d32",
                borderColor: "#2e7d32",
                fontWeight: 600,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(46, 125, 50, 0.08)",
                  borderColor: "#1b5e20",
                },
              }}
            >
              Call
            </Button>
          )} */}
        </Stack>
        )}

        {/* Read More if truncated */}
        {istruncate && shouldTruncate && (
          <Button
            size="small"
            onClick={onReadMore}
            sx={{
              textTransform: "none",
              color: "#1976d2",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                textDecoration: "underline",
              },
            }}
          >
            Read More →
          </Button>
        )}
      </Box>

    </Card>
  )
}

export default JobCard
