import React, { useState } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const App = () => {
  const images = [
    "https://rgo.ru/upload/content_block/images/9ca8302358b777e143cd6e314058266b/7065323d0aa2e3fa6e8764c4f57f1655.jpg?itok=sawvdjq3",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT70w4bv45sIlEWjgtSEZ6o1r3tRcGyybg_bQ4iVSEi&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyz08McZdhL1UNXD8OYiJX4apXXmMidKjX3OkayZE1&s",
  ];

  const [activeStep, setActiveStep] = useState(0);

  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep =>
      prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep =>
      prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1
    );
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={setActiveStep}
        enableMouseEvents
      >
        {images.map((image, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                src={image}
                alt={`Изображение ${index + 1}`}
                style={{
                  width: "100%",
                  height: 255,
                  objectFit: "cover",
                }}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Вперед
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Назад
          </Button>
        }
      />
    </Box>
  );
};

export default App;
