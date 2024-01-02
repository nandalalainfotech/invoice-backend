import express from "express";
import expressAsyncHandler from "express-async-handler";
import Company from "../Models/companyModel.js";

const companyRouter = express.Router();


companyRouter.post('/companySave', expressAsyncHandler(async (req, res) => {
  const company = new Company(req.body);

  try {
    await company.save();
    res.send(company);
  } catch (error) {
    res.status(500).send(error);
  }
}))

companyRouter.get('/getcompanydeatails/:id', expressAsyncHandler(async (req, res) => {
  
  const company = await Company.find({ user_id: req.params.id });
  if (company) {
    res.send(company);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
}))

companyRouter.put("/updateCompany/:id", expressAsyncHandler(async (req, res) => {
  const companyUpdateId = req.params.id;
  const companyUpdate = await Company.findById(companyUpdateId);
  if (companyUpdate) {
    companyUpdate.Image = req.body.Image,
    companyUpdate.name = req.body.name,
    companyUpdate.companyaddress = req.body.companyaddress,
    companyUpdate.companymail = req.body.companymail,
    companyUpdate.mobileno = req.body.mobileno,
    companyUpdate.user_id = req.body.user_id
    const companyinvoice = await companyUpdate.save();
    res.send(companyinvoice);
  } else {
    res.status(404).send({ message: "Orderdetail Detail Not Found" });
  }
})
);


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
      client.Image = req.body.image,
        client.name = req.body.companyName,
        client.companymail = req.body.companyEmail,
        client.mobileno = req.body.companyMobile,
        client.companyaddress = req.body.billingAddress,
        client.user_id = req.body.user_id,
        await client.save();
        res.send(client);
    }
   
  } catch (error) {
    res.status(500).send(error);
  }

}))

companyRouter.get('/companylist/:id', expressAsyncHandler(async (req, res) => {
  const client = await Company.find({ user_id: req.params.id });
  if (client) {
    res.send(client);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }

}))

companyRouter.delete('/deleteCompany/:id', expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const invoice = await Company.findById(productId);
  if (invoice) {
    const deletenewInvoice = await invoice.deleteOne();
  console.log("deletenewInvoice---->",deletenewInvoice);
    res.send(deletenewInvoice);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
}));


export default companyRouter;