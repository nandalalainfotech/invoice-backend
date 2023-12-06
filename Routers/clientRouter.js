import express from "express";
import clinetModel from "../Models/clientModel.js";
import expressAsyncHandler from "express-async-handler";
import Clients from "../Models/clientModel.js";



const clientRouter = express.Router();

clientRouter.post('/clinetdetail', expressAsyncHandler(async (req, res) => {
  const clients = new Clients(req.body);
  try {
    await clients.save();
    res.send(clients);
  } catch (error) {
    res.status(500).send(error);
  }
}))

clientRouter.get('/getclinet', expressAsyncHandler(async (req, res) => {

  const client = await Clients.find();
  if (client) {
    res.send(client);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
})
);

clientRouter.get('/singleclient/:id', expressAsyncHandler(async (req, res) => {

  const client = await Clients.findById(req.params.id);
  let sendData = {
    name: client.clientName,
    billingAddress: client.clientAddress,
    mobileNo: client.clientMobileNo,
    email: client.clientEmail
  }
  if (sendData) {
    res.send(sendData);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
})
);

clientRouter.put("/updateClient/:id", expressAsyncHandler(async (req, res) => {
  const clientsUpdateId = req.params.id;
  const clientsupdate = await Clients.findById(clientsUpdateId);
  if (clientsupdate) {
    clientsupdate.image = req.body.image,
      clientsupdate.clientName = req.body.name,
      clientsupdate.clientAddress = req.body.billingAddress,
      clientsupdate.clientEmail = req.body.email,
      clientsupdate.clientMobileNo = req.body.mobileNo,
      clientsupdate.user_id = req.body.user_id
    const updateinvoice = await clientsupdate.save();
    res.send(updateinvoice);
  } else {
    res.status(404).send({ message: "Orderdetail Detail Not Found" });
  }
})
);

clientRouter.delete('/deleteclient/:id', expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const invoice = await Clients.findById(productId);
  if (invoice) {
    const deletenewInvoice = await invoice.deleteOne();
    res.send(deletenewInvoice);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
}));

export default clientRouter;