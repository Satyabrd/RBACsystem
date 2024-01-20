import { Router } from "express";

const router = new Router();

router.use("/rbac", require("./rbac").default);

module.exports = router