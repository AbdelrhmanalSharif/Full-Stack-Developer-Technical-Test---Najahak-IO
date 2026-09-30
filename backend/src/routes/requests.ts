import { Router } from "express";
import {
  getRequests,
  createRequest,
  updateRequestStatus,
} from "../controllers/requestController";

const router = Router();

router.get("/", getRequests);
router.post("/", createRequest);
router.patch("/:id/status", updateRequestStatus);

export default router;