const {
    getAllprimarcs,
    getprimarcsById,
    createprimarc,
    editprimarc,
    deleteprimarc,
    getLength,
  } = require("./db");
  
  function handleGetAllprimarcs(req, res) {
    const records = getAllprimarcs();
    res.status(200).json(records);
  }
  
  function handleGetByIdprimarc(req, res) {
    const { id } = req.params;
    const record = getprimarcsById(id);
    if (Object.keys(record).length === 0) {
      return res.status(404).json({ message: "primarc not found" });
    }
    return res.status(200).json(record);
  }
  
  function handleCreateprimarc(req, res) {
    const primarc = req.body;
    const { name, number } = primarc;
    const record = createprimarc(primarc);
    if (!number) {
      return res.status(400).json({ message: "Number is requiered" });
    }
    if (name === primarc.name) {
      return res.status(400).json({ message: "primarc already exist" });
    }
    return res.status(201).json(record);
    
  }
  
  function handleEditprimarc(req, res) {
    const { id } = req.params;
    const primarc = req.body;
    const record = editprimarc(id, primarc);
    if (Object.keys(record).length === 0) {
      return res.status(404).json({ message: "primarc not found" });
    }
    return res.status(202).json(record);
  }
  
  function handleDeleteprimarc(req, res) {
    const { id } = req.params;
    deleteprimarc(id);
    return res.status(204).json({ message: "primarc Deleted" });
  }
  
  module.exports = {
    handleGetAllprimarcs,
    handleGetByIdprimarc,
    handleCreateprimarc,
    handleEditprimarc,
    handleDeleteprimarc,
    getLength,
  };