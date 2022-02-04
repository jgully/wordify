import express from "express";

var router = express.Router();

router.get("/", async(request, response, next) => {
  try {
    const jsonResponse = {
      message: "Recieved GET HTTP request xx"
    };
    response.send(jsonResponse);
  } catch (error) {
   return next(error); 
  }
});

export default router;
