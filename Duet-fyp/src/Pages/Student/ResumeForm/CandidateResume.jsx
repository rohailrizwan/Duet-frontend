"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
  Divider,
  Chip,
  Card,
  CardContent,
  Link,
} from "@mui/material"
import { Person, Email, Phone, Home, LinkedIn, GitHub, Language, School, Print } from "@mui/icons-material"
import Container from "../../../Components/Container"

// Sample resume data - replace with your actual data or API call
const sampleResumeData = {
  fullName: "John Doe",
  department: "Computer Science",
  semester: "6th",
  email: "john.doe@example.com",
  phone: "+1 (123) 456-7890",
  address: "123 Main Street, City, Country",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  portfolio: "https://johndoe.com",
  description:
    "Dedicated and enthusiastic Computer Science student with a passion for web development and software engineering. Seeking opportunities to apply my technical skills in a professional environment.",
  skills: ["JavaScript", "React", "Node.js", "HTML/CSS", "Material UI", "Git", "MongoDB", "Express"],
  workExperience: [
    {
      organization: "Tech Solutions Inc.",
      duration: "Jun 2023 - Aug 2023",
      role: "Web Development Intern",
      responsibilities:
        "• Developed responsive web applications using React.js\n• Collaborated with senior developers on client projects\n• Implemented UI components using Material UI\n• Participated in code reviews and team meetings",
    },
    {
      organization: "Student Developer Club",
      duration: "Jan 2023 - Present",
      role: "Frontend Developer",
      responsibilities:
        "• Built and maintained the club's website\n• Organized coding workshops for junior students\n• Implemented new features based on user feedback",
    },
  ],
  enrollment: "CS2021001",
  interDetails: {
    collegeName: "City College",
    passingYear: "2021",
    grade: "A",
  },
  matricDetails: {
    schoolName: "City High School",
    passingYear: "2019",
    grade: "A+",
  },
  activities:
    "• Member of the college coding club\n• Participated in national level hackathons\n• Volunteer for tech workshops\n• Organized departmental technical events",
}
  
const CandidateResume = ({ resumeData = sampleResumeData }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="body1">Loading resume data...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container>
        {/* Navigation buttons - hidden when printing */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end", "@media print": { display: "none" } }}>
          <Button startIcon={<Print />} variant="contained" color="primary" onClick={handlePrint} size="small">
            Print Resume
          </Button>
        </Box>

        {/* Resume Paper */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header Section */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, mb: 3, alignItems: "center" }}>
            <Avatar
              src={resumeData.profileImage}
              sx={{
                width: { xs: 80, sm: 120 },
                height: { xs: 80, sm: 120 },
                mr: { xs: 0, sm: 3 },
                mb: { xs: 2, sm: 0 },
                border: "3px solid #2156a8",
              }}
            >
              {!resumeData.profileImage && <Person sx={{ fontSize: 50 }} />}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight="bold" color="#2156a8" gutterBottom>
                {resumeData.fullName}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {resumeData.department} | {resumeData.semester} Semester
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", mt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Email color="action" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{resumeData.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Phone color="action" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{resumeData.phone}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Home color="action" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{resumeData.address}</Typography>
                </Box>
              </Box>

              {/* Social Links with URLs */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                {resumeData.linkedin && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LinkedIn fontSize="small" sx={{ color: "#0077b5", mr: 1 }} />
                    <Link
                      href={resumeData.linkedin}
                      target="_blank"
                      variant="body2"
                      sx={{ textDecoration: "none", color: "#0077b5", "&:hover": { textDecoration: "underline" } }}
                    >
                      {resumeData.linkedin}
                    </Link>
                  </Box>
                )}

                {resumeData.github && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <GitHub fontSize="small" sx={{ color: "#333", mr: 1 }} />
                    <Link
                      href={resumeData.github}
                      target="_blank"
                      variant="body2"
                      sx={{ textDecoration: "none", color: "#333", "&:hover": { textDecoration: "underline" } }}
                    >
                      {resumeData.github}
                    </Link>
                  </Box>
                )}

                {resumeData.portfolio && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Language fontSize="small" sx={{ color: "#2e7d32", mr: 1 }} />
                    <Link
                      href={resumeData.portfolio}
                      target="_blank"
                      variant="body2"
                      sx={{ textDecoration: "none", color: "#2e7d32", "&:hover": { textDecoration: "underline" } }}
                    >
                      {resumeData.portfolio}
                    </Link>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Professional Summary */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" color="#2156a8" gutterBottom>
              Professional Summary
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {resumeData.description}
            </Typography>
          </Box>

          {/* Skills */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" color="#2156a8" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {resumeData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  color="primary"
                  sx={{
                    bgcolor: "#e3f2fd",
                    color: "#2156a8",
                    fontWeight: "medium",
                    borderColor: "#bbdefb",
                    border: "1px solid",
                    fontSize: "0.75rem",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Work Experience */}
          {resumeData.workExperience && resumeData.workExperience.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" color="#2156a8" gutterBottom>
                Work Experience
              </Typography>

              {resumeData.workExperience.map((exp, index) => (
                <Card key={index} sx={{ mb: 2, border: "1px solid #e0e0e0", boxShadow: "none" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {exp.organization}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                        {exp.duration}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="primary" fontWeight="medium" gutterBottom>
                      {exp.role}
                    </Typography>

                    <Typography variant="body2" sx={{ whiteSpace: "pre-line", mt: 0.5, fontSize: "0.8rem" }}>
                      {exp.responsibilities}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Education */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" color="#2156a8" gutterBottom>
              Education
            </Typography>

            <Grid container spacing={2}>
              {/* University */}
              <Grid item xs={12}>
                <Card sx={{ mb: 2, border: "1px solid #e0e0e0", boxShadow: "none" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                      <School sx={{ color: "#2156a8", mt: 0.25, fontSize: "1.2rem" }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {resumeData.department}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                          Enrollment: {resumeData.enrollment} | Semester: {resumeData.semester}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Intermediate Education */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%", border: "1px solid #e0e0e0", boxShadow: "none" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="body1" fontWeight="bold" color="#2156a8" gutterBottom>
                      Intermediate
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {resumeData.interDetails.collegeName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                      Passing Year: {resumeData.interDetails.passingYear}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                      Grade: {resumeData.interDetails.grade}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Matriculation Education */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%", border: "1px solid #e0e0e0", boxShadow: "none" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="body1" fontWeight="bold" color="#2156a8" gutterBottom>
                      Matriculation
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {resumeData.matricDetails.schoolName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                      Passing Year: {resumeData.matricDetails.passingYear}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                      Grade: {resumeData.matricDetails.grade}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Activities */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="#2156a8" gutterBottom>
              Co-curricular Activities
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line", fontSize: "0.8rem" }}>
              {resumeData.activities}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default CandidateResume
