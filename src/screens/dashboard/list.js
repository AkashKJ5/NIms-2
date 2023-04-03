import * as React from "react";

import { CardContainer, DashCardContainer } from "../../components/generic/container";
import { CheckCircle, OfflineBolt } from "@mui/icons-material";
import { H4, ReportHeader } from "../../containers/styled/Typography";
import { IconContainer, StyledScrollPanel } from "./styled";

import Avatar from "@mui/material/Avatar";
import { GridStack as BaseStack } from "../../components/generic/stack";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { ScrollPanel } from "primereact/scrollpanel";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { parseFullDateTime } from "../../utils/dates";
import styled from "styled-components";

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
`;

export const Text = styled.label`
  display: block;
  color: #1976d2;
  margin: 10px 0;
`;

export default function AlignItemsList({ data }) {
  const [completedProject, setCompletedProjects] = React.useState(0);
  const [inProgressProject, setInProgressProject] = React.useState(0);

  React.useEffect(() => {
    setCompletedProjects(
      data.filter((data) => {
        return data.status.name === "complete";
      }).length
    );
    setInProgressProject(
      data.filter((data) => {
        return data.status.name === "in progress";
      }).length
    );
  }, [data]);

  return (
    <StyledScrollPanel>
      <Grid sx={{marginBottom: "16px"}} container spacing={2}>
        <Grid item xs={6}>
          <CardContainer key={"index"}>
            <IconContainer>
              <OfflineBolt />
            </IconContainer>
            <ReportHeader style={{ margin: '8px 0' }}>{inProgressProject}</ReportHeader>
            <H4>In Progress</H4>
          </CardContainer>
        </Grid>
        <Grid item xs={6}>
          <DashCardContainer key={"index"}>
            <IconContainer style={{backgroundColor: "#BDB8FE"}}>
              <CheckCircle />
            </IconContainer>
            <ReportHeader style={{ margin: '8px 0' }}>{completedProject}</ReportHeader>
            <H4>Completed</H4>
          </DashCardContainer>
        </Grid>
      </Grid>

      <List sx={{ borderRadius: "16px", width: "100%", bgcolor: "background.paper" }}>
        {
          data.map((project) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={project.status.name} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={project.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {project.type}
                        </Typography>
                        {" — "}{parseFullDateTime(project.lastmodifiedAt)}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )
          })
        }

        {/* <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="CP" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Completed Projects"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {completedProject} Projects
                </Typography>
                {" — Projects which is completed"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="IPP" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="In Progress"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {inProgressProject} Projects
                </Typography>
                {" — This projects is In progress and needs to be done"}
              </React.Fragment>
            }
          />
        </ListItem> */}
      </List>
    </StyledScrollPanel>
  );
}
