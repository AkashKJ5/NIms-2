// import { Button, Step, StepLabel, Stepper, Typography, makeStyles } from "@mui/material";

import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { Container } from "./styled";
import ResponsiveAppBar from "../../containers/tool-bar";
import { ScrollPanel } from "primereact/scrollpanel";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["step", "step", "step", "step", "step","step"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Login with Your credential ";
    case 1:
      return "Select Your respective tabs Snag, D-snag or Fix?";
    case 2:
      return "Select Your project from project list To view Units !";
    case 3:
      return "Select Your unit from unit list To view Rooms !";
    case 4:
      return "Select Your item from Items list and take images !";
    case 5:
      return "Review your list which selected initially confirm and complete ?";
    default:
      return "Unknown stepIndex";
  }
}

export default function GuidedNavigation() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container>
      <ResponsiveAppBar isTitle title="Help" />
      <ScrollPanel>
        <div className={classes.root}>
          {/* <Stepper activeStep={activeStep} orientation="vertical"> */}
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollPanel>
    </Container>
  );
}
