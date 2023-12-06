import express from "express";
import expressAsyncHandler from "express-async-handler";
import Company from "../Models/companyModel.js";

const companyRouter = express.Router();


companyRouter.post('/companydeatails', expressAsyncHandler(async (req, res) => {
  const company = new Company(req.body);

  try {
    await company.save();
    res.send(company);
  } catch (error) {
    res.status(500).send(error);
  }

}))

companyRouter.put('/updatecompany/:id', expressAsyncHandler(async (req, res) => {
  const client = await Company.findById(req.params?.id);
  try {
    if (client) {
      client.image = req.body.image,
        client.companyName = req.body.companyName,
        client.companyEmail = req.body.companyEmail,
        client.companyMobile = req.body.companyMobile,
        client.billingAddress = req.body.billingAddress,
        client.user_id = req.body.user_id,
        await client.save();
        res.send(client);
    }
   
  } catch (error) {
    res.status(500).send(error);
  }

}))

companyRouter.get('/companylist', expressAsyncHandler(async (req, res) => {
  const client = await Company.find();
  if (client) {
    res.send(client);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }

}))


export default companyRouter;