import React, {
  useState,
  useEffect
} from "react";

import API from "../services/apiService";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import {
  CloudUpload,
  PlayArrow,
  FactCheck
} from "@mui/icons-material";

export default function Dashboard() {

  const [environment, setEnvironment] =
    useState("DEV");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [validation, setValidation] =
    useState("");

  const [artifactType, setArtifactType] =
    useState("");

  const [deploymentPlan, setDeploymentPlan] =
    useState(null);

  const [logs, setLogs] =
    useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const uploadFile = async () => {

    if (!selectedFile) {
      alert("Select File");
      return;
    }

    try {

      const formData =
        new FormData();

      formData.append(
        "file",
        selectedFile
      );

      const response =
        await API.post(
          "/upload",
          formData
        );

      alert(
        response.data.status
      );

    } catch (error) {

      console.error(error);

      alert(
        "Upload Failed"
      );

    }

  };

  const validateFile =
    async () => {

      if (!selectedFile) {
        alert("Select File");
        return;
      }

      const response =
        await API.get(
          `/validate/${selectedFile.name}`
        );

      setValidation(
        response.data.message
      );

    };

  const detectArtifact =
    async () => {

      if (!selectedFile) {
        alert("Select File");
        return;
      }

      const response =
        await API.get(
          `/artifact/${selectedFile.name}`
        );

      setArtifactType(
        response.data.artifactType
      );

      const planResponse =
        await API.get(
          `/deployment-plan/${response.data.artifactType}`
        );

      setDeploymentPlan(
        planResponse.data.plan
      );

    };

  const executeDeployment =
    async () => {

      if (!selectedFile) {
        alert("Select File");
        return;
      }

      await API.post(
        `/execute/${selectedFile.name}`
      );

      loadLogs();

      alert(
        "Deployment Executed"
      );

    };

  const loadLogs =
    async () => {

      try {

        const response =
          await API.get(
            "/logs"
          );

        setLogs(
          response.data
        );

      } catch {

        setLogs([]);

      }

    };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "#eef2f6"
      }}
    >

      <AppBar position="static">

        <Toolbar>

          <Typography
            variant="h5"
            sx={{ flexGrow: 1 }}
            fontWeight="bold"
          >
            Teamcenter Deployment Automation Portal
          </Typography>

          <Typography>
            Welcome : infodba
          </Typography>

        </Toolbar>

      </AppBar>

      <Box sx={{ p: 3 }}>

        {/* KPI */}

        <Grid container spacing={2}>

          <Grid item xs={12} md={3}>
            <Card sx={{
              background:"#1976d2",
              color:"white"
            }}>
              <CardContent>
                <Typography>
                  Total Deployments
                </Typography>
                <Typography variant="h3">
                  {logs.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{
              background:"#2e7d32",
              color:"white"
            }}>
              <CardContent>
                <Typography>
                  Success
                </Typography>
                <Typography variant="h3">
                  {
                    logs.filter(
                      l =>
                      l.status ===
                      "SUCCESS"
                    ).length
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{
              background:"#d32f2f",
              color:"white"
            }}>
              <CardContent>
                <Typography>
                  Failed
                </Typography>
                <Typography variant="h3">
                  {
                    logs.filter(
                      l =>
                      l.status ===
                      "FAILED"
                    ).length
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{
              background:"#ed6c02",
              color:"white"
            }}>
              <CardContent>
                <Typography>
                  Environment
                </Typography>
                <Typography variant="h3">
                  {environment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* ENVIRONMENT */}

        <Card sx={{ mt: 3 }}>
          <CardContent>

            <Typography variant="h6">
              Deployment Environment
            </Typography>

            <Divider
              sx={{
                mt:1,
                mb:2
              }}
            />

            <FormControl
              sx={{
                width:250
              }}
            >

              <InputLabel>
                Environment
              </InputLabel>

              <Select
                value={environment}
                label="Environment"
                onChange={(e)=>
                setEnvironment(
                  e.target.value
                )}
              >

                <MenuItem value="DEV">
                  DEV
                </MenuItem>

                <MenuItem value="QA">
                  QA
                </MenuItem>

                <MenuItem value="UAT">
                  UAT
                </MenuItem>

                <MenuItem value="PROD">
                  PROD
                </MenuItem>

              </Select>

            </FormControl>

          </CardContent>
        </Card>

        {/* FILE SECTION */}

        <Grid
          container
          spacing={2}
          sx={{ mt: 2 }}
        >

          <Grid item xs={12} md={6}>

            <Card>

              <CardContent>

                <Typography variant="h6">
                  Upload Artifact
                </Typography>

                <Divider
                  sx={{
                    mt:1,
                    mb:2
                  }}
                />

                <Paper
                  sx={{
                    border:
                    "2px dashed #1976d2",
                    p:4,
                    textAlign:"center"
                  }}
                >

                  <CloudUpload
                    sx={{
                      fontSize:60,
                      color:"#1976d2"
                    }}
                  />

                  <br />

                  <input
                    type="file"
                    onChange={(e)=>
                    setSelectedFile(
                      e.target.files[0]
                    )}
                  />

                  <Typography
                    sx={{mt:2}}
                  >
                    {
                      selectedFile
                      ?
                      selectedFile.name
                      :
                      "No File Selected"
                    }
                  </Typography>

                </Paper>

              </CardContent>

            </Card>

          </Grid>

          <Grid item xs={12} md={6}>

            <Card>

              <CardContent>

                <Typography variant="h6">
                  Artifact Information
                </Typography>

                <Divider
                  sx={{
                    mt:1,
                    mb:2
                  }}
                />

                <Typography>
                  Artifact
                </Typography>

                <Chip
                  label={
                    artifactType ||
                    "N/A"
                  }
                  color="primary"
                  sx={{ mt:1 }}
                />

                <Typography
                  sx={{ mt:2 }}
                >
                  Validation
                </Typography>

                <Chip
                  label={
                    validation ||
                    "Not Checked"
                  }
                  color="success"
                  sx={{ mt:1 }}
                />

              </CardContent>

            </Card>

          </Grid>

        </Grid>

        {/* PLAN */}

        <Card sx={{ mt:3 }}>

          <CardContent>

            <Typography variant="h6">
              Deployment Plan
            </Typography>

            <Divider
              sx={{
                mt:1,
                mb:2
              }}
            />

            {
              deploymentPlan &&
              <>
                <Typography>
                  Utility:
                </Typography>

                <Chip
                  label={
                    deploymentPlan.utility
                  }
                  color="primary"
                />

                <Typography
                  sx={{ mt:2 }}
                >
                  Dependencies
                </Typography>

                {
                  deploymentPlan
                  .dependencies
                  .length === 0
                  ?
                  <Chip
                    label="None"
                    color="success"
                  />
                  :
                  deploymentPlan
                  .dependencies
                  .map(
                    dep => (
                      <Chip
                        key={dep}
                        label={dep}
                        sx={{
                          mr:1
                        }}
                      />
                    )
                  )
                }

              </>
            }

          </CardContent>

        </Card>

        {/* ACTIONS */}

        <Card sx={{ mt:3 }}>

          <CardContent>

            <Typography variant="h6">
              Deployment Actions
            </Typography>

            <Divider
              sx={{
                mt:1,
                mb:2
              }}
            />

            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={uploadFile}
            >
              Upload
            </Button>

            <Button
              variant="contained"
              color="warning"
              startIcon={<FactCheck />}
              sx={{ ml:2 }}
              onClick={validateFile}
            >
              Validate
            </Button>

            <Button
              variant="contained"
              color="info"
              sx={{ ml:2 }}
              onClick={detectArtifact}
            >
              Detect Artifact
            </Button>

            <Button
              variant="contained"
              color="success"
              startIcon={<PlayArrow />}
              sx={{ ml:2 }}
              onClick={executeDeployment}
            >
              Execute
            </Button>

          </CardContent>

        </Card>

        {/* LOGS */}

        <Card sx={{ mt:3 }}>

          <CardContent>

            <Typography variant="h6">
              Deployment History
            </Typography>

            <Divider
              sx={{
                mt:1,
                mb:2
              }}
            />

            <TableContainer
              component={Paper}
            >

              <Table>

                <TableHead>

                  <TableRow>

                    <TableCell>
                      Artifact
                    </TableCell>

                    <TableCell>
                      Status
                    </TableCell>

                    <TableCell>
                      Time
                    </TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {
                    logs.map(
                      (
                        log,
                        index
                      ) => (

                      <TableRow
                        key={index}
                      >

                        <TableCell>
                          {log.artifact}
                        </TableCell>

                        <TableCell>

                          <Chip
                            label={
                              log.status
                            }
                            color="success"
                          />

                        </TableCell>

                        <TableCell>
                          {log.time}
                        </TableCell>

                      </TableRow>

                    ))
                  }

                </TableBody>

              </Table>

            </TableContainer>

          </CardContent>

        </Card>

      </Box>

    </Box>

  );

}